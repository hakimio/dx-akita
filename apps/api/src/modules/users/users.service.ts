import {Injectable} from '@nestjs/common';
import {TypeOrmCrudService} from '@nestjsx/crud-typeorm';
import {User} from '../../entities';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class UsersService extends TypeOrmCrudService<User> {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }
}
