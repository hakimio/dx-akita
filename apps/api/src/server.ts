import {bootstrap} from './app';
import {SwaggerInitializer} from './utils/docs';
import {environment} from './environments/environment';

export async function startServer() {
    const port = process.env.LISTEN_PORT || 3333,
        nestServer = await bootstrap();

    if (!environment.production) {
        SwaggerInitializer.initialize(environment.swagger, nestServer.nestApp);
    }

    await nestServer.nestApp.listen(+port);
}
