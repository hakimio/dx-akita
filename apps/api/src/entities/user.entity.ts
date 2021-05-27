import {
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Comment} from './comment.entity';
import {Project} from './project.entity';
import {Ticket} from './ticket.entity';
import {UserGroup} from './user-group.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsISO8601, IsNotEmpty, IsOptional, Length, MaxLength, ValidateNested} from 'class-validator';
import {CrudValidationGroups} from '@nestjsx/crud';
import {Exclude, Type} from 'class-transformer';
import {Group} from './group.entity';
import {ProjectUser} from './project-user.entity';
import {RefreshToken} from './refresh-token.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('user', {schema: 'ticket_app'})
export class User {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        unsigned: true
    })
    @ApiPropertyOptional()
    id: number;

    @Column('varchar', {
        name: 'username',
        length: 255
    })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @MaxLength(255, {always: true})
    @ApiPropertyOptional()
    username: string;

    @Column('varchar', {
        name: 'firstName',
        length: 255
    })
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Length(2, 255, {always: true})
    @ApiPropertyOptional()
    firstName: string;

    @Column('varchar', {
        name: 'lastName',
        length: 255,
        nullable: true
    })
    @IsOptional({ always: true })
    @MaxLength(255, {always: true})
    @ApiPropertyOptional()
    lastName: string;

    @Column('varchar', {
        name: 'deviceId',
        length: 255,
        nullable: true
    })
    @Exclude()
    @IsOptional({ always: true })
    @MaxLength(255, {always: true})
    @ApiPropertyOptional()
    deviceId: string;

    @Column('date', {
        name: 'birthDate',
        nullable: true
    })
    @IsOptional({ always: true })
    @IsISO8601({strict: false}, { always: true })
    @ApiPropertyOptional()
    birthDate: string | null;

    @Column('char', {name: 'password', length: 60})
    @Exclude()
    password: string;

    @Column('datetime', {
        name: 'lastLoginDate',
        nullable: true
    })
    @Exclude()
    @IsOptional({always: true})
    @IsISO8601({strict: true}, { always: true })
    lastLoginDate: Date | null;

    @OneToMany(
        () => Comment,
        (comment) => comment.user
    )
    @IsOptional({always: true})
    @ValidateNested({ always: true, each: true })
    @Type(() => Comment)
    @ApiPropertyOptional({
        type: () => Comment,
        isArray: true
    })
    comments: Comment[];

    @OneToMany(
        () => Ticket,
        (ticket) => ticket.creator
    )
    @Type(() => Ticket)
    @ApiPropertyOptional({
        type: () => Ticket,
        isArray: true
    })
    ticketsCreated: Ticket[];

    @OneToMany(
        () => Ticket,
        (ticket) => ticket.assignee
    )
    @Type(() => Ticket)
    @ApiPropertyOptional({
        type: () => Ticket,
        isArray: true
    })
    ticketsAssigned: Ticket[];

    @OneToMany(
        () => Ticket,
        (ticket) => ticket.modifiedBy
    )
    @Type(() => Ticket)
    @ApiPropertyOptional({
        type: () => Ticket,
        isArray: true
    })
    ticketsModified: Ticket[];

    @OneToMany(
        () => ProjectUser,
        (projectUser) => projectUser.user
    )
    @Type(() => ProjectUser)
    @ApiPropertyOptional({
        type: () => ProjectUser,
        isArray: true
    })
    projectUsers: ProjectUser[];

    @ManyToMany(
        () => Project,
        (project) => project.users
    )
    @Type(() => Project)
    @ApiPropertyOptional({
        type: () => Project,
        isArray: true
    })
    projects: Project[];

    @OneToMany(
        () => Project,
        (project) => project.lead
    )
    leadProjects: Project[];

    @OneToMany(
        () => UserGroup,
        (userGroup) => userGroup.user
    )
    userGroups: UserGroup[];

    @ManyToMany(
        () => Group,
        (group) => group.users
    )
    @JoinTable({
        name: 'user_group',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'groupId',
            referencedColumnName: 'id'
        }
    })
    @ApiProperty({
        type: () => Group,
        isArray: true
    })
    groups: Group[];

    @OneToMany(
        () => RefreshToken,
        (refreshToken) => refreshToken.user
    )
    @Exclude()
    refreshTokens: RefreshToken[];

}
