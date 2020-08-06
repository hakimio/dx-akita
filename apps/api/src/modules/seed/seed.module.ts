import {Module} from '@nestjs/common';
import {SeedService} from './seed.service';
import {SeedController} from './seed.controller';
import {ApiKeyModule} from '../../utils/api-key';

@Module({
    imports: [ApiKeyModule],
    providers: [SeedService],
    controllers: [SeedController]
})
export class SeedModule {}
