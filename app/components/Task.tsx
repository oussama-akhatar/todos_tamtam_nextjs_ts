"use client"

import { ITask } from "@/types/task"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineUndo } from 'react-icons/ai'
import { BiUndo } from 'react-icons/bi'
import Modal from "./Modal"
import { useState, FormEventHandler } from 'react'
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
        const updatedTask = { ...task, text: taskToEdit }
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

    const handleDeleteTodo = async () => {
        setIsLoadingDelete(true)
        try {
            await deleteTodo({ ...task, is_deleted: true })
            // deleteTask(task.id!) // Remove the task from the state
            task.is_deleted = true
            setOpenModalDelete(false)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingDelete(false)
        }
    }

    const handleUndoDeleteTodo = async () => {
        setIsLoadingDelete(true)
        try {
            await deleteTodo({ ...task, is_deleted: false })
            updateTask(task) // Remove the task from the state
            task.is_deleted = false
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingDelete(false)
        }
    }

    const handleFormatDate = (dateString: string | undefined): any => {
        const date = new Date(dateString!);
        const today = new Date();

        if (date.toDateString() === today.toDateString()) {
            return "Today at " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
        } else {
            return ("0" + date.getDate()).slice(-2) + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + date.getFullYear() + " at " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
        }
    }

    return (
        <>
            {isLoadingEdit || isLoadingDelete
                ? <tr><td className=""><Loader size={20} className="my-4" /></td></tr>
                : <tr key={task.id} className={task.is_deleted ? "bg-blue-gray-50" : ""}>
                    <td className="w-full">
                        <div className="flex items-center">
                            <span className="text-2xl">{task.text}</span>
                            {task.is_deleted ? <span className="ms-1 bg-red-600 text-white text-xs rounded-full py-1 px-2">Deleted</span> : null}
                        </div>
                        {/* <br /> */}
                        <span className="text-xs">{handleFormatDate(task.created_at?.toString())}</span>
                    </td>
                    <td>
                        {/* Conditionally render the checkmark or the loader based on isLoading */}
                        {isLoading ? (
                            <><Loader size={20} /></>
                        ) : (
                            <>
                                {task.is_done ? (
                                    <svg onClick={handleToggleDone} cursor="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-green-600 w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>

                                ) : (
                                    <svg onClick={handleToggleDone} cursor="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-red-600 w-8 h-8">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </>
                        )}
                    </td>
                    <td className={`flex gap-5 items-center p-8 ${task.is_deleted ? "justify-end" : "justify-center"}`}>
                        {
                            !task.is_deleted
                                // ? <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" className='text-blue-500 lg:text-2xl' />
                                ? (
                                    <svg onClick={() => setOpenModalEdit(true)} cursor="pointer"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-blue-500 w-7 h-7">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                )
                                : null
                        }


                        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
                            <form onSubmit={handleEditTodo}>
                                <h3 className='font-bold text-lg'>Edit task</h3>
                                <div className='modal-action'>
                                    <input value={taskToEdit} onChange={(e) => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                                    <button className='btn' type='submit'>Edit</button>
                                </div>
                            </form>
                        </Modal>
                        {
                            !task.is_deleted
                                ? /*<FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" className='text-red-600 lg:text-2xl' />*/
                                (
                                    <svg onClick={() => setOpenModalDelete(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" cursor="pointer" className="w-7 h-7 text-red-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>

                                )
                                // : <BiUndo onClick={() => handleUndoDeleteTodo()} cursor="pointer" className='text-green-600 lg:text-2xl self-end' />
                                : (
                                    <svg onClick={() => handleUndoDeleteTodo()} cursor="pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-green-600 w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                                    </svg>
                                )
                        }

                        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
                            <h3 className='font-bold text-lg'>Are you sure you want delete this task ?</h3>
                            <div className='modal-action'>
                                <button className='btn' onClick={() => handleDeleteTodo()} >Yes</button>
                            </div>
                        </Modal>
                    </td>
                </tr>
            }
        </>
    )
}

export default Task