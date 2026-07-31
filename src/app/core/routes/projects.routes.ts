import { activeProjectGuard } from '../../core/guards/active-project-guard';
import { AddEpic } from '../../features/epics/pages/add-epic/add-epic';
import { Epics } from '../../features/epics/pages/epics/epics';
import { AddProject } from '../../features/projects/pages/add-project/add-project';
import { EditProject } from '../../features/projects/pages/edit-project/edit-project';
import { Members } from '../../features/members/pages/members/members';
import { Projects } from '../../features/projects/pages/projects/projects';
import { Tasks } from '../../features/projects/pages/tasks/tasks';

export const projectsRoutes = [
    {
        path: 'projects',
        component: Projects,
    },
    {
        path: 'projects/add',
        component: AddProject
    },
    {
        canActivate: [activeProjectGuard],
        path: "project",
        children: [
            {
                path: ':id/edit',
                component: EditProject
            },
            {
                path: ':id/tasks',
                component: Tasks
            },
            {
                path: ':id/epics',
                component: Epics
            },
            {
                path: ':id/epics/new',
                component: AddEpic
            },
            {
                path: ':id/members',
                component: Members
            }
        ]

    }


];