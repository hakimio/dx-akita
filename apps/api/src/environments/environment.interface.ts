import {MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions';
import {DocumentationConfig} from '../utils/docs';
import { JwtModuleOptions } from '@nestjs/jwt';

export interface Environment {
    production: boolean;
    typeOrm: Partial<MysqlConnectionOptions>;
    swagger?: DocumentationConfig;
    apiPrefix: string;
    JWT: JwtModuleOptions;
}
