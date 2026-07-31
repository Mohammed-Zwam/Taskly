import { Component, Input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputField } from "../../../auth/components/input-field/input-field";
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { ToastService } from '../../../../core/services/toast.service';
import { ProjectsService } from '../../services/projects.service';
import { Router, RouterLink } from '@angular/router';
import { Project, ProjectRequest } from '../../model/projects.model';
import { finalize } from 'rxjs';
import { ProjectContextService } from '../../services/project-context.service';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, InputField, BtnLoading, RouterLink],
  templateUrl: './project-form.html',
})
export class ProjectForm {
  @Input() formType: 'create' | 'edit' = 'create';
  isLoading = signal<boolean>(false);
  @Input() project!: Project;
  projectTitle: FormControl = new FormControl('', [Validators.minLength(3), Validators.maxLength(100), Validators.required]);
  projectDescription: FormControl = new FormControl('', [Validators.maxLength(500)]);
  projectFormData: FormGroup = new FormGroup({
    projectTitle: this.projectTitle,
    projectDescription: this.projectDescription,
  });


  constructor(
    private toastService: ToastService,
    private projectsService: ProjectsService,
    private router: Router,
  ) { }

  ngOnInit() {

    if (this.formType === 'edit') {
      this.projectTitle.setValue(this.project.name);
      this.projectDescription.setValue(this.project.description);
    }
  }

  onSubmit() {
    if (this.projectFormData.invalid) {
      this.toastService.show('error', 'Invalid Inputs', 'Please fill in all fields correctly');
      this.projectFormData.markAllAsTouched();
      this.projectFormData.markAllAsDirty();
      return;
    }

    this.isLoading.set(true);

    let updateProjectRequest: ProjectRequest = {
      name: this.projectTitle.value,
      description: this.projectDescription.value,
    }

    if (this.formType === 'create') {
      this.projectsService.createProject(updateProjectRequest)
        .pipe(
          finalize(() => this.isLoading.set(false))
        )
        .subscribe({
          next: (res) => {
            this.toastService.show('success', 'Project Created', 'Project created successfully');
            this.projectFormData.reset();
            this.router.navigate(['/projects']);
          },
          error: (err) => {
            this.toastService.show('error', 'Project Create Failed', err.error.message);
          }
        });
    } else {
      this.projectsService.updateProject(updateProjectRequest, this.project.id)
        .pipe(
          finalize(() => this.isLoading.set(false))
        )
        .subscribe({
          next: (res) => {
            this.toastService.show('success', 'Project Updated', 'Project updated successfully');
            this.projectFormData.reset();
            this.router.navigate(['/projects']);
          },
          error: (err) => {
            this.toastService.show('error', 'Project Update Failed', err.error.message);
          }
        });
    }
  }
}
