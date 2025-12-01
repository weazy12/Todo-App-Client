import type {TodoTaskDto} from "../../types/TodoTask"

export interface ColumnProps{
    droppableId: string,
    title: string,
    tasks: TodoTaskDto[];
}