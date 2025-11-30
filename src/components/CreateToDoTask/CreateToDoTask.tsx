
import styles from './CreteTodoTask.module.css'
import type {CreateTaskFormProps} from "./CreteToDoTask.props.ts";
import {useAppDispatch} from "../../hooks/redux.ts";
import {useState} from "react";
import type {CreateTodoTaskDto} from "../../types/TodoTask.ts";
import {createTodoTask} from "../../store/reducers/TodoSlice.ts";

function CreateTaskForm({onTaskCreated}: CreateTaskFormProps) {
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const [error, setError] = useState<string|null>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const newTodoTask: CreateTodoTaskDto = {title, description, dueDate};
        try{
            await dispatch(createTodoTask(newTodoTask)).unwrap();
            setTitle('');
            setDescription('');
            setDueDate('');
            onTaskCreated();
        } catch (error : unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error) || "Cannot create note.");
            }
        } finally {
            setLoading(false);
        }
    }


  return (
    <form className={styles['create-wrapper']} onSubmit={handleSubmit}>
      <h3 className={styles['create-title']}>Create new task</h3>
      <div className={styles['inputs-wrapper']}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Назва"
          required
        />

        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Опис (необов’язково)"
        />

        <input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          type="date"
          name="dueDate"
          required
        />
      </div>
        {error && <p>{error}</p>}
      <button type="submit" disabled={loading}>Create</button>
    </form>
  )
}

export default CreateTaskForm
