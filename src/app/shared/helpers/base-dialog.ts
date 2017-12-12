import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs/Rx';

export abstract class BaseDialog {

  private _isModalOpen: boolean;

  private _form: FormGroup;

  private _subscription: Subscription;

  public constructor() { }

  public abstract onFormChange(): void;

  public init(): void {
    if (this._form != null) {
      this._subscription = this._form.valueChanges.subscribe((val) => {
        this.onFormChange();
      });
    }
  }

  public destroy(): void {
    this._subscription.unsubscribe();
  }

  public set form(form: FormGroup) {
    this._form = form;
  }

  public get form(): FormGroup {
    return this._form;
  }

  public get isModalOpen(): boolean {
    return this._isModalOpen;
  }

  public set isModalOpen(open: boolean) {
    this._isModalOpen = open;
  }

  public resetForm(): void {
    if (this._form == null) {
      return;
    }
    this._form.reset();
    this._form.markAsPristine();
    this._form.markAsUntouched();
  }

  public valid(): boolean {
    if (this._form === undefined) {
      return true;
    }
    return this._form.valid;
  }

  public onDisplayEvent(event: string): void {

    this.resetForm();
  }

  public errorMessage(field:string):string{
    if(this._form == null){
      return '';
    }
    return this._form.get(field).errors.errorMessage;
  }

  public hasFieldError(field:string):boolean{
    if(this._form == null){
      return false;
    }
    return this._form.get(field).errors &&
        this._form.get(field).dirty &&
        this._form.get(field).errors.errorMessage;
  }

}
