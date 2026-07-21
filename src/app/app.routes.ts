import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { authRoutes } from './features/auth/auth.routes';
import { userRoutes } from './features/user-dashboard/user.routes';
import { UserLayout } from './core/layouts/user-layout/user-layout';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/sign-up',
    },
    {
        path: '',
        component: AuthLayout,
        children: authRoutes,
        // TODO: Add Guard to check if user is already logged in, token ...
    },
    {
        path: '',
        component: UserLayout,
        children: userRoutes,
        // canActivate: [authGuard],
    }
];
