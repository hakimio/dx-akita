import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Project} from '../../entities';
import {ProjectsService} from './projects.service';
import {ProjectsController} from './projects.controller';
import {PassportModule} from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        })
    ],
    providers: [ProjectsService],
    controllers: [ProjectsController]
})
export class ProjectsModule {}
