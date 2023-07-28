"use client"
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTodo } from '@/api'

const AddTask = ({ updateTasks }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const newTask = await addTodo({
      text: newTaskValue,
      is_done: false,
    });
    setNewTaskValue("")
    setModalOpen(false)
    updateTasks(newTask); // Update tasks with the new task
  }

  return (
    <div>
      <button onClick={() => { setModalOpen(true) }} className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Add new task</button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-action'>
            <input value={newTaskValue} onChange={(e) => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            <button className='btn' type='submit'>Submit</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask