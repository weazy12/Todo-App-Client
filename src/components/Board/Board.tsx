import { useState, useEffect } from 'react'
import styles from './Board.module.css'
import Column from '../Column/Column'
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts'
import {
  fetchTodoTasks,
  updateStatusTodoTask,
} from '../../store/reducers/TodoSlice.ts'
import CreateToDoTask from '../CreateToDoTask/CreateToDoTask.tsx'
import type { Status } from '../../types/TodoTask.ts'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

function Board() {
  const [openModal, setOpenModal] = useState(false)
  const dispatch = useAppDispatch()
  const { tasks, loading, error } = useAppSelector((state) => state.todoReducer)

  useEffect(() => {
    dispatch(fetchTodoTasks())
  }, [dispatch])

  const handleTaskCreated = () => {
    setOpenModal(false)
  }
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const newStatus = Number(destination.droppableId) as Status

    dispatch(
      updateStatusTodoTask({
        id: Number(draggableId),
        status: newStatus,
      })
    )
  }

  return (
    <div className={styles['board']}>
      <button
        className={styles['create-btn']}
        onClick={() => setOpenModal(true)}
      >
        + Create task
      </button>
      {openModal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <CreateToDoTask onTaskCreated={handleTaskCreated} />
            <button
              onClick={() => setOpenModal(false)}
              className={styles.btnClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <DragDropContext onDragEnd={handleDragEnd}>
      <div className={styles['column-wrapper']}>
        <div className={styles.statusBar}>
          {loading && <p className={styles.loading}>Loading...</p>}
          {error && <p className={styles.error}>{error}</p>}
        </div>
        <Column droppableId="0" title="ToDo" tasks={tasks.filter((t) => t.status === 0)} />
        <Column
          droppableId="1"
          title="InProgress"
          tasks={tasks.filter((t) => t.status === 1)}
        />
        <Column droppableId="2" title="Done" tasks={tasks.filter((t) => t.status === 2)} />
      </div>
      </DragDropContext>
    </div>
  )
}

export default Board
