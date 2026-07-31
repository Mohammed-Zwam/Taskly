import { Routes } from '@angular/router';
import { AuthLayout } from './core/layouts/auth-layout/auth-layout';
import { UserLayout } from './core/layouts/user-layout/user-layout';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { authRoutes } from './core/routes/auth.routes';
import { projectsRoutes } from './core/routes/projects.routes';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
    },
    {
        path: '',
        component: AuthLayout,
        children: authRoutes,
        canActivate: [guestGuard],
    },
    {
        path: '',
        component: UserLayout,
        children: projectsRoutes,
        canActivate: [authGuard],
    }
];
