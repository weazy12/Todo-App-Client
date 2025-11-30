import type {TodoTaskDto} from "../../types/TodoTask";
import styles from './Task.module.css'
import {useAppDispatch} from "../../hooks/redux.ts";
import {deleteTodoTask} from "../../store/reducers/TodoSlice.ts";
import {useState} from "react";
import EditTodoTaskBtn from "../EditBtn/EditTodoTaskBtn.tsx";

interface TaskItemProps {
  task: TodoTaskDto;
} 

function TaskItem({task}: TaskItemProps){
    const dispatch = useAppDispatch();
    const [isEditing , setIsEditing] = useState(false);

    const handleDelete = () =>{
        dispatch(deleteTodoTask(task.id));
    }

    const handleUpdate =()=> {
        setIsEditing(false);
    }

    return(
         <div className={styles['item']}>
          <div className={styles['item-wrap']}>
              <div className={styles['item-texts']}>
                <h3 className={styles['item-title']}>{task.title}</h3>
                <h3 className={styles['due-date']}>due-date: {task.dueDate.split("T")[0]}</h3>
              </div>
              <div className={styles['item-buttons']}>
                  <button className={styles['item-button']} onClick={()=>setIsEditing(true)}>Edit</button>
                  { isEditing && (
                      <div className={styles.overlay}>
                            <div className={styles.modal}>
                                <EditTodoTaskBtn task={task} onTaskUpdated={handleUpdate}/>
                                <button onClick={() => setIsEditing(false)} className={styles['close']}>close</button>
                            </div>
                      </div>
                  )}
                  <button
                      className={styles['noteDeleteBtn']}
                      onClick={handleDelete}
                  >
                      Delete
                  </button>
              </div>
          </div>
    </div>
    )
}

export default TaskItem;