import {
    Body,
    Controller,
    Get, HttpStatus,
    Ip,
    Post, Query, Req,
    UseGuards
} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {TokenService} from './token/token.service';
import {ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {LoginResponseDto} from './dto/login-response.dto';
import {CredentialsDto} from './dto/credentials.dto';
import {ExtractJwt} from 'passport-jwt';
import {User} from '../../shared/decorators/user.decorator';
import {AuthGuard} from '@nestjs/passport';
import {LogoutDto} from './dto/logout.dto';

@Controller('authentication')
export class AuthenticationController {

    constructor(
        private readonly authService: AuthenticationService,
        private readonly tokenService: TokenService
    ) {}

    @Post('login')
    @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDto })
    async login(
        @Body() credentials: CredentialsDto,
        @Ip() ipAddress: string
    ): Promise<LoginResponseDto> {
        return await this.authService.login(credentials, ipAddress);
    }

    @Get('token')
    @ApiBearerAuth()
    @ApiResponse({ status: HttpStatus.OK, type: LoginResponseDto })
    @ApiQuery({name: 'refresh_token'})
    @ApiOperation({summary: 'Refresh access token'})
    async token(
        @Req() request,
        @Ip() ipAddress: string,
        @Query('refresh_token') refreshToken?: string
    ): Promise<LoginResponseDto> {
        const oldAccessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

        return await this.tokenService.getAccessTokenFromRefreshToken(
            refreshToken,
            oldAccessToken,
            ipAddress
        );
    }

    @Post('logout')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    async logout(
        @User('id') userId,
        @Body() logoutDto: LogoutDto
    ): Promise<void> {
        await this.authService.logout(userId, logoutDto.refreshToken);
    }

}
