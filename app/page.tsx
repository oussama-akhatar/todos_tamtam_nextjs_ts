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
          <AddTask updateTasks={updateTasks} setIsLoading={setIsLoading} />
          <div className="w-full md:w-72 ml-2">
            <Input label="Search tasks" size='lg' value={searchedTask} className='rounded-full' onChange={(e) => setSearchedTask(e.target.value)} icon={(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            )} />
          </div>
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
          <Button variant="gradient" color="red" onClick={() => setModalOpen(true)} className='flex items-center justify-center gap-3 mt-4' size="lg" fullWidth>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" cursor="pointer" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            <span>Delete All</span>
          </Button>
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
