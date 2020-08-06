import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {UserGroup} from './user-group.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, Length} from 'class-validator';
import {User} from './user.entity';

@Entity('group', {schema: 'ticket_app'})
export class Group {
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
    @Length(2, 255, { always: true })
    @ApiProperty()
    name: string;

    @OneToMany(
        () => UserGroup,
        (userGroup) => userGroup.group
    )
    userGroups: UserGroup[];

    @ManyToMany(
        () => User,
        (user) => user.groups
    )
    @ApiProperty({
        type: () => User,
        isArray: true
    })
    users: User[];

}
