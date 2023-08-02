"use client"
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTodo } from '@/api'
import { Button } from '@material-tailwind/react'

const AddTask = ({ updateTasks, setIsLoading }: any) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setModalOpen(false)
    try {
      const newTask = await addTodo({
        text: newTaskValue,
        is_done: false,
        is_deleted: false,
        created_at: new Date()
      });
      updateTasks(newTask); // Update tasks with the new task
    } catch (error) {
      console.log(error);
    } finally {
      setNewTaskValue("")
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => { setModalOpen(true) }} size='sm' className='flex items-center gap-3' variant="gradient">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Add Task</span>
      </Button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className='font-bold text-lg'>Add new task</h3>
          <div className='modal-action'>
            <input value={newTaskValue} onChange={(e) => setNewTaskValue(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
            <button className='btn' type='submit'>Submit</button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddTask