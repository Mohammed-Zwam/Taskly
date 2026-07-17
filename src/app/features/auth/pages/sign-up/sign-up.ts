import { Component } from '@angular/core';
import { InputField } from "../../components/input-field/input-field";
import { RouterLink } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [InputField, RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  name: FormControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  jobTitle: FormControl = new FormControl('', [Validators.maxLength(50)]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64), this.validatePassword]);
  confirmPassword: FormControl = new FormControl('', [Validators.required]);
  signupFormData: FormGroup = new FormGroup(
    {
      name: this.name,
      email: this.email,
      jobTitle: this.jobTitle,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  get passwordRules() {
    const password = this.password;

    return [
      {
        name: 'At least 8 characters',
        isValid: password?.value?.length >= 8,
      },
      {
        name: 'One uppercase, lowercase, and digit',
        isValid: !password?.hasError('hasUppercase') && !password?.hasError('hasLowercase') && !password?.hasError('hasDigit'),
      },
      {
        name: 'One special character',
        isValid: !password.hasError('hasSpecialCharacter'),
      }
    ]
  }



  validatePassword(control: AbstractControl) {
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

  passwordMatchValidator(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const confirmPass = form.get('confirmPassword')?.value;
    if (pass !== confirmPass) {
      return { mismatch: true }
    }
    else return null;
  }

  onSubmit() {
    console.log(this.signupFormData.value)
  }
}
