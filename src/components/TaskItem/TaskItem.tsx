import type {TodoTaskDto} from "../../types/TodoTask";
import styles from './Task.module.css'
import {useAppDispatch} from "../../hooks/redux.ts";
import {deleteTodoTask} from "../../store/reducers/TodoSlice.ts";
import {useState} from "react";
import EditTodoTaskBtn from "../EditBtn/EditTodoTaskBtn.tsx";
import { Draggable } from "@hello-pangea/dnd";

interface TaskItemProps {
  task: TodoTaskDto;
  index: number;
} 

function TaskItem({task, index}: TaskItemProps){
    const dispatch = useAppDispatch();
    const [isEditing , setIsEditing] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleDelete = () =>{
        dispatch(deleteTodoTask(task.id));
    }

    const handleUpdate =()=> {
        setIsEditing(false);
    }

    const getStatusText = (status: number) =>{
        switch(status){
            case 0:
                return "ToDo";
            case 1:
                return "InProgress";
            case 2:
                return "Done";
            default:
                return "Unknown status";
        }
    }


    return(
        <Draggable draggableId={task.id.toString()} index={index}>
        {(provided) => (
          <div
            className={styles['item']}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className={styles['item-wrap']}>
              <div className={styles['item-texts']}>
                <h3  className={`${styles['item-title']} ${task.status === 2 ? styles['done'] : ''}`}>{task.title}</h3>
                <h3 className={`${styles['due-date']} ${task.status === 2 ? styles['done'] : ''}`}>due-date: {task.dueDate.split("T")[0]}</h3>
              </div>
              <div className={styles['item-buttons']}>
                <button className={styles['item-button-edit']} onClick={()=>setIsEditing(true)}>Edit</button>

                {isEditing && (
                  <div className={styles.overlay}>
                    <div className={styles.modal}>
                      <EditTodoTaskBtn task={task} onTaskUpdated={handleUpdate}/>
                      <button onClick={() => setIsEditing(false)} className={styles['close']}>close</button>
                    </div>
                  </div>
                )}
                <button className={styles['item-button-details']} onClick={()=>setIsDetailsOpen(true)}>i</button>
                {
                    isDetailsOpen &&(
                        <div className={styles.overlay}>
                            <div className={styles.modal}>
                                <div className={styles['details-form']}>
                                    <p className={styles['details-item']}>Id: {task.id}</p>
                                    <p className={styles['details-item']}>Title: {task.title}</p>
                                    <p className={styles['details-item']}>Description: {task.description}</p>
                                    <p className={styles['details-item']}>Due Date: {task.dueDate.split("T")[0]}</p>
                                    <p className={styles['details-item']}>Status: {getStatusText(task.status)}</p>
                                    <p className={styles['details-item']}>createdAt: {task.createdAt.split("T")[0]}</p>
                                    <p className={styles['details-item']}>completedAt: {task.completedAt}</p>
                                </div>
                                <button onClick={() => setIsDetailsOpen(false)} className={styles['close']}>close</button>
                            </div>
                        </div>
                    )
                }

                <button
                  className={styles['noteDeleteBtn']}
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        )}
      </Draggable>
    )
}

export default TaskItem;