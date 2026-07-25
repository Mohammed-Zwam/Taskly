import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  isVisible = signal(false);
  messageType = signal<'error' | 'warning' | 'success'>('success');
  messageTitle = signal('');
  messageContent = signal('');
  timeout!: ReturnType<typeof setTimeout>;
  clearToastTimeout!: ReturnType<typeof setTimeout>;


  show(
    messageType: 'error' | 'warning' | 'success',
    messageTitle: string,
    messageContent: string
  ) {
    this.messageType.set(messageType);
    this.messageTitle.set(messageTitle);
    this.messageContent.set(messageContent);
    this.isVisible.set(true);

    clearTimeout(this.timeout);
    clearTimeout(this.clearToastTimeout);

    this.timeout = setTimeout(() => {
      this.hide();
    }, 4000);
  }

  hide() {
    clearTimeout(this.clearToastTimeout);
    this.isVisible.set(false);
    this.clearToastTimeout = setTimeout(() => {
      this.messageTitle.set('');
      this.messageContent.set('');
    }, 200);
  }
}
