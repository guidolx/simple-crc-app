import { Component, OnInit } from '@angular/core';
import { BaseDialog } from '../../../shared/helpers/base-dialog';
import { CardService } from '../../../shared/card.service';
import { CRCModel } from '../../../model/crcmodel';
import { Button } from '../../../shared/helpers/button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'crc-delete-model-modal',
  templateUrl: './crc-delete-model-modal.component.html',
  styleUrls: ['./crc-delete-model-modal.component.css']
})
export class CrcDeleteModelModalComponent extends BaseDialog implements OnInit {

  private _model: CRCModel;

  private _title: string = 'Delete CRC Model';

  private _buttons: Array<Button> =
  [{ id: 'delete', label: 'Delete Model', classes: { 'is-primary': true }, type: 'submit', disabled: false },
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
      this.deleteCrcModel();
    }
  }

  public get model() {
    return this._model;
  }

  public set model(model: CRCModel) {
    this._model = model;
  }

  public get buttons(){
    return this._buttons;
  }

  public get title(){
    return this._title;
  }

  public deleteCrcModel():void{
    this.cardService.deleteCrcModel(this._model);
  }

}
