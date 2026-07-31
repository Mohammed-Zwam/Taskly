// project_id=eq.{projectId}

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "../../../api.config";
import { ProjectEpicRequest } from "../models/epics.model";

@Injectable({
    providedIn: 'root',
})
export class EpicsService {

    constructor(private http: HttpClient) { }

    headers = new HttpHeaders({
        'apikey': API.PUBLISHER_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'count=exact'
    });


    createProjectEpic(createProjectEpicRequest: ProjectEpicRequest) {
        return this.http.post(API.BASE + API.CREATE_PROJECT_EPIC, createProjectEpicRequest, { headers: this.headers });
    }
}