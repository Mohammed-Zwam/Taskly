import { Component, inject } from '@angular/core';
import { InputField } from "../../components/input-field/input-field";
import { RouterLink } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toast.service';
import { ErrorMessage } from "../../../../shared/components/error-message/error-message";
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { LoadingService } from '../../../../shared/services/loading.service';
import { AuthService } from '../../services/auth.service';
import { SignupDTO } from '../../model/auth.model';
import { error } from 'console';

@Component({
  selector: 'app-sign-up',
  imports: [InputField, RouterLink, ReactiveFormsModule, ErrorMessage, BtnLoading],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {

  constructor(private toastService: ToastService, private authService: AuthService) { }
  loadingService: LoadingService = inject(LoadingService);

  name: FormControl = new FormControl('',
    [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      this.validateName
    ]
  );
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
  validateName(control: AbstractControl) {
    const value = control.value;
    if (!(/^\p{L}+(?:\s+\p{L}+)*$/u.test(value)))
      return {
        invalidNamePattern: true
      }
    return null;
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
    if (this.signupFormData.invalid) {
      this.toastService.show('error', 'Invalid Inputs', 'Please fill in all fields correctly');
      this.signupFormData.markAllAsTouched();
      this.signupFormData.markAllAsDirty();
      return;
    }
    const signupDTO: SignupDTO = {
      email: this.email.value,
      password: this.password.value,
      data: {
        name: this.name.value,
        department: this.jobTitle.value,
      }
    };

    this.loadingService.load();
    this.authService.signup(signupDTO).subscribe({
      next: () => {
        this.toastService.show('success', 'Account Created Successfully', 'Welcome, ' + this.name.value + ' !');
        // TODO: Redirect to project page (main page)
      },
      error: (res) => {
        console.log(res)
        this.toastService.show('error', 'Account Creation Failed', res.error.msg);
        this.loadingService.stop();
      },
      complete: () => {
        this.loadingService.stop();
      }
    })

  }
}
