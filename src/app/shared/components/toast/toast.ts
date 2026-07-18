import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [NgClass],
  templateUrl: './toast.html',
})
export class Toast {
  toastService: ToastService = inject(ToastService);


  ngDoCheck() {
    console.log('Component:', this.toastService.isVisible);
  }
}
