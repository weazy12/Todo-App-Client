import type { TodoTask } from "../../types/TodoTask";
import DeleteTodoTaskBtn from "../DeleteBtn/DeleteTodoTaskBtn";
import styles from './Task.module.css'

interface TaskItemProps {
  task: TodoTask;
   onDelete: (id: number) => void;
} 

function TaskItem({ task, onDelete}: TaskItemProps){
    return(
         <div className={styles['item']}>
          <div className={styles['item-wrap']}>
              <div className={styles['item-texts']}>
                <h3 className={styles['item-title']}>{task.title}</h3>
                <h3 className={styles['due-date']}>due-date: {task.dueDate.split("T")[0]}</h3>
              </div>
              <div className={styles['item-buttons']}>
                <button>Edit</button>
                <DeleteTodoTaskBtn onClick={() => onDelete(task.id)}/>
              </div>
          </div>
    </div>
    )
}

export default TaskItem;