import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {Project} from './project.entity';
import {User} from './user.entity';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber} from 'class-validator';

@Index('FK_project_user_project', ['projectId'], {})
@Index('FK_project_user_user', ['userId'], {})
@Entity('project_user', {schema: 'ticket_app'})
export class ProjectUser {

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
    @IsNotEmpty({ always: true })
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

    @ManyToOne(
        () => Project,
        (project) => project.projectUsers, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'projectId',
        referencedColumnName: 'id'
    }])
    project: Project;

    @ManyToOne(
        () => User,
        (user) => user.projectUsers, {
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
