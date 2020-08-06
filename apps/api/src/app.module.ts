import {Module} from '@nestjs/common';
import {ModulesModule} from './modules/modules.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {environment} from './environments/environment';
import {allEntities} from './entities/all-entities';

@Module({
    imports: [
        ModulesModule,
        TypeOrmModule.forRoot({
            type: 'mysql',
            retryAttempts: 1,
            entities:  allEntities,
            timezone: 'Z',
            ...environment.typeOrm
        })
    ]
})
export class AppModule {}
