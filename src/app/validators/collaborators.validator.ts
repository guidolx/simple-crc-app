import { AbstractControl, ValidatorFn } from '@angular/forms';

export function ValidateCollaborators(cardName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (control.value == null) {
      return null;
    }
    let cs: Array<string> = control.value.toUpperCase().split('\n');
    if (cs === undefined || cs == null) {
      return null;
    }
    cs = cs.filter((i) => {
      return i.length > 0;
    });
    if (cs.length > 8) {
      return { errorMessage: 'Too many collaborators defined(maximum is 8)' };
    }
    let duplicateArray = [];
    let current;
    for (let i = 0; i < cs.length; i++) {
      current = cs[i].trim();
      if (current.length > 24) {
        return { errorMessage: `Name is too long ${current}` };
      } else if (current === cardName) {
        return { errorMessage: `Collaborator can't have the same name as the card ${current}` };
      }
      if(duplicateArray.indexOf(current) == -1){
        duplicateArray.push(current);
      }else{
        return { errorMessage: `Mulitple collaborators named ${current}` };
      }
    }
    return null;
  }
}
