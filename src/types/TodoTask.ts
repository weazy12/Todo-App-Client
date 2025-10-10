export type Status = 0 | 1 | 2;

export interface TodoTask{
    id: number;
    title: string;
    description?: string;
    status: Status;
    dueDate: string;
    createdAt: string;
    completedAt: string;
}