import { ProjectContextService } from './../../features/projects/services/project-context.service';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast.service';

export const activeProjectGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const toastService = inject(ToastService);
    const projectContextService = inject(ProjectContextService);


    console.log(projectContextService.getActiveProject())
    if (projectContextService.getActiveProject() === null) {
        toastService.show("warning", "Access Denied", "Please select a project first.");
        return router.createUrlTree(['/projects']);
    }

    return true;
};
