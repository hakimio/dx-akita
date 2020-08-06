import {Environment} from './environment.interface';

export const environment: Environment = {
    production: true,
    typeOrm: {
        database: 'ticket_app',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: 3306
    },
    apiPrefix: 'api',
    JWT: {
        secret: process.env.JWT_SECRET,
        signOptions: {
            expiresIn: '1h'
        }
    }
};
