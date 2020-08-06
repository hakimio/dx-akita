import { Injectable } from '@nestjs/common';
import {Group, Project, Ticket, User, Comment, UserGroup, ProjectUser} from '../../entities';
import {getRepository, Not} from 'typeorm';
import {PredictableRandomizer} from '../../utils/predictable-randomizer';
import {StringUtils} from '../../utils/string-utils';
import {AuthUtils} from '../../utils/auth-utils';
import * as dayjs from 'dayjs';
import klona = require('klona');

@Injectable()
export class SeedService {

    private readonly TICKET_COUNT = 150;
    private readonly GROUP_NAMES = ['Admins', 'Development', 'QA', 'Support', 'Sales'];
    private readonly PROJECT_USERS: {[key: string]: Partial<User>[]} = {
        SDK: [{
            username: 'don',
            lastName: 'G.',
            password: 'admin'
        }, {
            username: 'alex',
            lastName: 'V.'
        }, {
            username: 'evan',
            lastName: 'T.'
        }, {
            username: 'mitchell',
            lastName: 'S.'
        }, {
            username: 'nigel',
            lastName: 'W.'
        }, {
            username: 'phil',
            lastName: 'G.'
        }, {
            username: 'ross',
            lastName: 'G.'
        }, {
            username: 'tommy',
            lastName: 'M.'
        }, {
            username: 'mark',
            lastName: 'B.'
        }, {
            username: 'joel',
            lastName: 'W.'
        }, {
            username: 'michael',
            lastName: 'S.'
        }, {
            username: 'seth',
            lastName: 'L.'
        }, {
            username: 'marcelo',
            lastName: 'B.'
        }],
        IT: [{
            username: 'kevin',
            lastName: 'C.'
        }, {
            username: 'mike',
            lastName: 'E.'
        }, {
            username: 'ryan',
            lastName: 'S.'
        }, {
            username: 'stefan',
            lastName: 'S.'
        }]
    };

    async populateDB() {
        await this.clearDB();

        await this.createProjects();
        await this.createGroups();
        const users = await this.createUsers();
        await this.assignGroupsToUsers(users.length);
        await this.setProjectLeads();
        const tickets = await this.createTickets(users.length);
        await this.createComments(users.length, tickets);
    }

    private async clearDB() {
        await this.removeProjects();
        await this.removeUsers();
        await this.removeGroups();
    }

    private async removeProjects() {
        const projectRepo = getRepository(Project);

        await projectRepo.delete({
            id: Not(0)
        });
    }

    private async removeUsers() {
        const userRepo = getRepository(User);

        await userRepo.delete({
            id: Not(0)
        });
    }

    private async removeGroups() {
        const groupRepo = getRepository(Group);

        await groupRepo.delete({
            id: Not(0)
        });
    }

    private async createProjects(): Promise<Partial<Project>[]> {
        const projectNames = Object.keys(this.PROJECT_USERS),
            projects: Partial<Project>[] = [];

        for (const name of projectNames) {
            projects.push({
                id: projects.length + 1,
                name
            });
        }

        const projectRepo = getRepository(Project);

        await projectRepo.insert(projects);

        return projects;
    }

    private async createGroups(): Promise<Partial<Group>[]> {
        const groups: Partial<Group>[] = [];

        for (const name of this.GROUP_NAMES) {
            groups.push({
                id: groups.length + 1,
                name
            });
        }

        const groupRepo = getRepository(Group);

        await groupRepo.insert(groups);

        return groups;
    }

    private async assignGroupsToUsers(userCount: number): Promise<Partial<UserGroup>[]> {
        const userGroups: Partial<UserGroup>[] = [],
            totalGroupCount = this.GROUP_NAMES.length;

        for (let i = userCount; i > 0; i--) {
            const userGroupCount = PredictableRandomizer.getRandom(1, 3),
                assignedGroups = [];

            for (let j = userGroupCount; j > 0; j--) {
                let groupId;

                do {
                    groupId = PredictableRandomizer.getRandom(1, totalGroupCount);
                } while (assignedGroups.includes(groupId));

                userGroups.push({
                    id: userGroups.length + 1,
                    groupId,
                    userId: i
                });
                assignedGroups.push(groupId);
            }
        }

        const userGroupRepo = getRepository(UserGroup);

        await userGroupRepo.insert(userGroups);

        return userGroups;
    }

