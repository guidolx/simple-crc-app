import { AbstractControl, ValidatorFn } from '@angular/forms';
import { CardService } from '../shared/card.service';

export function UniqueCardNameValidator(cardService: CardService, oldName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let newName = control.value;
    if (newName == null || newName.length == 0) {
      return null;
    }
    // PROBABLY I COULD USE AN UPPERCASE PIPE
    newName = newName.toUpperCase();
    if (oldName === newName) {
      return null;
    }

    const available:boolean = cardService.isNameAvailable(newName);
    return available ? null : {'errorMessage': `Card named '${newName}' already exists.` };
  };
}
