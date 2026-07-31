import { Component, inject } from '@angular/core';
import { NavList } from "../../../../shared/components/nav-list/nav-list";
import { ProjectForm } from "../../components/project-form/project-form";
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectContextService } from '../../../../core/services/project-context.service';


@Component({
  selector: 'app-edit-project',
  imports: [NavList, ProjectForm, ReactiveFormsModule],
  templateUrl: './edit-project.html',
})
export class EditProject {
  navList: any[] = [];

  projectContextService = inject(ProjectContextService);

  ngOnInit() {
    const project = this.projectContextService.getActiveProject();
    this.navList = [
      {
        label: 'projects',
        link: '/projects',
      },
      {
        label: project.name,
        link: `/project/${project.id}/epics`,
      },
      {
        label: 'edit',
        link: 'edit',
      }
    ]
  }

}
