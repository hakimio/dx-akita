import {Inject, Injectable, Scope} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {Ticket, User} from '../../entities';
import {InjectRepository} from '@nestjs/typeorm';
import {DeepPartial, Repository} from 'typeorm';
import {REQUEST} from '@nestjs/core';
import {FastifyRequest} from 'fastify';
import {CrudRequest} from '@nestjsx/crud';

@Injectable({
    scope: Scope.REQUEST
})
export class TicketsService extends TypeOrmCrudService<Ticket> {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        @Inject(REQUEST)
        private readonly request: FastifyRequest
    ) {
        super(ticketRepository);
    }

    createOne(req: CrudRequest, dto: DeepPartial<Ticket>): Promise<Ticket> {
        const user: Partial<User> = this.request['user'];

        dto.creatorId = user.id;
        dto.modifiedById = user.id;

        return super.createOne(req, dto);
    }

    updateOne(req: CrudRequest, dto: DeepPartial<Ticket>): Promise<Ticket> {
        const user: Partial<User> = this.request['user'];

        delete dto.creatorId;
        dto.modifiedById = user.id;

        return super.updateOne(req, dto);
    }

}
