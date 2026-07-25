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
        path: ':id/edit',
        component: EditProject
    }
];
