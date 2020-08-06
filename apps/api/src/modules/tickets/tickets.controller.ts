import {Crud, CrudController} from '@nestjsx/crud';
import {Ticket} from '../../entities';
import {TicketsService} from './tickets.service';
import {Controller, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth} from '@nestjs/swagger';

@Crud({
    model: {
        type: Ticket
    },
    query: {
        join: {
            project: {},
            ticketStatus: {},
            comments: {},
            creator: {},
            assignee: {},
            modifiedBy: {}
        }
    }
})
@Controller('tickets')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TicketsController implements CrudController<Ticket> {
    constructor(
        public service: TicketsService
    ) {}
}
