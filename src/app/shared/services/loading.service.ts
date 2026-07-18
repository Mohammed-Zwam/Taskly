import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading = signal(false);
  load() {
    this.isLoading.set(true);
  }
  stop() {
    this.isLoading.set(false);
  }

}
