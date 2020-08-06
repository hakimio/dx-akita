import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {ProjectsStore, ProjectsState} from './projects.store';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProjectsQuery extends QueryEntity<ProjectsState> {

    focusedProject$ = this.select('focusedId')
        .pipe(
            switchMap(id => this.selectEntity(id))
        );
    focusedProjectid$ = this.select('focusedId');

    selectedProject$ = this.select('selectedId')
        .pipe(
            switchMap(id => this.selectEntity(id))
        );
    selectedProjectId$ = this.select('selectedId');

    constructor(
        protected store: ProjectsStore
    ) {
        super(store);
    }

}
