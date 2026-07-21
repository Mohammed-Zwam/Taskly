import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../../features/auth/services/session.service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const toastService = inject(ToastService);
  const router = inject(Router);
  const isAuthenticated = inject(SessionService).isAuthenticated();

  if (!isAuthenticated) {
    toastService.show('error', 'Access Denied', 'Please login to continue');
    return router.createUrlTree(['/login']);
  }
  return true;
};
