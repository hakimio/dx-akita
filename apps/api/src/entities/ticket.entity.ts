import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Project} from './project.entity';
import {TicketStatus} from './ticket-status.entity';
import {User} from './user.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested} from 'class-validator';
import {CrudValidationGroups} from '@nestjsx/crud';
import {Type} from 'class-transformer';
import {Comment} from './comment.entity';
import {SanitizeHtmlTransformer} from '../shared/transformers/sanitize-html.transformer';

const { CREATE, UPDATE } = CrudValidationGroups;

@Index('FK_ticket_project', ['projectId'], {})
@Index('FK_ticket_user', ['creatorId'], {})
@Index('FK_ticket_user_2', ['assigneeId'], {})
@Index('FK_ticket_user_3', ['modifiedById'], {})
@Index('FK_ticket_ticket_status', ['ticketStatusId'], {})
@Entity('ticket', {schema: 'ticket_app'})
export class Ticket {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        unsigned: true
    })
    @ApiPropertyOptional()
    id: number;

    @Column('int', {
        name: 'projectId',
        unsigned: true
    })
    @IsNotEmpty({groups: [CREATE]})
    @IsOptional({groups: [UPDATE]})
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        always: true
    })
    @ApiProperty()
    projectId: number;

    @Column('int', {
        name: 'creatorId',
        unsigned: true
    })
    @ApiProperty()
    creatorId: number;

    @Column('int', {
        name: 'assigneeId',
        unsigned: true,
        nullable: true
    })
    @IsOptional({always: true})
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        always: true
    })
    @ApiPropertyOptional()
    assigneeId: number | null;

    @Column('int', {
        name: 'modifiedById',
        unsigned: true
    })
    @ApiProperty()
    modifiedById: number;

    @Column('int', {
        name: 'ticketStatusId',
        default: () => '2',
        unsigned: true
    })
    @IsOptional({always: true})
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        always: true
    })
    @ApiPropertyOptional()
    ticketStatusId: number;

    @Column('varchar', {name: 'title', length: 255})
    @IsNotEmpty({groups: [CREATE]})
    @IsOptional({groups: [UPDATE]})
    @MaxLength(255, {always: true})
    @ApiProperty()
    title: string;

    @Column('text', {
        name: 'description',
        transformer: new SanitizeHtmlTransformer(),
        nullable: true
    })
    @IsOptional({always: true})
    @IsString({always: true})
    @ApiPropertyOptional()
    description: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'createdAt'
    })
    @ApiPropertyOptional()
    createdAt: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updatedAt'
    })
    @ApiPropertyOptional()
    updatedAt: Date;

    @ManyToOne(
        () => Project,
        (project) => project.tickets, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'projectId',
        referencedColumnName: 'id'
    }])
    @Type(() => Project)
    @ApiPropertyOptional({type: () => Project})
    project: Project;

    @ManyToOne(
        () => TicketStatus,
        (ticketStatus) => ticketStatus.tickets, {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'ticketStatusId',
        referencedColumnName: 'id'
    }])
    @Type(() => TicketStatus)
    @ApiPropertyOptional({type: () => TicketStatus})
    ticketStatus: TicketStatus;

    @OneToMany(
        () => Comment,
        (comment) => comment.ticket
    )
    @IsOptional({always: true})
    @ValidateNested({ always: true, each: true })
    @Type(() => Comment)
    @ApiProperty({
        type: () => Comment,
        isArray: true
    })
    comments: Comment[];

    @ManyToOne(
        () => User,
        (user) => user.ticketsCreated, {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'creatorId',
        referencedColumnName: 'id'
    }])
    @Type(() => User)
    @ApiPropertyOptional({type: () => User})
    creator: User;

    @ManyToOne(
        () => User,
        (user) => user.ticketsAssigned, {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'assigneeId',
        referencedColumnName: 'id'
    }])
    @Type(() => User)
    @ApiPropertyOptional({type: () => User})
    assignee: User;

    @ManyToOne(
        () => User,
        (user) => user.ticketsModified, {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'modifiedById',
        referencedColumnName: 'id'
    }])
    @Type(() => User)
    @ApiPropertyOptional({type: () => User})
    modifiedBy: User;

}
