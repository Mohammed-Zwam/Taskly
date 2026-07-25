import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NavList } from "../../../../shared/components/nav-list/nav-list";
import { ProjectForm } from "../../components/project-form/project-form";


@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule, NavList, ProjectForm],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  navList = [
    {
      label: 'projects',
      link: '/projects',
    },
    {
      label: 'add new project',
      link: 'add',
    }
  ];
}
