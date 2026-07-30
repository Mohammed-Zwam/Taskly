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


export function getAvatar(name: string): string {
    const userNames = name.split(' ');
    return userNames[0][0] + userNames[1][0];
}


export function getRandomColor(): string {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 60 + Math.floor(Math.random() * 31); 
  const lightness = 35 + Math.floor(Math.random() * 26);  

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}