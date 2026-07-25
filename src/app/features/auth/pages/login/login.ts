import { LoginRequest } from './../../model/auth.model';
import { Component, inject, signal } from '@angular/core';
import { InputField } from "../../components/input-field/input-field";
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from "@angular/router";
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [InputField, BtnLoading, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(private authService: AuthService) { }
  router = inject(Router);
  toastService = inject(ToastService);
  isLoading = signal(false);

  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.minLength(8), Validators.required, this.validatePassword]);
  rememberMe: FormControl = new FormControl(false);

  loginFormData = new FormGroup({
    email: this.email,
    password: this.password,
    rememberMe: this.rememberMe
  });


  validatePassword(control: AbstractControl) {
    const value = control.value;
    if (value.trim().length === 0) return { empty: true };
    return null;
  }

  onSubmit() {
    if (this.loginFormData.invalid) {
      this.toastService.show('error', 'Invalid Inputs', 'Please fill in all fields correctly.');
      this.loginFormData.markAllAsTouched();
      this.loginFormData.markAllAsDirty();
      return;
    }


    const loginRequest: LoginRequest = {
      email: this.email.value,
      password: this.password.value,
      rememberMe: this.rememberMe.value,
    }

    this.isLoading.set(true);

    this.authService.login(loginRequest)
      .pipe(
        finalize(() => this.isLoading.set(false))
      ).subscribe({
        next: (res) => {
          this.toastService.show('success', 'Login Successful', 'Welcome back!');
          this.router.navigate(['/projects']);
        },
        error: (res) => {
          this.toastService.show('error', 'Login Failed', res.error.msg);
        }
      })
  }
}
