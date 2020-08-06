import {Module} from '@nestjs/common';
import {CommentsService} from './comments.service';
import {CommentsController} from './comments.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Comment} from '../../entities';
import {PassportModule} from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        })
    ],
    providers: [CommentsService],
    controllers: [CommentsController]
})
export class CommentsModule {}
