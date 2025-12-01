import { Droppable } from '@hello-pangea/dnd'
import TaskItem from '../TaskItem/TaskItem'
import styles from './Column.module.css'
import type { ColumnProps } from './Column.props'

export default function Column({
  droppableId,
  title,
  tasks,
}: ColumnProps) {
  const titleClass =
    title === 'ToDo'
      ? styles.todoTitle
      : title === 'InProgress'
      ? styles.inProgressTitle
      : styles.doneTitle

  return (
    <div className={styles['column-wrapper']}>
      <h1 className={`${styles.title} ${titleClass}`}>{title}</h1>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className={styles['column-items-wrapper']}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                task={task}
                index={index}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
