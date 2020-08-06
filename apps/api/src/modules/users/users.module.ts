import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../../entities';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {PassportModule} from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
    ],
    providers: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {}
