import type { TodoTask } from "../../types/TodoTask";
import styles from './Task.module.css'

interface TaskItemProps {
  task: TodoTask;
}

function TaskItem({ task }: TaskItemProps){
    return(
         <div className={styles['item']}>
          <div className={styles['item-wrap']}>
              <div className={styles['item-texts']}>
                <h3 className={styles['item-title']}>{task.title}</h3>
                <h3 className={styles['due-date']}>due-date:{task.dueDate}</h3>
              </div>
              <div className={styles['item-buttons']}>
                <button>Edit</button>
                <button>Delete</button>
              </div>
          </div>
    </div>
    )
}

export default TaskItem;