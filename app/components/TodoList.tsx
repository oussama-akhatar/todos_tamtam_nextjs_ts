"use client"
import { ITask } from "@/types/task";
import Task from "./Task";
import { useState, useEffect } from "react";

interface TodoListProps {
    tasks: ITask[];
    deleteTask: (id: number) => void;
    updateTask: (updatedTask: ITask) => void;
    selectedStatus: string;
}

const TodoList = ({ tasks, deleteTask, updateTask, selectedStatus }: TodoListProps) => {
    const [filteredTasks, setFilteredTasks] = useState<any>([])
    useEffect(() => {
        filterTasksByStatus();
    }, [selectedStatus, tasks]);

    const filterTasksByStatus = () => {
        if (selectedStatus === "all") {
            setFilteredTasks(tasks);
        } else if (selectedStatus === "todo") {
            setFilteredTasks(tasks.filter((task) => !task.is_done));
        } else if (selectedStatus === "done") {
            setFilteredTasks(tasks.filter((task) => task.is_done));
        }
    };

    return (
        <div className="overflow-x-auto h-96">
            {filteredTasks.length === 0 ? (
                <p className="text-xl text-center py-4">No tasks found.</p>
            ) : (
                <table className="table table-pin-rows">
                    <thead>
                        <tr className="lg:text-xl">
                            <th>Task</th>
                            <th>isDone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((task: any) => (
                            <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TodoList;
