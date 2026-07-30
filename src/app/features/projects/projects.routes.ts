import { EditProject } from "./pages/edit-project/edit-project";
import { AddProject } from "./pages/add-project/add-project";
import { Projects } from "./pages/projects/projects";

export const projectsRoutes = [
    {
        path: '',
        component: Projects,

    },
    {
        path: 'add',
        component: AddProject
    },
    {
<<<<<<< Updated upstream
        path: ':id/edit',
        component: EditProject
=======
        path: "project",
        // canActivate: [activeProjectGuard],
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
>>>>>>> Stashed changes
    }
];
