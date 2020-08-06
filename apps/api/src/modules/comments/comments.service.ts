import {Inject, Injectable, Scope} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {Comment, User} from '../../entities';
import {InjectRepository} from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import {REQUEST} from '@nestjs/core';
import {FastifyRequest} from 'fastify';
import {CrudRequest} from '@nestjsx/crud';

@Injectable({
    scope: Scope.REQUEST
})
export class CommentsService extends TypeOrmCrudService<Comment> {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        @Inject(REQUEST)
        private readonly request: FastifyRequest
    ) {
        super(commentRepository);
    }

    createOne(req: CrudRequest, dto: DeepPartial<Comment>): Promise<Comment> {
        const user: Partial<User> = this.request['user'];

        dto.userId = user.id;

        return super.createOne(req, dto);
    }

    updateOne(req: CrudRequest, dto: DeepPartial<Comment>): Promise<Comment> {
        delete dto.userId;
        delete dto.ticketId;

        return super.updateOne(req, dto);
    }

}
