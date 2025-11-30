export type Status = 0 | 1 | 2;

export interface TodoTaskDto{
    id: number;
    title: string;
    description?: string;
    status: Status;
    dueDate: string;
    createdAt: string;
    completedAt: string;
}

export interface CreateTodoTaskDto {
    title: string;
    description?: string;
    dueDate: string;
}

export interface UpdateTodoTaskDto {
    id: number;
    title: string;
    description?: string;
    dueDate: string;
}

