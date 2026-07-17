import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { authRoutes } from './features/auth/auth.routes';

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
    },
];
