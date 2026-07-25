import { Component, signal } from '@angular/core';
import { InputField } from "../../../auth/components/input-field/input-field";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { Router, RouterLink } from "@angular/router";
import { NavList } from "../../../../shared/components/nav-list/nav-list";
import { ToastService } from '../../../../core/services/toast.service';
import { ProjectsService } from '../../services/projects.service';
import { finalize } from 'rxjs';
import { CreateProjectRequest } from '../../model/projects.model';

@Component({
  selector: 'app-add-project',
  imports: [InputField, BtnLoading, ReactiveFormsModule, RouterLink, NavList],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
})
export class AddProject {
  constructor(private toastService: ToastService, private projectsService: ProjectsService, private router: Router) { }
  projectTitle: FormControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(100), Validators.required]);
  projectDescription: FormControl = new FormControl('', [Validators.maxLength(500)]);

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

  projectCreationFormData: FormGroup = new FormGroup({
    projectTitle: this.projectTitle,
    projectDescription: this.projectDescription,
  });


  isLoading = signal(false);


  // ngOnChange
  onSubmit() {
    if (this.projectCreationFormData.invalid) {
      this.toastService.show('error', 'Invalid Inputs', 'Please fill in all fields correctly');
      this.projectCreationFormData.markAllAsTouched();
      this.projectCreationFormData.markAllAsDirty();
      return;
    }

    this.isLoading.set(true);

    let createProjectRequest: CreateProjectRequest = {
      name: this.projectTitle.value,
      description: this.projectDescription.value,
    }

    this.projectsService.createProject(createProjectRequest)
      .pipe(
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (res) => {
          this.toastService.show('success', 'Project Created', 'Project created successfully');
          this.projectCreationFormData.reset();
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.toastService.show('error', 'Project Creation Failed', err.error.message);
        }
      });
  }
}
