"use client"
import Modal from './Modal'
import { FormEventHandler, useState } from 'react'
import { addTodo } from '@/api'
import {MdAdd} from 'react-icons/md'

const AddTask = ({ updateTasks, isLoading, setIsLoading }: any) => {
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
      <button onClick={() => { setModalOpen(true) }} className="btn text-white bg-blue-600 hover:bg-blue-700 text-xl"><MdAdd /></button>
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