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


  if (sessionService.isAuthenticated()) {
    return router.createUrlTree(['/projects']);
  }

  loadingService.load();
  return authService.refreshAccessToken()
    .pipe(
      finalize(() => {
        setTimeout(() => loadingService.stop(), 300);
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
