import { Injectable } from '@angular/core';
import { API } from '../../../api.config';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { getAvatar } from '../../../core/utils/helpers';
import { ProjectMembersResponse } from '../../projects/model/projects.model';



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

