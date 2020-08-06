import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {HeaderAPIKeyStrategy} from 'passport-headerapikey';
import {ApiKeyService} from './api-key.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
    constructor(private apiKeyService: ApiKeyService) {
        super(
            {
                header: 'X-Api-Key', prefix: ''
            },
            false,
            (apikey: string, verified) => this.validate(apikey, verified)
        );
    }

    async validate(apikey: string, verified: (error: Error, data) => void) {
        const isValid = await this.apiKeyService.isValidKey(apikey);

        verified(null, isValid);
    }
}
