import { useState, useEffect } from 'react'
import styles from './Board.module.css'
import Column from '../Column/Column'
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {fetchTodoTasks} from "../../store/reducers/TodoSlice.ts";
import CreateToDoTask from "../CreateToDoTask/CreateToDoTask.tsx";

function Board() {
    const [openModal, setOpenModal] = useState(false)
    const dispatch = useAppDispatch();
    const {tasks, loading, error} = useAppSelector(state => state.todoReducer);


  useEffect(() => {
      dispatch(fetchTodoTasks());
  }, [dispatch]);

    const handleTaskCreated = () =>{
        setOpenModal(false);
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
              <CreateToDoTask onTaskCreated={handleTaskCreated}/>
            <button
              onClick={() => setOpenModal(false)}
              className={styles.btnClose}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className={styles['column-wrapper']}>
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
        <Column
          title="ToDo"
          tasks={tasks.filter((t) => t.status === 0)}
        />
        <Column
          title="InProgress"
          tasks={tasks.filter((t) => t.status === 1)}
        />
        <Column
          title="Done"
          tasks={tasks.filter((t) => t.status === 2)}
        />
      </div>
    </div>
  )
}

export default Board
