import { ProjectsService } from './../../services/projects.service';
import { Component, signal } from '@angular/core';
import { NavList } from "../../../../shared/components/nav-list/nav-list";
import { ProjectForm } from "../../components/project-form/project-form";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { Project } from '../../model/projects.model';

@Component({
  selector: 'app-edit-project',
  imports: [NavList, ProjectForm, ReactiveFormsModule],
  templateUrl: './edit-project.html',
})
export class EditProject {
  navList = [
    {
      label: 'projects',
      link: '/projects',
    },
    {
      label: 'edit',
      link: 'edit',
    }
  ];

}
