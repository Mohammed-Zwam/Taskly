import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  private readonly platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  set(name: string, value: string, days = 30): void {
    if (!this.isBrowser) return;

    document.cookie =
      `${name}=${encodeURIComponent(value)}; path=/; max-age=${days * 24 * 60 * 60}; SameSite=Lax`;
  }

  get(name: string): string | null {
    if (!this.isBrowser) return null;

    const cookie = document.cookie
      .split('; ')
      .find(c => c.startsWith(`${name}=`));

    return cookie
      ? decodeURIComponent(cookie.split('=')[1])
      : null;
  }

  delete(name: string): void {
    if (!this.isBrowser) return;

    document.cookie = `${name}=; path=/; max-age=0`;
  }
}