import {startServer} from './server';
import {SwaggerInitializer} from './utils/docs';
import Mock = jest.Mock;
import {bootstrap} from './app';

jest.mock('./app', () => ({
    bootstrap: jest.fn()
}));

describe('Server', () => {
    let nestServerMock;

    beforeEach(() => {
        nestServerMock = {
            nestApp: {
                listen: jest.fn()
            },
            fastifyServer: {}
        };

        SwaggerInitializer.initialize = jest.fn();
        (<Mock> bootstrap).mockReturnValue(Promise.resolve(nestServerMock));
        process.env.API_PREFIX = 'api';
    });

    it('should initialize the server', async () => {
        await startServer();

        verifyStartLocalServerFunction(3333);
    });

    it('should use port number from environmental variable', async () => {
        process.env.LISTEN_PORT = '5000';

        await startServer();

        verifyStartLocalServerFunction(5000);
    });

    const verifyStartLocalServerFunction = (port: number) => {
        expect(bootstrap).toHaveBeenCalled();
        expect(SwaggerInitializer.initialize).toHaveBeenCalledWith(expect.objectContaining({
            title: expect.any(String),
            description: expect.any(String),
            version: expect.any(String),
            endpoint: expect.any(String)
        }), nestServerMock.nestApp);

        expect(nestServerMock.nestApp.listen).toHaveBeenCalledWith(port);
    };

});
