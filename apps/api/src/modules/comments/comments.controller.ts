import {Crud, CrudController} from '@nestjsx/crud';
import {Controller, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth} from '@nestjs/swagger';
import {Comment} from '../../entities';
import {CommentsService} from './comments.service';
import {UseOwnedByUserGuard} from '../../shared/guards/use-owned-by-user-guard.decorator';

@Crud({
    model: {
        type: Comment
    },
    query: {
        join: {
            user: {},
            ticket: {}
        }
    },
    routes: {
        updateOneBase: {
            decorators: [
                UseOwnedByUserGuard(Comment)
            ]
        },
        deleteOneBase: {
            decorators: [
                UseOwnedByUserGuard(Comment)
            ]
        }
    }
})
@Controller('comments')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class CommentsController implements CrudController<Comment> {
    constructor(
        public service: CommentsService
    ) {}
}
