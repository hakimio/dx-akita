import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';

export class LogoutDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'No refresh token provided'
    })
    refreshToken: string;
}
