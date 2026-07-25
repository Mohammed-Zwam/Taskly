import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../features/auth/services/session.service';
import { inject } from '@angular/core';
import { AuthService } from '../../features/auth/services/auth.service';
import { catchError, finalize, map, of } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const sessionService = inject(SessionService);
  const loadingService = inject(LoadingService);

  const fragment = route.fragment;

  if (fragment) {
    const params = new URLSearchParams(fragment);

    const token = params.get('access_token');
    const type = params.get('type');

    if (type === 'recovery' && token) {
      return router.createUrlTree(['/reset-password'], {
        queryParams: {
          access_token: token,
        },
      });
    }
  }


  if (sessionService.isAuthenticated()) {
    return router.createUrlTree(['/projects']);
  }

  loadingService.load();
  return authService.refreshAccessToken()
    .pipe(
      finalize(() => {
        setTimeout(() => loadingService.stop(), 200);
      }),
      map(() => {
        if (sessionService.isAuthenticated()) {
          return router.createUrlTree(['/projects']);
        }
        return true;
      }),
      catchError(() => of(true))
    );
};
