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

    this.timeout = setTimeout(() => {
      this.hide();
    }, 4000);
  }

  hide() {
    clearTimeout(this.timeout);
    this.isVisible.set(false);
  }
}
