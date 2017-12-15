import { AbstractControl } from '@angular/forms';

export function ValidateResponsibilities(control: AbstractControl) {
  if(control.value == null){
    return null;
  }
  let cs:Array<string> = control.value.split('\n');
  if(cs === undefined || cs == null){
    return null;
  }
  cs = cs.filter((i) => {
    return i.length > 0;
  });
  if(cs.length > 10){
    return {errorMessage:'Too many responsibilites defined(maximum is 10)'};
  }
  for(let i = 0; i < cs.length;i++){
    if(cs[i].length > 64){
      return {errorMessage:`Responsibility is too long ${cs[i]}`};
    }
  }

  return null;
}
