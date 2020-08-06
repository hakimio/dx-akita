import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TicketStatus} from '../../entities';
import {PassportModule} from '@nestjs/passport';
import {TicketStatusService} from './ticket-status.service';
import {TicketStatusController} from './ticket-status.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([TicketStatus]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
    ],
    providers: [TicketStatusService],
    controllers: [TicketStatusController]
})
export class TicketStatusModule {}
