import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CredentialsDto} from './dto/credentials.dto';
import {LoginResponseDto} from './dto/login-response.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../../entities';
import {Repository} from 'typeorm';
import {AuthUtils} from '../../utils/auth-utils';
import {TokenService} from './token/token.service';

@Injectable()
export class AuthenticationService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly tokenService: TokenService
    ) {}

    async login(
        credentials: CredentialsDto,
        ipAddress: string
    ): Promise<LoginResponseDto> {
        const user = await this.userRepository.findOne({
            username: credentials.username
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await AuthUtils.validatePassword(credentials.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const accessToken = await this.tokenService.createAccessToken({
                sub: user.id.toString(),
                username: user.username
            }),
            refreshToken = await this.tokenService.createRefreshToken(user.id, ipAddress);

        return {
            accessToken,
            refreshToken
        };
    }

    async logout(userId: number, refreshToken: string): Promise<void> {
        await this.tokenService.deleteRefreshToken(userId, refreshToken);
    }

}
