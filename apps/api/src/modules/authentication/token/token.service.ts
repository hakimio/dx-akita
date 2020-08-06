import {Injectable, UnauthorizedException} from '@nestjs/common';
import {randomBytes} from 'crypto';
import {JwtPayload} from './jwt-payload';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {RefreshToken} from '../../../entities';
import {LoginResponseDto} from '../dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';
import * as dayjs from 'dayjs';

@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>,
        private readonly jwtService: JwtService
    ) {}

    async getAccessTokenFromRefreshToken(
        refreshToken: string,
        oldAccessToken: string,
        ipAddress: string
    ): Promise<LoginResponseDto> {
        const refreshTokenRecord = await this.refreshTokenRepository.findOne({
                value: refreshToken
            }),
            currentDate = new Date();

        if (!refreshTokenRecord) {
            throw new UnauthorizedException('Refresh token not found');
        }
        if (refreshTokenRecord.expiresAt < currentDate) {
            throw new UnauthorizedException('Refresh token expired');
        }
        if (refreshTokenRecord.ipAddress !== ipAddress) {
            throw new UnauthorizedException('Refresh token doesn\'t belong to the client');
        }

        const oldPayload = await this.verifyAndGetPayload(oldAccessToken),
            accessToken = await this.createAccessToken({
                sub: oldPayload.sub,
                username: oldPayload.username
            });

        await this.refreshTokenRepository.delete({ value: refreshToken });
        refreshToken = await this.createRefreshToken(+oldPayload.sub, ipAddress);

        return {
            accessToken,
            refreshToken
        };
    }

    async createAccessToken(payload: JwtPayload): Promise<string> {
        return await this.jwtService.signAsync(payload);
    }

    async createRefreshToken(userId: number, ipAddress: string): Promise<string> {
        const refreshToken = randomBytes(64).toString('hex'),
            refreshTokenRecord: Partial<RefreshToken> = {
                userId,
                ipAddress,
                expiresAt: dayjs().add(1, 'day').toDate(),
                value: refreshToken
            };

        await this.refreshTokenRepository.insert(refreshTokenRecord);

        return refreshToken;
    }

    async deleteRefreshToken(userId: number, refreshToken: string) {
        await this.refreshTokenRepository.delete({
            userId,
            value: refreshToken
        });
    }

    private verifyAndGetPayload(
        token: string
    ): JwtPayload {
        return this.jwtService.verify<JwtPayload>(token, {
            ignoreExpiration: true
        });
    }

}
