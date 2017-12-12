import { AbstractControl, ValidatorFn } from '@angular/forms';


export function NoWhitespaceValidator(control: AbstractControl){
  // messy but you get the idea
 let isWhitespace = (control.value || '').trim().length === 0;
 let isValid = !isWhitespace;
 return isValid ? null : { errorMessage: 'Value is only whitespace.' }

}
