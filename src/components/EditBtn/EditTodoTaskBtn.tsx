import type {TodoTaskDto} from "../../types/TodoTask.ts";
import {type FormEvent, useState} from "react";
import {useAppDispatch} from "../../hooks/redux.ts";
import {updateTodoTask} from "../../store/reducers/TodoSlice.ts";
import styles from "./EditTodoTaskBtn.module.css"

interface EditTodoTaskBtn {
    task: TodoTaskDto,
    onTaskUpdated: () => void,
}

export default function EditTodoTaskBtn({task, onTaskUpdated}: EditTodoTaskBtn) {
    const [title,setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);

    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);

    const  dispatch = useAppDispatch();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            await dispatch(updateTodoTask({...task, title, description, dueDate})).unwrap();
            onTaskUpdated();
        } catch(error: unknown){
            if (error instanceof Error) setError(error.message);
            else setError(String(error) || "Cannot update task.");
        } finally {
            setLoading(false);
        }
    }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.header}>Edit task</h3>
      <div className={styles.inputsDiv}>
        <input
         type='text'
         name='id'
         readOnly
         value={task.id}
        />
        <input
          type="text"
          name="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          name="dueDate"
          required
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
        {error && <p style={{color: "red"}}>{error}</p>}
      <button className={styles.updateBtn} type="submit" disabled={loading}>Update</button>
    </form>
  )
}
