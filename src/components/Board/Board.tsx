import { useState, useEffect } from 'react';
import styles from './Board.module.css';
import Column from '../Column/Column';
import type { TodoTask } from '../../types/TodoTask';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';

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
    return(
        <div className={styles['board']}>
            <div className={styles['column-wrapper']}>
                <Column title="ToDo" tasks={tasks.filter(t => t.status === 0)}/>
                <Column title="InProgress" tasks={tasks.filter(t => t.status === 1)}/>
                <Column title='Done' tasks={tasks.filter(t => t.status === 2)} />
            </div>
        </div>
    );
}

export default Board;