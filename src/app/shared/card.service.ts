import { Injectable } from '@angular/core';
import { CRCItem } from '../model/crcitem';
import { CRCModel } from '../model/crcmodel';
import { LocalStorageService } from './local-storage.service';
import { ConfigService } from './config.service';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CardService {

  private _crcModel: CRCModel = new CRCModel();

  private _data: BehaviorSubject<CRCModel> = new BehaviorSubject(this._crcModel);

  constructor(private storage: LocalStorageService,private configService:ConfigService) {}

  public getObservableItems() {
    return this._data.asObservable();
  }

  public get crcItems() {
    return this._crcModel.items;
  }

  public add(crcItem: CRCItem): void {
    this._crcModel.add(crcItem);
    this._data.next(this._crcModel);
  }

  public update(crcItem: CRCItem): void {
    this._crcModel.update(crcItem);
  }

  public save(item: CRCItem) {
    if (item.uuid === undefined) {
      item.initUuid();
      this._crcModel.add(item);
    }
    this.createMissingCards(item.collaborators);
  }

  public size(width: number, height: number): void {
    this._crcModel.width = width;
    this._crcModel.height = height;
    this._data.next(this._crcModel);
  }


  public createModel(crcModel: CRCModel): void {
    this._crcModel = crcModel;
    this._crcModel.width = 800;
    this._crcModel.height = 600;
    this.storage.save(this._crcModel);
    this._data.next(this._crcModel);
  }

  public saveCurrentModel(): void {
    this.storage.save(this._crcModel);
  }

  public getModels(): Array<CRCModel> {
    return this.storage.getAllModels();
  }

  public loadModel(uuid: string) {
    this._crcModel = this.storage.load(uuid);
    this._data.next(this._crcModel);
  }

  public deleteCrcCard(item: CRCItem): void {
    const name = item.name;

    this._crcModel.items = this._crcModel.items.filter((i) => {
      return i.uuid != item.uuid;
    });

    this._crcModel.items.forEach(it => {
      if (it.collaborators != null && it.collaborators.indexOf(name) > -1) {
        it.collaborators = it.collaborators.filter((f) => {

          return f != name;
        });
      }
    });
    this._data.next(this._crcModel);
  }

  public deleteCrcModel(model:CRCModel){
    if(model != null && model.uuid != null){
      this.storage.delete(model);
    }
    this._crcModel = new CRCModel();
    this._crcModel.title = this.configService.defaultModelTitle;
    this._crcModel.width = this.configService.defaultModelWidth;
    this._crcModel.height = this.configService.defaultModelHeight;
    this._data.next(this._crcModel);
  }




  private createMissingCards(items: Array<string>){
    if(items == null || items.length == 0){
      return;
    }
    let result: Array<string> = items.slice();
    this._crcModel.items.forEach((item) => {
      const i = result.indexOf(item.name);
      if (i > -1) {
        result.splice(i, 1);
      }
    });
    if(result.length > 0){
      let x = 340;
      let y = 20;
      const increaseY = Math.min((this._crcModel.height - 20 / result.length),60);
      result.forEach((item) => {
        let i = new CRCItem(item);
        i.initUuid();
        i.posX = x;
        i.posY = y;
        this._crcModel.add(i);
        y+= increaseY;
      });
      this._data.next(this._crcModel);
    }
  }


  public isNameAvailable(name:string):boolean{
    let available:boolean = true;
    if(this._crcModel.items.length == 0){
      return available;
    }

    for(let i = 0; i < this._crcModel.items.length;i++){
      if(this._crcModel.items[i].name == name){
        available = false;
        break;
      }
    }
    return available;
  }

  public getCurrentModelAsJSON():string{
    return JSON.stringify(this._crcModel);
  }

  public getCurrentModelTitle(){
    if(this._crcModel.title == null){
      return 'Download';
    }
    return this._crcModel.title.replace(/(?!\.[^.]+$)\.|[^\w.]+/g, '');
  }

  public getCurrentModel():CRCModel{
    return this._crcModel;
  }


  public loadFromString(data:string):void{
    this._crcModel =  this.storage.saveJson(data);
    this._data.next(this._crcModel);
  }


}
