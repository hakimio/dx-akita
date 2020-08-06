import {Component, OnInit} from '@angular/core';
import {ProjectsQuery} from '../state/projects.query';
import {ProjectsStore} from '../state/projects.store';
import {ProjectsService} from '../state/projects.service';

@Component({
    selector: 'dxa-project-selector',
    templateUrl: './project-selector.component.html',
    styleUrls: ['./project-selector.component.scss']
})
export class ProjectSelectorComponent implements OnInit {

    projects$ = this.projectsQuery.selectAll();
    selectedProjectId$ = this.projectsQuery.select('selectedId');

    constructor(
        private readonly projectsQuery: ProjectsQuery,
        private readonly projectsStore: ProjectsStore,
        private readonly projectsService: ProjectsService
    ) {}

    ngOnInit() {
        this.loadProjects();
    }

    loadProjects() {
        if (!this.projectsQuery.getHasCache()) {
            this.projectsService.load().subscribe();
        }
    }

    valueChanged(e) {
        const selectedId: number = e.value;

        this.projectsStore.update({
            selectedId
        });
    }

}
