import './crud-global-options';

import {NestFactory} from '@nestjs/core';
import {ValidationPipe} from '@nestjs/common';
import {AppModule} from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fastify from 'fastify';
import {HttpExceptionFilter} from './utils/http-exception.filter';
import * as qs from 'qs';
import * as fastifyUrlData from 'fastify-url-data';
import {environment} from './environments/environment';

export interface NestServer {
    nestApp: NestFastifyApplication;
    fastifyServer: fastify.FastifyInstance;
}

export async function bootstrap(): Promise<NestServer> {
    const fastifyServer: fastify.FastifyInstance = fastify({
            querystringParser: str => <{ [key: string]: string }>qs.parse(str)
        });
    fastifyServer.register(fastifyUrlData);

    const nestApp = await NestFactory.create<NestFastifyApplication>(
            AppModule,
            new FastifyAdapter(fastifyServer)
        );

    nestApp.useGlobalPipes(new ValidationPipe());
    nestApp.useGlobalFilters(new HttpExceptionFilter());
    nestApp.setGlobalPrefix(environment.apiPrefix);
    nestApp.enableCors();

    return {
        nestApp,
        fastifyServer
    };
}
