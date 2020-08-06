import {Crud, CrudController} from '@nestjsx/crud';
import {TicketStatus} from '../../entities';
import {Controller, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiBearerAuth} from '@nestjs/swagger';
import {TicketStatusService} from './ticket-status.service';

@Crud({
    model: {
        type: TicketStatus
    },
    query: {
        join: {
            tickets: {}
        }
    },
    routes: {
        only: ['getOneBase', 'getManyBase']
    }
})
@Controller('ticket-status')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class TicketStatusController implements CrudController<TicketStatus> {
    constructor(
        public service: TicketStatusService
    ) {}
}
