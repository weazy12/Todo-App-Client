import type { EditTodoTaskBtnProps } from './EditTodoTaskBtn.props'
import { useState } from 'react'
import { PREFIX } from '../../helpers/API'
import type UpdateTodoTaskDto from '../../types/UpdateTodoTaskDto'
import axios from 'axios'

export default function EditTodoTaskBtn({
  task,
  onTaskEdited,
}: EditTodoTaskBtnProps) {
  const [form, setForm] = useState<UpdateTodoTaskDto>({
    id: task.id,
    title: task.title,
    description: task.description,
    dueDate: task.dueDate.split("T")[0],
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
      await axios.put(`${PREFIX}/ToDoTask`, form)
      onTaskEdited()
      setForm({ id: task.id, title: '', description: '', dueDate: '' })
    } catch (err) {
      console.error(err)
      alert('Помилка при редагуванні задачі')
    }
  }
  return (
    <form  onSubmit={handleSubmit}>
      <h3 >Edit task</h3>
      <div>
        <input
         type='text'
         name='id'
         value={form.id}
         readOnly
        />
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
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
      <button type="submit">Save</button>
    </form>
  )
}
