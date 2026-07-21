import { Injectable, signal } from '@angular/core';
import { User } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  user = signal<User | null>(null);
  setUser(user: User) {
    this.user.set(user);
  }
  getUser() {
    return this.user();
  }

  clearUser() {
    this.user.set(null);
  }
}
