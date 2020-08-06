import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User, RefreshToken} from '../../entities';
import {AuthenticationService} from './authentication.service';
import {TokenService} from './token/token.service';
import {AuthenticationController} from './authentication.controller';
import {PassportModule} from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import {environment} from '../../environments/environment';
import {JwtStrategy} from './strategy/jwt.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, RefreshToken]),
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.register(environment.JWT)
    ],
    providers: [
        AuthenticationService,
        TokenService,
        JwtStrategy
    ],
    controllers: [
        AuthenticationController
    ]
})
export class AuthenticationModule {}
