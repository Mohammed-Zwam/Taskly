import { ProjectEpicRequest } from './../../models/epics.model';
import { Component, inject, Input, signal } from '@angular/core';
import { EpicsService } from '../../services/epics.service';
import { finalize } from 'rxjs';
import { ProjectEpic } from '../../models/epics.model';
import { DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { isDeadlineValid } from '../../validators';
import { ErrorMessage } from "../../../../shared/components/error-message/error-message";
import { MembersService } from '../../../members/services/members.service';
import { getAvatar } from '../../../../core/utils/helpers';
import { MemberOption } from '../../../members/models/members.model';
import { ElementRef, ViewChild } from '@angular/core';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-epic-details-popup',
  imports: [DatePipe, ErrorMessage, ReactiveFormsModule],
  templateUrl: './epic-details-popup.html',
  styleUrl: './epic-details-popup.css',
})
export class EpicDetailsPopup {
  @Input() projectId!: string;
  @Input() epicId!: string;
  @Input() close!: () => void;
  @Input() loadProjectEpics!: () => void;
  _epicsService = inject(EpicsService);
  _membersService = inject(MembersService);
  epic!: ProjectEpic;
  isLoading = signal(true);
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  description = new FormControl('', [Validators.maxLength(500)]);
  selectedProjectMember = signal<MemberOption | null>(null);
  deadline = new FormControl<string>('', [isDeadlineValid]);
  projectMembersOptions = signal<{ value: string, label: string, avatar: string }[]>([]);
  isAssigneeDropdownOpen = signal(false);
  _toastService = inject(ToastService);
  @ViewChild('deadlinePicker')
  deadlineCalender!: ElementRef<HTMLInputElement>;



  openDeadlinePicker() {
    this.deadlineCalender.nativeElement.showPicker();
  }

  ngOnInit() {
    this.fetchEpicItemDetails();
    this.loadProjectMembers();
  }

  loadProjectMembers = () => {
    this._membersService.getProjectMembers(this.projectId).subscribe({
      next: (res) => {
        this.projectMembersOptions.set(res.map(item => ({ value: item.userId, label: item.name, avatar: getAvatar(item.name) })));

      }
    })
  }

  selectMember(member: MemberOption) {
    this.selectedProjectMember.set(member);
    this.isAssigneeDropdownOpen.set(!this.isAssigneeDropdownOpen());
  }


  closePopup() {
    const updateProjectEpic: ProjectEpicRequest = {};

    if (this.title.value != this.epic.title) {
      updateProjectEpic.title = this.title.value || '';
    }

    if (this.description.value != this.epic.description) {
      updateProjectEpic.description = this.description.value || '';
    }

    if (this.selectedProjectMember()?.value != this.epic.assigneeId) {
      updateProjectEpic.assignee_id = this.selectedProjectMember()?.value;
    }
    if (this.deadline.value != this.epic.deadline) {
      updateProjectEpic.deadline = this.deadline.value || '';
    }

    if (Object.keys(updateProjectEpic).length != 0) {
      this._epicsService.updateProjectEpic(this.epicId, updateProjectEpic).subscribe({
        next: () => {
          this._toastService.show("success", "Epic updated successfully", "");
          this.loadProjectEpics();
        },
        error: () => {
          this._toastService.show("error", "Failed to update epic", "");
        }
      })
    }

    this.close();
  }

  fetchEpicItemDetails() {
    this._epicsService.getProjectEpicDetails(this.projectId, this.epicId)
      .pipe(finalize(() => { this.isLoading.set(false) }))
      .subscribe(res => {
        this.epic = res;


        this.selectedProjectMember.set({
          value: res.assigneeId,
          label: res.assigneeName,
          avatar: getAvatar(res.assigneeName)
        })
        this.deadline.setValue(res.deadline);

        this.title.setValue(res.title);
        this.description.setValue(res.description);
      })

  }


}
