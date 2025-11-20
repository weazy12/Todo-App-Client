import { useState, useEffect } from 'react'
import styles from './Board.module.css'
import Column from '../Column/Column'
import type { TodoTask } from '../../types/TodoTask'
import { PREFIX } from '../../helpers/API'
import axios from 'axios'
import CreateTaskForm from '../CreateToDoTask/CreateToDoTask'
import EditTaskForm from '../EditBtn/EditTodoTaskBtn';

function Board() {
  const [tasks, setTasks] = useState<TodoTask[]>([])
  const [openModal, setOpenModal] = useState(false)

  const [openEditModal, setOpenEditModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TodoTask | null>(null);

  const handleEditTask = (task: TodoTask) => {
  setTaskToEdit(task);       // зберігаємо дані
  setOpenEditModal(true);    // відкриваємо модалку
};

  const getTasks = async () => {
    try {
      const { data } = await axios.get<TodoTask[]>(`${PREFIX}/ToDoTask`)
      setTasks(data)
    } catch (e) {
      console.error(e)
      return
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  const handleDeleteTask = async (id: number) => {
    try {
      await axios.delete(`${PREFIX}/ToDoTask/${id}`)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      console.error(err)
      alert('Помилка при видаленні задачі')
    }
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
            <h2>Create Task</h2>
            <CreateTaskForm
              onTaskCreated={() => {
                getTasks()
                setOpenModal(false)
              }}
            />

            <button
              onClick={() => setOpenModal(false)}
              className={styles.btnClose}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {openEditModal && taskToEdit && (
  <div className={styles.overlay}>
    <div className={styles.modal}>
      <h2>Edit Task</h2>

      <EditTaskForm
        task={taskToEdit}
        onTaskEdited={() => {
          getTasks()
          setOpenEditModal(false)
        }}
      />

      <button
        onClick={() => setOpenEditModal(false)}
        className={styles.btnClose}
      >
        Close
      </button>
    </div>
  </div>
)}

      <div className={styles['column-wrapper']}>
        <Column
          title="ToDo"
          tasks={tasks.filter((t) => t.status === 0)}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
        <Column
          title="InProgress"
          tasks={tasks.filter((t) => t.status === 1)}
          onDeleteTask={handleDeleteTask}
           onEditTask={handleEditTask}
        />
        <Column
          title="Done"
          tasks={tasks.filter((t) => t.status === 2)}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </div>
    </div>
  )
}

export default Board
