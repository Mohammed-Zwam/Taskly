import { ProjectsService } from './../../services/projects.service';
import { Component, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Project, ProjectsState } from '../../model/projects.model';
import { finalize } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [RouterLink, DatePipe],
  templateUrl: './projects.html',
})
export class Projects {
  projects: Project[] = [];

  state = signal<ProjectsState>('loading');


  constructor(private projectsService: ProjectsService) { }


  ngOnInit() {
    // setTimeout(() => this.loadProjects(), 3000);
    this.loadProjects()
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
