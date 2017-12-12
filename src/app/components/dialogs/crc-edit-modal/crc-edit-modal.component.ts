import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { CardService } from "../../../shared/card.service";
import { Button } from "../../../shared/helpers/button";
import { CRCItem } from "../../../model/crcitem";
import { BaseDialog } from '../../../shared/helpers/base-dialog';
import { ValidateCollaborators } from '../../../validators/collaborators.validator';
import { ValidateResponsibilities } from '../../../validators/responsibilities.validator';
import { NoWhitespaceValidator } from '../../../validators/no-whitespace.validator';
import { UniqueCardNameValidator } from '../../../validators/unique-card-name.validator';

@Component({
  selector: 'crc-edit-modal',
  templateUrl: './crc-edit-modal.component.html',
  styleUrls: ['./crc-edit-modal.component.css']
})
export class CrcEditModalComponent extends BaseDialog implements OnInit, OnDestroy {

  private _item: CRCItem;

  private _title: string = 'CRC Card';

  private _focusId: string = 'crcName';

  private _buttons: Array<Button> =
  [{ id: 'save', label: 'Save Card', classes: { 'is-primary': false, 'is-cancel': true }, type: 'submit', disabled: true },
  { id: 'cancel', label: 'Cancel', classes: { 'is-cancel': true }, disabled: false, type: 'button' }];

  constructor(private cardService: CardService) {
    super();
    this.form = new FormGroup({
      crcName: new FormControl('', [NoWhitespaceValidator, Validators.minLength(3), Validators.maxLength(24)]),
      crcResponsibilities: new FormControl('',[ValidateResponsibilities]),
      crcCollaborators: new FormControl(''),
      crcType:new FormControl('')
    });
  }

  ngOnInit() {
    this.init();
  }

  public ngOnDestroy() {
    this.destroy();
  }

  onFormChange(): void {
    const val = this.valid();
    this.buttons[0].disabled = !val;
    this.buttons[0].classes = { 'is-primary': val, 'is-cancel': !val };
  }



  public get item() {
    return this._item;
  }

  public set item(item: CRCItem) {
    this._item = item;
    this.updateValidators();
  }

  private updateValidators(){
    let control:AbstractControl = this.form.get('crcName');
    let ucName = this.upperCase(this._item.name);
    control.setValidators([NoWhitespaceValidator,UniqueCardNameValidator(this.cardService,ucName), Validators.minLength(3), Validators.maxLength(24)]);
    control = this.form.get('crcCollaborators');
    control.setValidators([ValidateCollaborators(ucName)]);
  }

  public get focusId(){
    return this._focusId;
  }

  public set focusId(f:string){
    this._focusId = f;
  }

  onClickButton(event: string) {

    this.isModalOpen = false;
    if ('save' === event) {
      this.saveCrcCard();
    }
    this.resetForm();
  }

  showModal(item: CRCItem) {
    this.isModalOpen = true;
  }

  public get buttons() {
    return this._buttons;
  }

  public get title() {
    return this._title;
  }

  private saveCrcCard(): void {
    this._item.name = this.upperCase(this.form.get('crcName').value);
    this._item.responsibilities = this.form.get('crcResponsibilities').value != null ? this.form.get('crcResponsibilities').value.split('\n') : [];
    this._item.collaborators = this.form.get('crcCollaborators').value != null ? this.upperCase(this.form.get('crcCollaborators').value).split('\n') : [];
    let type = this.form.get('crcType').value;
    if(type == null){
      this.item.type = CRCItem.ENTITY;
    }else{
      this.item.type = type;
    }
    this._item.responsibilities = this._item.responsibilities.filter((i) => {
      return i.length > 0;
    });
    this._item.collaborators = this._item.collaborators.filter((i) => {
      return i.length > 0;
    });
    this.cardService.save(this._item);
  }

  public onDisplayEvent(event:string):void{

    // Editing card if this is true
    // copy item properties into form.
    if (this._item.name != null) {
      this.patchForm();
      this.focusId = 'crcName';
      this.onFormChange();
    }else{
      this.resetForm();
    }
  }

  private patchForm(){
      this.form.patchValue({
        crcName: this.upperCase(this._item.name),
        crcCollaborators: this._item.collaborators != null ? this.upperCase(this._item.collaborators.join('\n')) : '',
        crcResponsibilities: this._item.responsibilities != null ? this._item.responsibilities.join('\n') : '',
        crcType: this._item.type != null ? this._item.type : null
      });
  }

  private upperCase(s:string):string{
    if(s == null){
      return s;
    }
    return s.toUpperCase();
  }


}
