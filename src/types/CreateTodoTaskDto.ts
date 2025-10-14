export interface CreateTodoTaskDto {
  title: string;
  description?: string;
  dueDate: string; // у форматі ISO, наприклад '2025-10-20'
}