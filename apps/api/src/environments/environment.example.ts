import {Environment} from './environment.interface';

export const environment: Environment = {
    production: false,
    typeOrm: {
        database: 'ticket_app',
        username: 'foo',
        password: 'bar',
        host: '127.0.0.1',
        port: 3306
    },
    swagger: {
        title: 'Ticket App API',
        description: 'Ticket App API documentation',
        version: '0.0.1',
        endpoint: 'docs'
    },
    apiPrefix: 'api',
    JWT: {
        secret: 'baz',
        signOptions: {
            expiresIn: '1h'
        }
    }
};
