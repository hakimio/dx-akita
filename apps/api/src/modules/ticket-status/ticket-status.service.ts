import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TicketStatus} from '../../entities';

@Injectable()
export class TicketStatusService extends TypeOrmCrudService<TicketStatus> {
    constructor(
        @InjectRepository(TicketStatus)
        private readonly ticketStatusRepository: Repository<TicketStatus>
    ) {
        super(ticketStatusRepository);
    }
}
