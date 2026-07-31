import { EditProject } from "./pages/edit-project/edit-project";
import { AddProject } from "./pages/add-project/add-project";
import { Projects } from "./pages/projects/projects";
import { Tasks } from "./pages/tasks/tasks";
import { activeProjectGuard } from '../../core/guards/active-project-guard';
import { Epics } from "../epics/pages/epics/epics";
import { Members } from "../members/pages/members/members";
import { AddEpic } from "../epics/pages/add-epic/add-epic";

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
