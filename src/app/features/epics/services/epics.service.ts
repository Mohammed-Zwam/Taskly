// project_id=eq.{projectId}

import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API } from "../../../api.config";
import { ProjectEpic, ProjectEpicRequest, ProjectEpicResponse } from "../models/epics.model";
import { map } from "rxjs";
import { getAvatar } from "../../../core/utils/helpers";

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


    getProjectEpics(projectId: string, currentPage: number, limit: number) {
        const params = new HttpParams()
            .set('project_id', 'eq.' + projectId)
            .set('limit', limit.toString())
            .set('offset', (currentPage - 1) * limit);


        return this.http.get<ProjectEpicResponse[]>(API.BASE + API.GET_PROJECT_EPICS, { observe: 'response', headers: this.headers, params })
            .pipe(
                map(
                    (response): { epics: ProjectEpic[], total: number } => {
                        const epics: ProjectEpic[] = response.body?.map((item: ProjectEpicResponse): ProjectEpic => {
                            return ({
                                epicId: item.epic_id,
                                title: item.title,
                                assigneeName: item.assignee.name,
                                assigneeAvatar: getAvatar(item.assignee.name),
                                createdBy: item.created_by.name,
                                createdAt: item.created_at

                            })
                        }) || [];

                        return { epics, total: Number(response.headers.get('Content-Range')?.split('/')[1]) };
                    }
                )
            );
    }
}
