import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { CardService } from '../../shared/card.service';
import { CRCItem } from '../../model/crcitem';
import { CRCModel } from '../../model/crcmodel';
import { ActionEvent } from '../../model/actionevent';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CrcDeleteModalComponent } from '../../components/dialogs/crc-delete-modal/crc-delete-modal.component';
import { CrcEditModalComponent } from '../../components/dialogs/crc-edit-modal/crc-edit-modal.component';


@Component({
  selector: 'crc-view-container',
  templateUrl: './crc-view-container.component.html',
  styleUrls: ['./crc-view-container.component.css']
})
export class CrcViewContainerComponent implements OnInit, OnDestroy {

  @ViewChild(CrcDeleteModalComponent) deleteModal: CrcDeleteModalComponent;

  @ViewChild(CrcEditModalComponent) editModal: CrcEditModalComponent;

  private DEFAULT_WIDTH: number = 800;

  private DEFAULT_HEIGHT: number = 600;

  private _model: CRCModel = new CRCModel();

  private _crcItems: Array<CRCItem> = [];

  private _itemSubscription: Subscription;

  private _itemStateEvent: BehaviorSubject<Array<CRCItem>> = new BehaviorSubject(this._crcItems);

  private _width: number = 0;

  private _height: number = 0;

  constructor(private cardService: CardService) {
  }

  ngOnInit(): void {
    this._itemSubscription = this.cardService.getObservableItems().subscribe(
      (model) => {
        this.processItems(model.items);
        this._width = model.width;
        this._height = model.height;
        this._model = model;
      }
    );
  }

  ngOnDestroy(): void {
    this._itemSubscription.unsubscribe();
  }

  public get observableItems(): Observable<Array<CRCItem>> {
    return this._itemStateEvent.asObservable();
  }

  private processItems(items: Array<CRCItem>): void {
    this._crcItems = items;
    this._itemStateEvent.next(this._crcItems);
  }

  public processActionEvent(event: ActionEvent) {

    switch (event.type) {
      case ActionEvent.ACTION_EDIT_CARD:
        this.editCard(event.payload);
        break;
      case ActionEvent.ACTION_DELETE_CARD:
        this.deleteCard(event.payload);
        break;
      default:

    }
  }

  public get width() {
    return this._width || this.DEFAULT_WIDTH;
  }

  public get height() {
    return this._height || this.DEFAULT_HEIGHT;
  }

  public get title() {
    if(this._model.title == undefined){
      return 'My CRC Model';
    }
    return this._model.title;
  }

  public setTitle(title:string){
    this._model.title = title;
  }

  private deleteCard(item: CRCItem): void {
    this.deleteModal.item = item;
    this.deleteModal.isModalOpen = true;
  }

  private editCard(item: CRCItem): void {
    this.editModal.item = item;
    this.editModal.isModalOpen = true;
  }


}
