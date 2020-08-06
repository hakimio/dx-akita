import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {Project} from '../../entities';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class ProjectsService extends TypeOrmCrudService<Project> {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>
    ) {
        super(projectRepository);
    }
}
