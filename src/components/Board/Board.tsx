import { useState, useEffect } from 'react';
import styles from './Board.module.css';
import Column from '../Column/Column';
import type { TodoTask } from '../../types/TodoTask';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import CreateTaskForm from '../CreateToDoTask/CreateToDoTask';

function Board(){
        const [tasks, setTasks] = useState<TodoTask[]>([]);
        
        const getTasks = async () =>{
            try {
                const {data} = await axios.get<TodoTask[]>(`${PREFIX}/ToDoTask`);
                setTasks(data);
            } catch (e) {
                console.error(e);
                return;
            }
        }

    useEffect(() => {
        getTasks();
    }, []);

        const handleDeleteTask = async (id: number) => {
            try {
            await axios.delete(`${PREFIX}/ToDoTask/${id}`);
            setTasks(prev => prev.filter(t => t.id !== id)); // видаляємо локально
            } catch (err) {
            console.error(err);
            alert('Помилка при видаленні задачі');
            }
        };
    return(
        <div className={styles['board']}>
            <div>
                <CreateTaskForm onTaskCreated={getTasks}/>
            </div>
            <div className={styles['column-wrapper']}>
                <Column title="ToDo" tasks={tasks.filter(t => t.status === 0)} onDeleteTask={handleDeleteTask}/>
                <Column title="InProgress" tasks={tasks.filter(t => t.status === 1)} onDeleteTask={handleDeleteTask}/>
                <Column title='Done' tasks={tasks.filter(t => t.status === 2)} onDeleteTask={handleDeleteTask}/>
            </div>
        </div>
    );
}

export default Board;