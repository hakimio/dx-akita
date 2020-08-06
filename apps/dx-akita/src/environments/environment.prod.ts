import {Environment} from './environment.interface';
import {environmentShared} from './environment.shared';

export const environment: Environment = {
    ...environmentShared,
    production: true
};
