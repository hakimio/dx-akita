import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from './user.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';
import {CrudValidationGroups} from '@nestjsx/crud';
import {Type} from 'class-transformer';
import {Ticket} from './ticket.entity';
import {SanitizeHtmlTransformer} from '../shared/transformers/sanitize-html.transformer';

const { CREATE, UPDATE } = CrudValidationGroups;

@Index('FK_comment_user', ['userId'], {})
@Index('FK_comment_ticket', ['ticketId'], {})
@Entity('comment', {schema: 'ticket_app'})
export class Comment {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        unsigned: true
    })
    @ApiProperty({
        required: false
    })
    id: number;

    @Column('int', {
        name: 'userId',
        unsigned: true
    })
    @ApiProperty({
        required: false
    })
    userId: number;

    @Column('int', {
        name: 'ticketId',
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
    @ApiPropertyOptional()
    ticketId: number;

    @Column('text', {
        name: 'content',
        transformer: new SanitizeHtmlTransformer()
    })
    @IsNotEmpty({always: true})
    @IsString({always: true})
    content: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'createdAt'
    })
    @ApiProperty({
        required: false
    })
    createdAt: Date;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        name: 'updatedAt'
    })
    @ApiProperty({
        required: false
    })
    updatedAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.comments, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'userId',
        referencedColumnName: 'id'
    }])
    @Type(() => User)
    @ApiProperty({
        type: () => User,
        required: false
    })
    user: User;

    @ManyToOne(
        () => Ticket,
        (ticket) => ticket.comments, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'ticketId',
        referencedColumnName: 'id'
    }])
    @Type(() => Ticket)
    @ApiProperty({
        type: () => Ticket,
        required: false
    })
    ticket: Ticket;

}
