import {Controller, Post, UseGuards} from '@nestjs/common';
import {SeedService} from './seed.service';
import {ApiKeyGuard} from '../../utils/api-key';
import {ApiSecurity} from '@nestjs/swagger';

@Controller('seed')
@UseGuards(ApiKeyGuard)
export class SeedController {

    constructor(
        private seedService: SeedService
    ) {}

    @ApiSecurity('X-Api-Key')
    @Post('populateDatabase')
    async populateDatabase() {
        await this.seedService.populateDB();
    }

}
