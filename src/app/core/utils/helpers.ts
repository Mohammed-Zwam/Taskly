import { HttpContextToken } from "@angular/common/http";
import { AbstractControl } from "@angular/forms";

export function validatePassword(control: AbstractControl) {
    const value = control.value;

    const errors: any = {};

    if (/\s/.test(value))
        errors.noWhitespace = true;

    if (!/[A-Z]/.test(value))
        errors.hasUppercase = true;

    if (!/[a-z]/.test(value))
        errors.hasLowercase = true;

    if (!/\d/.test(value))
        errors.hasDigit = true;

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
        errors.hasSpecialCharacter = true;

    return Object.keys(errors).length ? errors : null;
}



export function passwordMatchValidator(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    if (pass !== confirmPass) {
        return { mismatch: true }
    }
    else return null;
}
