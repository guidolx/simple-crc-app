import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../shared/card.service';
import { CRCItem } from '../../../model/crcitem';
import { BaseDialog } from '../../../shared/helpers/base-dialog';
import { Button } from '../../../shared/helpers/button';

@Component({
  selector: 'crc-delete-modal',
  templateUrl: './crc-delete-modal.component.html',
  styleUrls: ['./crc-delete-modal.component.css']
})
export class CrcDeleteModalComponent extends BaseDialog implements OnInit {

  private _item: CRCItem;

  private _title: string = 'Delete CRC Card';

  private _buttons: Array<Button> =
  [{ id: 'delete', label: 'Delete Card', classes: { 'is-primary': true }, type: 'submit', disabled: false },
  { id: 'cancel', label: 'Cancel',classes: { 'is-cancel': true }, disabled: false, type: 'button' }];

  constructor(private cardService: CardService) {
    super();
  }

  ngOnInit() {
    this.init();
  }

  public ngOnDestroy() {

    this.destroy();
  }

  onFormChange(): void {

  }

  public onClickButton(event: string) {

    this.isModalOpen = false;
    if ('delete' === event) {
      this.deleteCrcCard();
    }
  }

  public get item() {
    return this._item;
  }

  public set item(item: CRCItem) {
    this._item = item;
  }

  public get buttons(){
    return this._buttons;
  }

  public get title(){
    return this._title;
  }

  public deleteCrcCard():void{
    this.cardService.deleteCrcCard(this._item);
  }

}
