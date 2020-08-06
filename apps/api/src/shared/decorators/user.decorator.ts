import {createParamDecorator, ExecutionContext} from '@nestjs/common';

export const User = createParamDecorator((property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest(),
        user = request.user;

    return property ? user && user[property] : user;
});
