import { CrudConfigService } from '@nestjsx/crud';

CrudConfigService.load({
    query: {
        limit: 25,
        maxLimit: 1000,
        alwaysPaginate: true
    },
    routes: {
        exclude: ['createManyBase', 'replaceOneBase']
    }
});
