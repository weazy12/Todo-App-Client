import type {TodoTaskDto} from "../../types/TodoTask"

export interface ColumnProps{
    title: string,
    tasks: TodoTaskDto[];
}