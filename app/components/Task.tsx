"use client"

import { ITask } from "@/types/task"
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import Modal from "./Modal"
import { useState, FormEventHandler } from 'react'
import { useRouter } from "next/navigation"
import { deleteTodo, editTodo } from "@/api"

interface TodoProps {
    task: ITask
}

const Task = ({ task }: TodoProps) => {
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
    const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const router = useRouter()

    const handleEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await editTodo({
            id: task.id,
            text: taskToEdit
        })
        setOpenModalEdit(false)
        router.refresh()
    }

    const handleDeleteTodo = async (id: number) => {
        await deleteTodo(id)
        setOpenModalDelete(false)
        router.refresh()
    }

    return (
        <tr key={task.id}>
            <td className="w-full">{task.text}</td>
            <td className="flex gap-5">
                <FiEdit onClick={() => setOpenModalEdit(true)} cursor="pointer" size={25} className='text-success' />
                <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit} >
                    <form onSubmit={handleEditTodo}>
                        <h3 className='font-bold text-lg'>Edit task</h3>
                        <div className='modal-action'>
                            <input value={taskToEdit} onChange={(e) => setTaskToEdit(e.target.value)} type="text" placeholder="Type here" className="input input-bordered w-full" />
                            <button className='btn' type='submit'>Submit</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 onClick={() => setOpenModalDelete(true)} cursor="pointer" size={25} className='text-error' />
                <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete} >
                    <h3 className='font-bold text-lg'>Are you sure you want delete this task ?</h3>
                    <div className='modal-action'>
                        <button className='btn' onClick={() => handleDeleteTodo(task.id!)} >Yes</button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task