import { AbstractControl, ValidationErrors } from '@angular/forms';

export class WhiteSpaceValidator {
  static noWhiteSpace(control: AbstractControl): ValidationErrors | null {
    if (typeof control.value === 'string') {
      let value = control.value.trim();
      if (!value) {
        return {noWhiteSpace: true};
      }
    }
    return null;
  }
}
