import { Injectable } from '@angular/core';
import { API } from '../../../api.config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project, ProjectMembersResponse, ProjectRequest } from '../model/projects.model';
import { map } from 'rxjs';
import { getAvatar } from '../../../core/utils/helpers';



@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'apikey': API.PUBLISHER_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'count=exact'
  });

  createProject(createProjectRequest: ProjectRequest) {
    return this.http.post(API.BASE + API.CREATE_PROJECT, createProjectRequest, { headers: this.headers });
  }

  updateProject(updateProjectRequest: ProjectRequest, projectId: string) {
    const params = new HttpParams().set('id', `eq.${projectId}`);
    return this.http.patch(API.BASE + API.UPDATE_PROJECT, updateProjectRequest, { headers: this.headers, params });
  }

  getProjects(currentPage: number, limit: number) {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', (currentPage - 1) * limit);

    return this.http.get<Project[]>(API.BASE + API.GET_PROJECTS, { observe: 'response', headers: this.headers, params });
  }



  getProjectDetails(projectId: string) {
    const params = new HttpParams().set('id', 'eq.' + projectId);
    return this.http.get<Project[]>(API.BASE + API.GET_PROJECTS, { headers: this.headers, params });
  }


  getProjectMembers(projectId: string) {
    const params = new HttpParams().set('project_id', 'eq.' + projectId);
    return this.http.get<ProjectMembersResponse[]>(API.BASE + API.GET_PROJECT_MEMBERS, { headers: this.headers, params })
      .pipe(
        map((response: ProjectMembersResponse[]) => {
          return response.map((projectMember) => ({
            memberId: projectMember.member_id,
            role: projectMember.role,
            department: projectMember.metadata.department,
            email: projectMember.metadata.email,
            name: projectMember.metadata.name,
            avatar: getAvatar(projectMember.metadata.name),
          }));
        })
      );
  }
}

