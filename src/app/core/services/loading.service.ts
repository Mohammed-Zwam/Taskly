import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = signal(true);
  load() {
    this.isLoading.set(true);
  }
  stop() {
    this.isLoading.set(false);
  }

}
