import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {ApiKeyStrategy} from './api-key.strategy';
import {ApiKeyService} from './api-key.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ApiKey} from '../../entities';

@Module({
    imports: [
        PassportModule,
        TypeOrmModule.forFeature([ApiKey])
    ],
    providers: [
        ApiKeyStrategy,
        ApiKeyService
    ]
})
export class ApiKeyModule {}
