import { ProjectsService } from './../../services/projects.service';
import { Component, signal } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Project, ProjectsState } from '../../model/projects.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [DatePipe, RouterLink],
  templateUrl: './projects.html',
})
export class Projects {
  projects: Project[] = [];
  state = signal<ProjectsState>('loading');


  constructor(private projectsService: ProjectsService, private router: Router) { }


  ngOnInit() {
    this.loadProjects()
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

    this.projectsService.getProjects()
      .subscribe({
        next: (res) => {
          this.projects = res;
          if (res.length === 0) this.state.set('empty');
          else this.state.set('success');
        }, error: (err) => {
          this.state.set('error');
        }
      });
  }
}
