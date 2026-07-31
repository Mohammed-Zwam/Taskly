import { EditProject } from "./pages/edit-project/edit-project";
import { AddProject } from "./pages/add-project/add-project";
import { Projects } from "./pages/projects/projects";
import { Epics } from "./pages/epics/epics";
import { Members } from "./pages/members/members";
import { Tasks } from "./pages/tasks/tasks";
import { activeProjectGuard } from '../../core/guards/active-project-guard';

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
                path: ':id/members',
                component: Members
            }
        ]

    }


];
