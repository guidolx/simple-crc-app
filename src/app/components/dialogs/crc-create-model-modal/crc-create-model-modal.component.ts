import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Button } from '../../../shared/helpers/button';
import { CRCModel } from '../../../model/crcmodel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';
import { CardService } from '../../../shared/card.service';
import { BaseDialog } from '../../../shared/helpers/base-dialog';

@Component({
  selector: 'crc-create-model-modal',
  templateUrl: './crc-create-model-modal.component.html',
  styleUrls: ['./crc-create-model-modal.component.css']
})
export class CrcCreateModelModalComponent extends BaseDialog implements OnInit, OnDestroy {

  private _model: CRCModel;

  private _title: string = 'CRC Model';

  private _buttons: Array<Button> =
  [{ id: 'save', label: 'Create Model', classes: { 'is-primary': false, 'is-cancel':true }, type: 'submit', disabled: true },
  { id: 'cancel', label: 'Cancel', classes: { 'is-cancel': true },disabled: false, type: 'button' }];

  constructor(private cardService:CardService ) {
    super();
  }

  ngOnInit() {
    this.form = new FormGroup({
      crcModelName: new FormControl('', [Validators.required, Validators.minLength(3),Validators.maxLength(30)])
    });
    this.init();
  }


  ngOnDestroy(){
    this.destroy();
  }

  onFormChange(): void {
      const val = this.valid();
      this.buttons[0].disabled = !val;
      this.buttons[0].classes = { 'is-primary': val , 'is-cancel':!val };
  }

  onClickButton(event: string) {
    this.isModalOpen = false;
    if('save' === event){
      this.saveCrcModel();
    }
    this.resetForm();
  }

  public get buttons(){
    return this._buttons;
  }

  public get title(){
    return this._title;
  }

  private saveCrcModel(){
    this._model = new CRCModel();
    this._model.title = this.form.get('crcModelName').value;
    this.cardService.createModel(this._model);
  }

}
