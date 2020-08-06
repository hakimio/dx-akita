import {Crud, CrudController} from '@nestjsx/crud';
import {User} from '../../entities';
import {UsersService} from './users.service';
import {Controller, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth} from '@nestjs/swagger';

@Crud({
    model: {
        type: User
    },
    query: {
        join: {
            comments: {},
            projects: {},
            ticketsCreated: {},
            ticketsAssigned: {},
            ticketsModified: {},
            userGroups: {},
            groups: {
                eager: true
            }
        }
    },
    routes: {
        only: ['getOneBase', 'getManyBase']
    }
})
@Controller('users')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class UsersController implements CrudController<User> {
    constructor(
        public service: UsersService
    ) {}
}
