export interface Ticket {
    id?: number;
    projectId: number;
    creatorId?: number;
    assigneeId?: number;
    modifiedById?: number;
    ticketStatusId: number;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export enum TicketStatusFilter {
    All = -1,
    Pending = 1,
    Open = 2,
    Closed = 3
}
