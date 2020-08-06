import {Module} from '@nestjs/common';
import {SeedModule} from './seed/seed.module';
import {TicketsModule} from './tickets/tickets.module';
import {UsersModule} from './users/users.module';
import {ProjectsModule} from './projects/projects.module';
import {AuthenticationModule} from './authentication/authentication.module';
import {CommentsModule} from './comments/comments.module';
import {TicketStatusModule} from './ticket-status/ticket-status.module';

const modules = [
    SeedModule,
    TicketsModule,
    UsersModule,
    ProjectsModule,
    AuthenticationModule,
    CommentsModule,
    TicketStatusModule
];

@Module({
    imports: modules,
    exports: modules
})
export class ModulesModule {}
