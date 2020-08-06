import {Injectable} from '@angular/core';
import {ProjectsStore, ProjectsState} from './projects.store';
import {BaseStoreService} from '../../../shared/services/store';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService extends BaseStoreService<ProjectsState> {

    constructor(
        protected store: ProjectsStore
    ) {
        super(store);
    }

}
