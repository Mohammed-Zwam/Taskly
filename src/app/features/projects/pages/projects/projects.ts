import { ProjectsService } from './../../services/projects.service';
import { Component, effect, HostListener, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Project, ProjectsState } from '../../model/projects.model';
import { DatePipe } from '@angular/common';
import { Pagination } from "../../../../shared/components/pagination/pagination";
import { BtnLoading } from "../../../../shared/components/btn-loading/btn-loading";

@Component({
  selector: 'app-projects',
  imports: [DatePipe, RouterLink, Pagination, BtnLoading],
  templateUrl: './projects.html',
})
export class Projects {
  projects: Project[] | null = [];
  state = signal<ProjectsState>('loading');
  currentPage = signal<number>(1);
  totalProjectsCount = signal<number>(0);
  limit = 5;
  isPhoneView = signal<boolean>(false);


  constructor(private projectsService: ProjectsService, private router: Router) {
    effect(() => {
      this.loadProjects();
    })
  }

  ngOnInit() {
    this.onWindowResize();
    this.onWindowResize();
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
      this.currentPage.set(1);
      this.projects = [];
      this.isPhoneView.set(true);
    } else {
      this.isPhoneView.set(false);
      this.loadProjects();
    }
  }

  editProject(project: Project) {
    this.router.navigate(
      ['projects', project.id, 'edit'],
      {
        state: {
          project
        }
      }
    );
  }

  loadProjects() {
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
