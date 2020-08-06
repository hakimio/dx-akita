import {HttpExceptionFilter} from './http-exception.filter';
import {HttpException, HttpStatus} from '@nestjs/common';

describe('HttpExceptionFilter', () => {

    let argumentsHostMock,
        httpArgumentsHost,
        fastifyReply;
    const HTTP_STATUS_CODE = 404,
        HTTP_ERROR_MESSAGE = 'The specified key does not exist.',
        REGULAR_ERROR_MESSAGE = 'Uncaught TypeError: Cannot read property \'value\' of undefined',
        INTERNAL_SERVER_ERROR_MESSAGE = 'Internal Server Error';

    beforeEach(() => {
        fastifyReply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        httpArgumentsHost = {
            getResponse: () => fastifyReply
        };
        argumentsHostMock = {
            switchToHttp: () => httpArgumentsHost
        };
    });

    it('should catch http exception', () => {
        const httpExceptionFilter = new HttpExceptionFilter(),
            httpException = new HttpException(HTTP_ERROR_MESSAGE, HTTP_STATUS_CODE);

        httpExceptionFilter.catch(httpException, argumentsHostMock);

        expect(fastifyReply.status).toHaveBeenCalledWith(HTTP_STATUS_CODE);
        expect(fastifyReply.send).toHaveBeenCalledWith(expect.objectContaining({
            error: HTTP_ERROR_MESSAGE
        }));
    });

    it('should catch regular exception', () => {
        const httpExceptionFilter = new HttpExceptionFilter(),
            exception = new Error(REGULAR_ERROR_MESSAGE);

        httpExceptionFilter.catch(exception, argumentsHostMock);

        expect(fastifyReply.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(fastifyReply.send).toHaveBeenCalledWith(expect.objectContaining({
            error: INTERNAL_SERVER_ERROR_MESSAGE,
            message: REGULAR_ERROR_MESSAGE,
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR
        }));
    });

});
