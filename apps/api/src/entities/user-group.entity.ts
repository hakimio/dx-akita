import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Group} from './group.entity';
import {User} from './user.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber} from 'class-validator';

@Index('FK_user_group_user', ['userId'], {})
@Index('FK_user_group_group', ['groupId'], {})
@Entity('user_group', {schema: 'ticket_app'})
export class UserGroup {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        unsigned: true
    })
    @ApiPropertyOptional()
    id: number;

    @Column('int', {
        name: 'userId',
        unsigned: true
    })
    @IsNotEmpty({ always: true })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        always: true
    })
    @ApiProperty()
    userId: number;

    @Column('int', {
        name: 'groupId',
        unsigned: true
    })
    @IsNotEmpty({ always: true })
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        always: true
    })
    @ApiProperty()
    groupId: number;

    @ManyToOne(
        () => Group,
        (group) => group.userGroups, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'groupId',
        referencedColumnName: 'id'
    }])
    group: Group;

    @ManyToOne(
        () => User,
        (user) => user.userGroups, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'userId',
        referencedColumnName: 'id'
    }])
    user: User;

}
