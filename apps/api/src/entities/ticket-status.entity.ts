import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Ticket} from './ticket.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsOptional, MaxLength} from 'class-validator';
import {Type} from 'class-transformer';

@Entity('ticket_status', {schema: 'ticket_app'})
export class TicketStatus {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        unsigned: true
    })
    @ApiPropertyOptional()
    id: number;

    @Column('varchar', {
        name: 'name',
        length: 255
    })
    @IsNotEmpty({always: true})
    @MaxLength(255, {always: true})
    @ApiProperty()
    name: string;

    @OneToMany(
        () => Ticket,
        (ticket) => ticket.ticketStatus
    )
    @IsOptional({always: true})
    @Type(() => Ticket)
    @ApiProperty({
        type: () => Ticket,
        required: false,
        isArray: true
    })
    tickets: Ticket[];

}
