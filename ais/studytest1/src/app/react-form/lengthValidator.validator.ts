import { ValidatorFn, AbstractControl } from '@angular/forms';

export function lengthValidator(minLength: number, maxLength: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

        if (!control.value) { return; }
        const valid = (minLength <= control.value.length) && (maxLength > control.value.length);
        return valid ? null : { 'errorMessage': { value: `from ${minLength} to ${maxLength} characters` } };
    };
}
