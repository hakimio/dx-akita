import {ExceptionFilter, Catch, ArgumentsHost} from '@nestjs/common';
import {HttpException, InternalServerErrorException} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    catch(exception: HttpException | Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const {status, json} = this.prepareException(exception);

        response.status(status).send(json);
    }

    private prepareException(exc: any): { status: number; json: object } {
        const error = exc instanceof HttpException ? exc : new InternalServerErrorException(exc.message),
            status = error.getStatus(),
            response = error.getResponse(),
            json = typeof response === 'string' ? {error: response} : response;

        return {status, json};
    }
}
