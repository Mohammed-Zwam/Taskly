import { Component, effect, HostListener, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PageState } from '../../../projects/model/projects.model';
import { ProjectEpic } from '../../models/epics.model';
import { EpicsService } from '../../services/epics.service';
import { ErrorState } from "../../../../shared/components/error-state/error-state";
import { Pagination } from "../../../../shared/components/pagination/pagination";
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { DatePipe } from '@angular/common';
import { NavList } from "../../../../shared/components/nav-list/nav-list";
import { ProjectContextService } from '../../../projects/services/project-context.service';

@Component({
  selector: 'app-epics',
  imports: [RouterLink, ErrorState, Pagination, BtnLoading, DatePipe, NavList],
  templateUrl: './epics.html',
})
export class Epics {
  projectEpics: ProjectEpic[] | null = [];
  state = signal<PageState>('loading');
  currentPage = signal<number>(1);
  totalProjectsCount = signal<number>(0);
  limit = 6;
  isPhoneView = signal<boolean>(false);
  projectContextService = inject(ProjectContextService);
  epicsService = inject(EpicsService);


  constructor() {
    effect(() => {
      this.loadProjectEpics();
    })
  }

  ngOnInit() {
    this.onWindowResize();
    this.onWindowResize();
    this.loadProjectEpics();

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
        label: 'epics',
        link: 'epics',
      }
    ]
  }




  @HostListener('window:scroll')
  onWindowScroll() {
    if (this.isPhoneView()) {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;

      if ((scrollPosition + 50 >= documentHeight) && this.currentPage() < Math.ceil(this.totalProjectsCount() / this.limit)) {
        this.currentPage.set(this.currentPage() + 1);
      }
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth < 768) {
      if (!this.isPhoneView()) {
        this.projectEpics = [];
        if (this.currentPage() === 1) this.loadProjectEpics();
        else this.currentPage.set(1);
      }
      this.isPhoneView.set(true);
    } else {
      if (this.isPhoneView()) this.loadProjectEpics();
      this.isPhoneView.set(false);
    }
  }



  navList: any[] = [];



  loadProjectEpics = () => {
    this.state.set('loading');
    this.epicsService.getProjectEpics(this.projectContextService.getActiveProjectId(), this.currentPage(), this.limit)
      .subscribe({
        next: (res) => {
          if (this.isPhoneView()) this.projectEpics = [...this.projectEpics || [], ...res.epics || []];
          else this.projectEpics = res.epics;
          if (res.epics?.length === 0) this.state.set('empty');
          else this.state.set('success');
          this.totalProjectsCount.set(res.total);

        }, error: (err) => {
          this.state.set('error');
        }
      })
  }
}
