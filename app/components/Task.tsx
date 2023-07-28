"use client"

import { ITask } from "@/types/task"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import Modal from "./Modal"
import { useState, FormEventHandler } from 'react'
import { useRouter } from "next/navigation"
import { deleteTodo, editTodo } from "@/api"
import Loader from "./Loader"

interface TodoProps {
    task: ITask
    deleteTask: (id: number) => void
    updateTask: (updatedTask: ITask) => void
}

const Task = ({ task, deleteTask, updateTask }: TodoProps) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)

    const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        setIsLoadingEdit(true)
        const updatedTask = { id: task.id, text: taskToEdit, is_done: false }
        try {
            await editTodo(updatedTask)
            updateTask(updatedTask)
            setOpenModalEdit(false)
        } catch (error) {
            console.error("Error updating task:", error)
        } finally {
            setIsLoadingEdit(false)
        }
    }

    const handleToggleDone = async () => {
        setIsLoading(true) // Start loading when the checkmark is clicked
        const updatedTask = { ...task, is_done: !task.is_done } // Toggle the is_done property
        try {
            await editTodo(updatedTask)
            updateTask(updatedTask) // Update the task in the state
        } catch (error) {
            // Handle any error, e.g., show an error message
            console.error("Error updating task:", error)
        } finally {
            setIsLoading(false) // Stop loading after the request is completed (success or error)
        }
    }

    const handleDeleteTodo = async (id: number) => {
        setIsLoadingDelete(true)
        try {
            await deleteTodo(id)
            deleteTask(task.id!) // Remove the task from the state
            setOpenModalDelete(false)
        } catch(error) {
            console.log(error)
        } finally {
            setIsLoadingDelete(false)
        }
    }

    return (
        <>
            {isLoadingEdit || isLoadingDelete
                ? <tr><td className=""><Loader size={20} /></td></tr>
                : <tr key={task.id}>
                    <td className="w-full">{task.text}</td>
                    <td>
                        {/* Conditionally render the checkmark or the loader based on isLoading */}
                        {isLoading ? (
                            <><Loader size={20} /></>
                        ) : (
                            <>
                                {task.is_done ? (
                                    <AiOutlineCheckCircle
                                        onClick={handleToggleDone}
                                        cursor="pointer"
                                        size={25}
                                        className="text-green-600"
                                    />
                                ) : (
                                    <AiOutlineCloseCircle
                                        onClick={handleToggleDone}
                                        cursor="pointer"
                                        size={25}
                                        className="text-red-600"
                                    />
                                )}
                            </>
                        )}
                    </td>
                    <td className="flex gap-5">
                        <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" size={25} className='text-blue-500' />
                        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
                            <form onSubmit={handleEditTodo}>
                                <h3 className='font-bold text-lg'>Edit task</h3>
                                <div className='modal-action'>
                                    <input value={taskToEdit} onChange={(e) => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                    <button className='btn' type='submit'>Submit</button>
                                </div>
                            </form>
                        </Modal>
                        <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" size={25} className='text-red-600' />
                        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
                            <h3 className='font-bold text-lg'>Are you sure you want delete this task ?</h3>
                            <div className='modal-action'>
                                <button className='btn' onClick={() => handleDeleteTodo(task.id!)} >Yes</button>
                            </div>
                        </Modal>
                    </td>
                </tr>
            }
        </>
    )
}

export default Task