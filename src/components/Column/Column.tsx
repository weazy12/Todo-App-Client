import TaskItem from '../TaskItem/TaskItem'
import styles from './Column.module.css'
import type { ColumnProps } from './Column.props'

export default function Column({title, tasks, onDeleteTask}: ColumnProps){

    const titleClass =
    title === 'ToDo'
      ? styles.todoTitle
      : title === 'InProgress'  
      ? styles.inProgressTitle
      : styles.doneTitle;

    return(
        <div className={styles['column-wrapper']}>
            <h1 className={`${styles.title} ${titleClass}`}>{title}</h1>
            <div className={styles['column-items-wrapper']}>
                {
                    tasks.map(task => (
                        <TaskItem key={task.id} task={task} onDelete={onDeleteTask}/>
                    ))
                }
            </div>
        </div>
    )
}