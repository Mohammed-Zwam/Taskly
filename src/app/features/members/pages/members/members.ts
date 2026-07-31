import { Component, signal } from '@angular/core';

import { NgClass } from '@angular/common';
import { NavList } from '../../../../shared/components/nav-list/nav-list';
import { ErrorState } from '../../../../shared/components/error-state/error-state';

import { getRandomColor } from '../../../../core/utils/helpers';
import { PageState, ProjectMember } from '../../../projects/model/projects.model';
import { ProjectContextService } from '../../../projects/services/project-context.service';
import { MembersService } from '../../services/members.service';


@Component({
  selector: 'app-members',
  imports: [ErrorState, NavList, NgClass],
  templateUrl: './members.html',
})
export class Members {
  state = signal<PageState>('loading');

  projectMembers: ProjectMember[] = [];

  constructor(
    private membersService: MembersService,
    private projectContextService: ProjectContextService,
  ) { }

  ngOnInit() {
    this.loadProjectMembers();
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
        label: 'members',
        link: 'members',
      }
    ]
  }
  navList: any[] = [];


  loadProjectMembers = () => {
    this.state.set('loading');

    this.membersService.getProjectMembers(this.projectContextService.getActiveProjectId()).subscribe({
      next: (res) => {
        this.projectMembers = res.map(item => ({ ...item, avatarColor: getRandomColor() }));
        this.state.set('success');
      },
      error: () => {
        this.state.set('error');

      }
    })
  }

}
