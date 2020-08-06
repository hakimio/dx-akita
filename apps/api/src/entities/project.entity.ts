import {
    Column,
    Entity,
    Index,
    JoinColumn, JoinTable, ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from './user.entity';
import {Ticket} from './ticket.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsOptional, MaxLength} from 'class-validator';
import {Type} from 'class-transformer';
import {ProjectUser} from './project-user.entity';

@Index('FK_project_user', ['leadId'], {})
@Entity('project', {schema: 'ticket_app'})
export class Project {

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

    @Column('int', {
        name: 'leadId',
        nullable: true,
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
    @ApiProperty({
        required: false
    })
    leadId: number | null;

    @ManyToOne(
        () => User,
        (user) => user.leadProjects, {
            onDelete: 'SET NULL',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'leadId',
        referencedColumnName: 'id'
    }])
    @Type(() => User)
    @ApiProperty({
        type: () => User,
        required: false
    })
    lead: User;

    @OneToMany(
        () => ProjectUser,
        (projectUser) => projectUser.project
    )
    @IsOptional({always: true})
    @Type(() => ProjectUser)
    @ApiProperty({
        type: () => ProjectUser,
        required: false,
        isArray: true
    })
    projectUsers: ProjectUser[];

    @OneToMany(
        () => Ticket,
        (ticket) => ticket.project
    )
    @IsOptional({always: true})
    @Type(() => Ticket)
    @ApiProperty({
        type: () => Ticket,
        required: false,
        isArray: true
    })
    tickets: Ticket[];

    @ManyToMany(
        () => User,
        (user) => user.projects
    )
    @JoinTable({
        name: 'project_user',
        joinColumn: {
            name: 'projectId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        }
    })
    @Type(() => User)
    @ApiProperty({
        type: () => User,
        required: false,
        isArray: true
    })
    users: User[];

}
