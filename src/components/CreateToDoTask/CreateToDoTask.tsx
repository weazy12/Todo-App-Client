import { useState } from 'react'
import axios from 'axios'
import { PREFIX } from '../../helpers/API'
import type { CreateTodoTaskDto } from '../../types/CreateTodoTaskDto'
import type { CreateTaskFormProps } from './CreteToDoTask.props'
import styles from './CreteTodoTask.module.css'

function CreateTaskForm({ onTaskCreated }: CreateTaskFormProps) {
  const [form, setForm] = useState<CreateTodoTaskDto>({
    title: '',
    description: '',
    dueDate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.post(`${PREFIX}/ToDoTask`, form)
      setForm({ title: '', description: '', dueDate: '' })
      onTaskCreated()
    } catch (err) {
      console.error(err)
      alert('Помилка при створенні задачі')
    }
  }

  return (
    <form className={styles['create-wrapper']} onSubmit={handleSubmit}>
      <h3 className={styles['create-title']}>Create new task</h3>
      <div className={styles['inputs-wrapper']}>
        <input
          type="text"
          name="title"
          placeholder="Назва"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Опис (необов’язково)"
          value={form.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Create</button>
    </form>
  )
}

export default CreateTaskForm
