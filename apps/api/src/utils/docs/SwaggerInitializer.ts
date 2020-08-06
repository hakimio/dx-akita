import {DocumentationConfig} from './DocumentationConfig';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {INestApplication} from '@nestjs/common';

export class SwaggerInitializer {
    static initialize(config: DocumentationConfig, app: INestApplication) {
        const options = new DocumentBuilder()
            .setTitle(config.title)
            .setDescription(config.description)
            .setVersion(config.version)
            .build();

        const document = SwaggerModule.createDocument(app, options, {
            ignoreGlobalPrefix: true
        });
        SwaggerModule.setup(config.endpoint, app, document);
    }
}
