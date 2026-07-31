import { ProjectContextService } from './../../services/project-context.service';
import { ProjectsService } from './../../services/projects.service';
import { Component, effect, HostListener, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { PageState, Project } from '../../model/projects.model';
import { DatePipe } from '@angular/common';
import { Pagination } from "../../../../shared/components/pagination/pagination";
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";
import { ErrorState } from "../../../../shared/components/error-state/error-state";

@Component({
  selector: 'app-projects',
  imports: [DatePipe, RouterLink, Pagination, BtnLoading, ErrorState],
  templateUrl: './projects.html',
})
export class Projects {
  projects: Project[] | null = [];
  state = signal<PageState>('loading');
  currentPage = signal<number>(1);
  totalProjectsCount = signal<number>(0);
  isPhoneView = signal<boolean>(false);
  limit = 8;


  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private projectContextService: ProjectContextService
  ) {
    effect(() => {
      this.loadProjects();
    })
  }

  ngOnInit() {
    this.onWindowResize();
    this.onWindowResize();
    this.projectContextService.resetActiveProject();
  }


  navigateToProject(project: Project, page: string) {
    this.projectContextService.setActiveProject(project);
    this.router.navigate(['project', project.id, page]);
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
        this.projects = [];
        if (this.currentPage() === 1) this.loadProjects();
        else this.currentPage.set(1);
      }
      this.isPhoneView.set(true);
    } else {
      if (this.isPhoneView()) this.loadProjects();
      this.isPhoneView.set(false);
    }
  }

  loadProjects = () => {
    this.state.set('loading');

    this.projectsService.getProjects(this.currentPage(), this.limit)
      .subscribe({
        next: (res) => {
          if (this.isPhoneView()) this.projects = [...this.projects || [], ...res.body || []];
          else this.projects = res.body;
          if (res.body?.length === 0) this.state.set('empty');
          else this.state.set('success');
          this.totalProjectsCount.set(Number(res.headers.get('Content-Range')?.split('/')[1]));

        }, error: (err) => {
          this.state.set('error');
        }
      });
  }
}
