import { Component, signal } from '@angular/core';
import { InputField } from "../../components/input-field/input-field";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { RouterLink } from "@angular/router";
import { finalize, Subscription, timer } from 'rxjs';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-forget-password',
  imports: [InputField, ReactiveFormsModule, RouterLink, DatePipe, BtnLoading],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {

  constructor(private authService: AuthService, private toastService: ToastService) { }

  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  forgetPasswordFormData: FormGroup = new FormGroup({
    email: this.email,
  })

  isLoading = signal(false);

  remainingSeconds = signal(60);
  canResend = signal(false);
  isEmailSent = signal(false);
  tryCount = 0;

  private timerSubscription?: Subscription;

  startTimer() {
    this.canResend.set(false);
    this.remainingSeconds.set(60); // 1 minute ;)

    this.timerSubscription?.unsubscribe();

    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.remainingSeconds.set(this.remainingSeconds() - 1);

      if (this.remainingSeconds() <= 0) {
        this.canResend.set(true);
        this.timerSubscription?.unsubscribe();
      }
    });
  }


  isInputFieldValid() {
    if (this.forgetPasswordFormData.invalid) {
      this.toastService.show('error', 'Invalid Inputs', 'Please fill in email field correctly.');
      this.forgetPasswordFormData.markAllAsTouched();
      this.forgetPasswordFormData.markAllAsDirty();
      return false;
    }
    return true;
  }

  onSubmit() {
    if (!this.isInputFieldValid()) return;

    this.isLoading.set(true);

    this.authService.forgetPassword(this.email.value)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res) => {
          this.isEmailSent.set(true);
          this.startTimer();
        },
        error: (res) => {
          this.toastService.show('error', 'Forget password request failed', res.error.msg);
        }
      })
  }

  resendLink() {
    if (!this.canResend()) return;
    if (!this.isInputFieldValid()) return;
    if (this.tryCount >= 3) {
      this.toastService.show('error', 'Limit reached', 'Please try again later.');
      return;
    }
    this.tryCount++;
    this.startTimer();
    this.authService.forgetPassword(this.email.value).subscribe({
      error: (res) => {
        this.toastService.show('error', 'Forget password request failed', res.error.msg);
      }
    })
  }
}
