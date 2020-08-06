import {SwaggerModule, SwaggerDocumentOptions, OpenAPIObject} from '@nestjs/swagger';
import {SwaggerInitializer} from './SwaggerInitializer';
import {DocumentationConfig} from './DocumentationConfig';

describe('SwaggerInitializer', () => {

    let swaggerDocument,
        nestApp;

    beforeEach(() => {
        swaggerDocument = {};
        nestApp = {};
        SwaggerModule.createDocument = jest.fn().mockReturnValue(swaggerDocument);
        SwaggerModule.setup = jest.fn();
    });

    it('should correctly initialize swagger API documentation', () => {
        const documentConfig: DocumentationConfig = {
            title: 'foo',
            description: 'bar',
            version: '0.0.1',
            endpoint: 'qux'
        };

        SwaggerInitializer.initialize(documentConfig, nestApp);

        expect(SwaggerModule.createDocument).toHaveBeenCalledWith(nestApp,
            expect.objectContaining(<Omit<OpenAPIObject, 'paths'>>{
                info: {
                    contact: {},
                    description: documentConfig.description,
                    title: documentConfig.title,
                    version: documentConfig.version
                }
            }),
            expect.objectContaining(<SwaggerDocumentOptions>{
                ignoreGlobalPrefix: true
            })
        );
        expect(SwaggerModule.setup).toHaveBeenCalledWith(documentConfig.endpoint, nestApp, swaggerDocument);
    });

});
