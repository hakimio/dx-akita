import {Controller, UseGuards} from '@nestjs/common';
import {Crud, CrudController} from '@nestjsx/crud';
import {Project} from '../../entities';
import {ProjectsService} from './projects.service';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth} from '@nestjs/swagger';

@Crud({
    model: {
        type: Project
    },
    query: {
        join: {
            lead: {},
            tickets: {},
            users: {
                eager: true
            }
        }
    },
    routes: {
        exclude: ['createManyBase', 'replaceOneBase', 'deleteOneBase']
    }
})
@Controller('projects')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ProjectsController implements CrudController<Project> {
    constructor(
        public service: ProjectsService
    ) {}
}
