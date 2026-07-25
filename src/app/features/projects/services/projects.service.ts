import { CreateProjectRequest, Project } from './../model/projects.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../../../api.config';



@Injectable({
  providedIn: 'root',
})
export class ProjectsService {

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'apikey': API.PUBLISHER_KEY,
    'Content-Type': 'application/json'
  });


  createProject(createProjectRequest: CreateProjectRequest) {
    return this.http.post(API.BASE + API.CREATE_PROJECT, createProjectRequest, { headers: this.headers });
  }


  getProjects() {
    return this.http.get<Project[]>(API.BASE + API.GET_PROJECTS, { headers: this.headers });
  }


}
