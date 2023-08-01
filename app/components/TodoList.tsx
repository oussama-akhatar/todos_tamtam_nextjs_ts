"use client"

import { ITask } from "@/types/task";
import Task from "./Task";
import { useState, useEffect } from "react";
import Loader from "./Loader";

interface TodoListProps {
    tasks: ITask[];
    deleteTask: (id: number) => void;
    updateTask: (updatedTask: ITask) => void;
    selectedStatus: string;
}

const TodoList = ({ tasks, deleteTask, updateTask, selectedStatus }: TodoListProps) => {
    const [filteredTasks, setFilteredTasks] = useState<any>([])
    const [isDataFetched, setIsDataFetched] = useState<boolean>(false)
    const [isListReady, setIsListReady] = useState<boolean>(false)

    useEffect(() => {
        if (!isDataFetched) {
            filterTasksByStatus();
            setIsDataFetched(true);
        } else {
            filterTasksByStatus();
        }
        
        setIsListReady(true);
    }, [selectedStatus, tasks, isDataFetched]);

    const filterTasksByStatus = () => {
        if (selectedStatus === "all") {
            setFilteredTasks(tasks);
        } else if (selectedStatus === "todo") {
            setFilteredTasks(tasks.filter((task) => !task.is_done));
        } else if (selectedStatus === "done") {
            setFilteredTasks(tasks.filter((task) => task.is_done));
        } else if (selectedStatus === "deleted") {
            setFilteredTasks(tasks.filter((task) => task.is_deleted));
        }
    };

    console.log(tasks.length);


    return (
        <div className="overflow-x-auto px-6 rounded-xl bg-white" style={{height: '700px'}}>
            {
                isListReady && filteredTasks.length > 0 ? (
                    <table className="table table-pin-rows">
                        <thead>
                            <tr className="lg:text-xl">
                                <th>Task</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTasks.map((task: any) => (
                                <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                            ))}
                        </tbody>
                    </table>
                ) : <div className="flex items-center justify-center h-full">
                    No tasks found {/*Display the loader while tasks are loading*/}
                </div>}
        </div>
    );
};

export default TodoList;
