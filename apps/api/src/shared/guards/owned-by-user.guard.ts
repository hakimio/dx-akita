import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {FastifyRequest} from 'fastify';
import {getRepository, ObjectType} from 'typeorm';

@Injectable()
export class OwnedByUserGuard<T> implements CanActivate {

    constructor(
        private readonly entityClass: ObjectType<T>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<FastifyRequest>(),
            user = (<any>request).user,
            id = request.params.id,
            repository = getRepository(this.entityClass),
            entity = await repository.findOne(id);

        return entity && entity['userId'] === +user.id;
    }

}
