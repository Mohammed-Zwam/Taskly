import { Injectable, signal } from '@angular/core';
import { Project } from '../model/projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectContextService {
  private activeProject = signal<Project | null>(null);

  getActiveProjectId() {
    return this.activeProject()?.id;
  }

  setActiveProjectId(projectId: string) {
    this.activeProject.set({
      ...(this.activeProject() ?? {} as Project),
      id: projectId,
    });
  }

  getActiveProject(): Project {
    return this.activeProject() as Project;
  }

  setActiveProject(project: Project) {
    this.activeProject.set(project);
  }

  resetActiveProject() {
    this.activeProject.set(null);
  }
}
