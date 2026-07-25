import { Component, inject, signal } from '@angular/core';
import { InputField } from "../../components/input-field/input-field";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator, validatePassword } from '../../../../core/utils/helpers';
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ErrorMessage } from "../../../../shared/components/error-message/error-message";
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  imports: [InputField, ReactiveFormsModule, BtnLoading, RouterLink, ErrorMessage],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword {

  constructor(private toastService: ToastService, private authService: AuthService, private router: Router) { }

  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64), validatePassword]);
  confirmPassword: FormControl = new FormControl('', [Validators.required]);
  isLoading = signal(false);
  token !: string;
  private route = inject(ActivatedRoute);

  resetPasswordFormData: FormGroup = new FormGroup({
    password: this.password,
    confirmPassword: this.confirmPassword,
  }, {
    validators: passwordMatchValidator,
  })

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('access_token')!;
    if (!this.token || this.token.length === 0) {
      this.toastService.show('error', 'Invalid Token', 'Invalid or expired reset link.');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

      return;
    }
  }


  get passwordRules() {
    const password = this.password;

    return [
      {
        name: '8-64 characters',
        isValid: password?.value?.length >= 8 && password?.value?.length <= 64,
      },
      {
        name: 'Lowercase letter',
        isValid: !password?.hasError('hasLowercase'),
      },
      {
        name: 'Special character',
        isValid: !password.hasError('hasSpecialCharacter'),
      },
      {
        name: 'Uppercase letter',
        isValid: !password?.hasError('hasUppercase'),
      },
      {
        name: 'One digit',
        isValid: !password.hasError('hasDigit'),
      }
    ]
  }


  onSubmit() {
    if (this.resetPasswordFormData.invalid) {
      this.toastService.show('error', 'Invalid Inputs', 'Please fill in all fields correctly');
      this.resetPasswordFormData.markAllAsTouched();
      this.resetPasswordFormData.markAllAsDirty();
      return;
    }

    this.isLoading.set(true);
    this.authService.resetPassword(this.password.value, this.token)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: () => {
          this.toastService.show('success', 'Password Reset', 'Your password has been reset successfully.');
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (res) => {
          this.toastService.show('error', 'Failed to reset password. ', 'Failed to reset password. Please try again.');
        },
      })
  }
}
