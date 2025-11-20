import type UpdateTodoTaskDto from "../../types/UpdateTodoTaskDto";

export interface EditTodoTaskBtnProps {
    task: UpdateTodoTaskDto;
    onTaskEdited: () => void;
}