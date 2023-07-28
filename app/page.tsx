"use client"

import { useState, useEffect } from 'react';
import { getAllTasks } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import SideBar from "./components/SideBar";
import { BounceLoader } from 'react-spinners';
import Loader from './components/Loader';

export default function Home() {
  const [tasks, setTasks] = useState<any>([]);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const allTasks = await getAllTasks();
      setTasks(allTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update tasks state after adding a new task
  const updateTasks = (newTask: any) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (id: any) => {
    setTasks(tasks.filter((task: any) => task.id !== id));
  };

  const handleUpdateTask = (updatedTask: any) => {
    setTasks((prevTasks: any) =>
      prevTasks.map((task: any) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  return (
    <main className="max-w-5xl mx-auto mt-4">
      <div className="text-center my-5 p-4 flex flex-col gap-4">
        <h1 className="text-2xl lg:text-5xl font-bold mb-3">Todo.Tamtam Next Js</h1>
        <AddTask updateTasks={updateTasks} />
      </div>
      <div className="flex flex-col p-4 lg:flex-row lg:space-x-5">
        <div className="lg:w-1/3 space-y-3">
          <SideBar selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} isLoading={isLoading} />
        </div>
        <div className="lg:w-2/3">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader /> {/*Display the loader while tasks are loading*/}
            </div>
          ) : (
            <TodoList tasks={tasks} deleteTask={handleDeleteTask} updateTask={handleUpdateTask} selectedStatus={selectedStatus} />
          )}
        </div>
      </div>
    </main>
  );
}
