import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseDialog } from '../../../shared/helpers/base-dialog';
import { CardService } from '../../../shared/card.service';
import { Button } from '../../../shared/helpers/button';
import { CRCModel } from '../../../model/crcmodel';

@Component({
  selector: 'crc-open-model-modal',
  templateUrl: './crc-open-model-modal.component.html',
  styleUrls: ['./crc-open-model-modal.component.css']
})
export class CrcOpenModelModalComponent extends BaseDialog implements OnInit, OnDestroy,AfterViewInit {

  private _title: string = 'Open CRC Model';

  private _models:Array<CRCModel> = [];

  private _selectedModel:string;

  private _buttons: Array<Button> =
  [{ id: 'load', label: 'Open Model', classes: { 'is-cancel': true, 'is-primary':false }, type: 'submit', disabled: true },
  { id: 'cancel', label: 'Cancel', classes: { 'is-cancel': true },disabled: false, type: 'button' }];

  constructor(private cardService:CardService) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      selectedCrcModel:new FormControl('', [Validators.required, Validators.minLength(5)])
    });
    this.init();
  }

  ngAfterViewInit(){

  }

  ngOnDestroy(){
    this.destroy();
  }

  public onFormChange():void{

    const val = this.valid();
    this.buttons[0].disabled = !val;
    this.buttons[0].classes = { 'is-primary': val , 'is-cancel':!val };
  }

  public onClickButton(event:string){
    this.isModalOpen = false;
    if(event === 'load'){
      this.loadModel();
    }
    this.resetForm();
  }

  public get models(){
    return this._models;
  }

  public get buttons(){
    return this._buttons;
  }

  public get title(){
    return this._title;
  }

  public selectCrcModel(uuid:string){
    if(uuid === undefined){
      return;
    }
    this._selectedModel = uuid;
    this.form.patchValue({'selectedCrcModel':this._selectedModel});
  }

  public get selectedModel(){
    return this._selectedModel;
  }

  public isSelectedModel(uuid:string):boolean{
    return this._selectedModel === uuid;
  }

  private loadModel(){
    this.cardService.loadModel(this._selectedModel);
  }

  public onDisplayEvent(event:string):void{
    this._selectedModel = undefined;
    this._models = this.cardService.getModels();
    super.onDisplayEvent(event);
  }


}
