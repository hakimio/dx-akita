import {Group} from './group.entity';
import {Comment} from './comment.entity';
import {Project} from './project.entity';
import {Ticket} from './ticket.entity';
import {TicketStatus} from './ticket-status.entity';
import {User} from './user.entity';
import {UserGroup} from './user-group.entity';
import {ProjectUser} from './project-user.entity';
import {RefreshToken} from './refresh-token.entity';
import {ApiKey} from './api-key.entity';

export const allEntities = [Comment, Group, Project, Ticket, TicketStatus, User, UserGroup, ProjectUser, RefreshToken,
    ApiKey];
