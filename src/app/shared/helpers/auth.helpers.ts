import { FormGroup } from "@angular/forms";

export function isValidInput(fieldName?: string, form?: FormGroup) {
    return form.controls[fieldName].invalid &&
      (form.controls[fieldName].dirty || form.controls[fieldName].touched);
}