    private async createUsers(): Promise<Partial<User>[]> {
        const projectNames = Object.keys(this.PROJECT_USERS),
            users: Partial<User>[] = [],
            projectUserRecords: Partial<ProjectUser>[] = [];

        for (const [projectIndex, projectName] of projectNames.entries()) {
            const projectUsers = this.PROJECT_USERS[projectName];

            for (const projectUser of projectUsers) {
                const password = projectUser.password || PredictableRandomizer.getWord(),
                    passwordHash = await AuthUtils.hashPassword(password),
                    nextId = users.length + 1;

                users.push({
                    id: nextId,
                    username: projectUser.username,
                    firstName: StringUtils.capitalize(projectUser.username),
                    lastName: projectUser.lastName,
                    password: passwordHash
                });
                projectUserRecords.push({
                    id: nextId,
                    projectId: projectIndex + 1,
                    userId: nextId
                });
            }
        }

        const userRepo = getRepository(User);

        await userRepo.insert(users);

        const projectUserRepo = getRepository(ProjectUser);

        await projectUserRepo.insert(projectUserRecords);

        return users;
    }

    private async setProjectLeads() {
        const projectRepo = getRepository(Project);

        await projectRepo.update(1, {
            leadId: 1
        });
        await projectRepo.update(2, {
            leadId: this.PROJECT_USERS['SDK'].length + 1
        });
    }

    private async createTickets(userCount: number): Promise<Partial<Ticket>[]> {
        const tickets: Partial<Ticket>[] = [],
            projects = Object.keys(this.PROJECT_USERS);

        for (let i = 1; i <= projects.length; i++) {

            let date = dayjs().subtract(6, 'month').toDate();

            for (let count = this.TICKET_COUNT; count > 0; count--) {
                const description = PredictableRandomizer.getEssay()
                    .map(paragraph => `<p>${paragraph}</p>`).join('');
                date = PredictableRandomizer.getNextDate(date, .06);
                // 30 min to 1 day
                const minutesUpdatedAt = PredictableRandomizer.getRandom(30, 1440),
                    updatedAt = dayjs(date).add(minutesUpdatedAt, 'minute').toDate();

                tickets.push({
                    id: tickets.length + 1,
                    title: PredictableRandomizer.getSentence(5, 10),
                    description,
                    projectId: i,
                    creatorId: PredictableRandomizer.getRandom(1, userCount),
                    assigneeId: PredictableRandomizer.getRandom(1, userCount),
                    modifiedById: PredictableRandomizer.getRandom(1, userCount),
                    ticketStatusId: PredictableRandomizer.getRandom(1, 3),
                    createdAt: date,
                    updatedAt
                });
            }
        }

        const ticketRepo = getRepository(Ticket);

        // deep clone ("klona()") is needed to make sure type-orm doesn't modify IDs and createdAt/updatedAt dates
        await ticketRepo.insert(klona(tickets));

        return tickets;
    }

    private async createComments(userCount: number, tickets: Partial<Ticket>[]): Promise<Partial<Comment>[]> {
        const comments: Partial<Comment>[] = [];

        for (const ticket of tickets) {
            const commentCount = PredictableRandomizer.getRandom(0, 3);
            let createdAt = ticket.createdAt;

            for (let j = commentCount; j > 0; j--) {
                createdAt = PredictableRandomizer.getNextDate(createdAt);
                // 5 min to 4 hours
                const minutesUpdatedAt = PredictableRandomizer.getRandom(5, 240),
                    updatedAt = dayjs(createdAt).add(minutesUpdatedAt, 'minute').toDate();

                comments.push({
                    id: comments.length + 1,
                    userId: PredictableRandomizer.getRandom(1, userCount),
                    ticketId: ticket.id,
                    content: PredictableRandomizer.getParagraph(),
                    createdAt,
                    updatedAt
                });
            }
        }

        const commentRepo = getRepository(Comment);

        await commentRepo.insert(comments);

        return comments;
    }

}
