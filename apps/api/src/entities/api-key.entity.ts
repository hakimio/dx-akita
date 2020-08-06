import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('api_key', {schema: 'ticket_app'})
export class ApiKey {

    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        unsigned: true
    })
    id: number;

    @Column('char', {
        name: 'key',
        unique: true,
        length: 32
    })
    key: string;

    @Column({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
        name: 'createdAt'
    })
    createdAt: Date;

}
