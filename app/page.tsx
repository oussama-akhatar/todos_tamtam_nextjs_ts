"use client"

import { useState, useEffect, FormEventHandler } from 'react'
import { deleteTodo, getAllTasks } from "@/api"
import AddTask from "./components/AddTask"
import TodoList from "./components/TodoList"
import SideBar from "./components/SideBar"
import Loader from './components/Loader'
import Modal from './components/Modal'
import { ToastContainer, toast } from "react-toastify"
import Header from './components/Header'
import { Input, Button } from '@material-tailwind/react'

export default function Home() {
  const [tasks, setTasks] = useState<any>([])
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchedTask, setSearchedTask] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setIsLoading(true)
    try {
      const allTasks = await getAllTasks()
      setTasks(allTasks)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAllTasks: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setModalOpen(false)
    setIsLoading(true)
    try {
      // Delete all tasks one by one (you can also add a batch delete endpoint in the API)
      for (const task of tasks) {
        await deleteTodo({ ...task, is_deleted: true })
        task.is_deleted = true
      }
      // setTasks([]) // Clear the tasks in the state
    } catch (error) {
      console.error("Error deleting tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to update tasks state after adding a new task
  const updateTasks = (newTask: any) => {
    setTasks([...tasks, newTask])
    toast.success('Task is Added!', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const handleDeleteTask = (id: any) => {
    // setTasks(tasks.filter((task: any) => task.id !== id))
    toast.success('Task is Deleted!', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const handleUpdateTask = (updatedTask: any) => {
    setTasks((prevTasks: any) =>
      prevTasks.map((task: any) => (task.id === updatedTask.id ? updatedTask : task))
    )
    toast.success('Task is Updated!', {
      position: "bottom-left",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  const filteredTasks = tasks.filter((task: any) =>
    task.text.toLowerCase().includes(searchedTask.toLowerCase())
  );

  return (
    <main className="max-w-5xl mx-auto pt-4 bg-slate-50">
      <ToastContainer />
      <div className="text-center mt-5 p-4 flex flex-col gap-4">
        <Header>
          <div className="w-72 mr-2">
            <Input label="Search tasks" size='lg' value={searchedTask} onChange={(e) => setSearchedTask(e.target.value)} />
          </div>
          <AddTask updateTasks={updateTasks} setIsLoading={setIsLoading} />
        </Header>
      </div>
      <div className="flex flex-col p-4 lg:flex-row lg:space-x-5">
        <div className="lg:w-1/3 flex flex-col justify-between">
          <SideBar selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} isLoading={isLoading} setIsLoading={setIsLoading} />
        </div>
        <div className="lg:w-2/3">
          {isLoading
            ? <div className="flex items-center justify-center" style={{ height: '700px' }}>
              <Loader /> {/*Display the loader while tasks are loading*/}
            </div> : (
              <TodoList tasks={filteredTasks} deleteTask={handleDeleteTask} updateTask={handleUpdateTask} selectedStatus={selectedStatus} />
            )}
          {/* <button className='btn text-white bg-red-600 hover:bg-red-700 w-full mt-4' onClick={() => setModalOpen(true)}>Delete All</button> */}
          <Button variant="gradient" color="red" onClick={() => setModalOpen(true)} className='mt-4' size="lg" fullWidth>Delete All</Button>
          <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} >
            <form onSubmit={handleDeleteAllTasks}>
              <h3 className='font-bold text-lg'>Are you sure to delete All the tasks ?</h3>
              <div className='modal-action'>
                <button className='btn text-white bg-red-600 hover:bg-red-700' type='submit'>Yes</button>
                <button className='btn' type='button' onClick={() => setModalOpen(false)}>No</button>
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </main>
  )
}
