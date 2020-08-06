import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {ApiKey} from '../../entities';
import {Repository} from 'typeorm';

@Injectable()
export class ApiKeyService {
    constructor(
        @InjectRepository(ApiKey)
        private readonly apiKeyRepository: Repository<ApiKey>
    ) {}

    async isValidKey(apiKey: string): Promise<boolean> {
        const apiKeyRecord = await this.apiKeyRepository.findOne({
            key: apiKey
        });

        return !!apiKeyRecord;
    }

}
