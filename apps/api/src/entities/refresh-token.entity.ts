import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import {User} from './user.entity';
import {IsDate, IsNotEmpty, IsNumber, IsString, MaxLength} from 'class-validator';
import {Type} from 'class-transformer';

@Index('FK_refresh_token_user', ['userId'], {})
@Entity('refresh_token', {schema: 'ticket_app'})
export class RefreshToken {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        unsigned: true
    })
    id: number;

    @Column('int', {
        name: 'userId',
        unsigned: true
    })
    @IsNotEmpty({always: true})
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
        maxDecimalPlaces: 0
    }, {
        always: true
    })
    userId: number;

    @Column('varchar', {
        name: 'ipAddress',
        length: 255
    })
    @IsNotEmpty({always: true})
    @MaxLength(255, {always: true})
    ipAddress: string;

    @Column('datetime', {
        name: 'expiresAt'
    })
    @IsDate({always: true})
    expiresAt: Date;

    @Column('varchar', {
        name: 'value',
        unique: true,
        length: 255
    })
    @IsNotEmpty({always: true})
    @IsString({always: true})
    value: string;

    @ManyToOne(
        () => User,
        (user) => user.refreshTokens, {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{
        name: 'userId',
        referencedColumnName: 'id'
    }])
    @Type(() => User)
    user: User;

}
