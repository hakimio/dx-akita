import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Ticket} from '../../entities';
import {TicketsService} from './tickets.service';
import {TicketsController} from './tickets.controller';
import {PassportModule} from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
    ],
    providers: [TicketsService],
    controllers: [TicketsController]
})
export class TicketsModule {}
