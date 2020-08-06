import {bootstrap} from './app';
import {NestFactory} from '@nestjs/core';
import * as fastify from 'fastify';
import Mock = jest.Mock;
import * as fastifyUrlData from 'fastify-url-data';
import {AppModule} from './app.module';
import {FastifyAdapter} from '@nestjs/platform-fastify';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from './utils/http-exception.filter';
import * as qs from 'qs';

const pathsToMock = ['@nestjs/core', '@nestjs/common', './app.module', './utils/http-exception.filter', 'qs',
    'fastify-url-data', '@nestjs/platform-fastify'];

for (const path of pathsToMock) {
    jest.mock(path);
}
jest.mock('fastify', () => jest.fn());

const API_PREFIX = 'api';

describe('App', () => {

    let nestAppMock, fastifyMock;

    beforeEach(() => {
        nestAppMock = {
            useGlobalPipes: jest.fn(),
            useGlobalFilters: jest.fn(),
            setGlobalPrefix: jest.fn(),
            enableCors: jest.fn()
        };
        fastifyMock = {
            register: jest.fn()
        };
        NestFactory.create = jest.fn().mockReturnValue(Promise.resolve(nestAppMock));
        (<Mock> fastify).mockReturnValue(fastifyMock);

        process.env.API_PREFIX = API_PREFIX;
        process.env.IS_LOCAL = '';
        process.env.IS_OFFLINE = '';
        process.env.AWS_EXECUTION_ENV = '';
    });

    it('should initialize the app', async () => {
        const nestServer = await bootstrap();

        expect((<Mock>fastify).mock.calls[0][0].querystringParser).toBeInstanceOf(Function);
        expect(fastifyMock.register).toHaveBeenCalledWith(fastifyUrlData);

        expect(NestFactory.create).toHaveBeenCalled();
        expect((<Mock>NestFactory.create).mock.calls[0][0]).toBe(AppModule);
        expect((<Mock>NestFactory.create).mock.calls[0][1]).toBeInstanceOf(FastifyAdapter);

        expect(nestAppMock.useGlobalPipes).toHaveBeenCalled();
        expect((<Mock>nestAppMock.useGlobalPipes).mock.calls[0][0]).toBeInstanceOf(ValidationPipe);
        expect(nestAppMock.useGlobalFilters).toHaveBeenCalled();
        expect((<Mock>nestAppMock.useGlobalFilters).mock.calls[0][0]).toBeInstanceOf(HttpExceptionFilter);
        expect(nestAppMock.setGlobalPrefix).toHaveBeenCalled();
        expect((<Mock>nestAppMock.setGlobalPrefix).mock.calls[0][0]).toBe(API_PREFIX);
        expect(nestAppMock.enableCors).toHaveBeenCalled();

        expect(nestServer).toBeTruthy();
        expect(nestServer.nestApp).toBe(nestAppMock);
        expect(nestServer.fastifyServer).toBe(fastifyMock);
    });

    it('should set query string parser correctly', async () => {
        qs.parse = jest.fn();

        await bootstrap();

        const querystringParser = (<Mock>fastify).mock.calls[0][0].querystringParser,
            testQuery = encodeURIComponent('or[]=lastName||cont||test&or[]=email||cont||test');

        querystringParser(testQuery);

        expect(qs.parse).toHaveBeenCalledWith(testQuery);
    });

});
