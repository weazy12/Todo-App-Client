import type { TodoTask } from "../../types/TodoTask"

export interface ColumnProps{
    title: string,
    tasks: TodoTask[];
    onDeleteTask: (id: number) => void;
    onEditTask: (task: TodoTask) => void;
}