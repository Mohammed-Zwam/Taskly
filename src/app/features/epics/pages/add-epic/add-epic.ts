import { Component, inject, signal } from '@angular/core';
import { ProjectContextService } from '../../../../core/services/project-context.service';
import { NavList } from "../../../../shared/components/nav-list/nav-list";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { ErrorMessage } from "../../../../shared/components/error-message/error-message";
import { ToastService } from '../../../../core/services/toast.service';
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { EpicsService } from '../../services/epics.service';
import { ProjectEpicRequest } from '../../models/epics.model';
import { finalize } from 'rxjs';
import { MembersService } from '../../../members/services/members.service';

@Component({
  selector: 'app-add-epic',
  imports: [NavList, ReactiveFormsModule, RouterLink, ErrorMessage, BtnLoading],
  templateUrl: './add-epic.html',
})
export class AddEpic {
  navList: any[] = [];
  isLoading = signal<boolean>(false);
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [Validators.maxLength(500)]);
  assigneeId = new FormControl<string | null>(null, [this.isAssignedIdValid]);
  deadline = new FormControl<Date | null>(null, [this.isDeadlineValid]);
  addEpicFormData = new FormGroup({
    title: this.title,
    description: this.description,
    assigneeId: this.assigneeId,
    deadline: this.deadline,
  });
  projectMembersOptions = signal<{ value: string, label: string }[]>([]);

  projectContextService = inject(ProjectContextService);
  toastService = inject(ToastService);
  membersService = inject(MembersService);
  epicsService = inject(EpicsService);
  router = inject(Router);



  isAssignedIdValid(control: AbstractControl) {
    if (control.value === 'null' || control.value === null) return { required: true }
    return null;
  }

  isDeadlineValid(control: AbstractControl) {
    if (control.value === null) return { required: true }

    const deadline = new Date(control.value);

    deadline.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deadline < today) {
      return { pastDate: true };
    }

    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);

    if (deadline > maxDate) {
      return { maxDate: true }
    };

    return null;
  }


  ngOnInit() {
    const project = this.projectContextService.getActiveProject();
    this.loadProjectMembers();
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
        label: 'epics',
        link: `/project/${project.id}/epics`,
      },
      {
        label: 'new epic',
        link: 'new epic'
      }
    ]
  }



  loadProjectMembers = () => {
    this.membersService.getProjectMembers(this.projectContextService.getActiveProjectId()).subscribe({
      next: (res) => {
        this.projectMembersOptions.set(res.map(item => ({ value: item.userId, label: item.name })));
      }
    })
  }

  onSubmit() {
    if (this.addEpicFormData.invalid) {
      this.toastService.show('error', 'Invalid Inputs', 'Please fill in all required fields correctly.');
      this.addEpicFormData.markAllAsTouched();
      this.addEpicFormData.markAllAsDirty();
      return;
    }

    this.isLoading.set(true);
    let createProjectEpicRequest: ProjectEpicRequest = {
      title: this.title.value || '',
      description: this.description.value || '',
      assignee_id: this.assigneeId.value || '',
      deadline: this.deadline.value?.toString() || '',
      project_id: this.projectContextService.getActiveProjectId(),
    }
    this.epicsService.createProjectEpic(createProjectEpicRequest).pipe(
      finalize(() => this.isLoading.set(false))
    )
      .subscribe({
        next: () => {
          this.toastService.show('success', 'Epic Created', 'Epic created successfully.');
          this.router.navigate([
            '/project',
            this.projectContextService.getActiveProjectId(),
            'epics'
          ]);
        },
        error: (res) => {
          this.toastService.show('error', 'Epic Created Failed', res.error.msg);
        }
      })
  }
}
