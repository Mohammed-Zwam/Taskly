import { Component, inject, signal } from '@angular/core';
import { ProjectContextService } from '../../../../core/services/project-context.service';
import { RouterLink } from "@angular/router";
import { PageState } from '../../../projects/model/projects.model';
import { ProjectEpic } from '../../models/epics.model';

@Component({
  selector: 'app-epics',
  imports: [RouterLink],
  templateUrl: './epics.html',
  styleUrl: './epics.css',
})
export class Epics {
  projectEpics: ProjectEpic[] | null = [];
  state = signal<PageState>('loading');
  currentPage = signal<number>(1);
  totalProjectsCount = signal<number>(0);
  limit = 8;
  isPhoneView = signal<boolean>(false);
  projectContextService = inject(ProjectContextService);
}
