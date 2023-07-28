import { ITask } from "@/types/task";
import Task from "./Task";

interface TodoListProps {
    tasks: ITask[];
    deleteTask: (id: number) => void;
    updateTask: (updatedTask: ITask) => void;
}

const TodoList = ({ tasks, deleteTask, updateTask }: TodoListProps) => {
    return (
        <div className="overflow-x-auto">
            {tasks.length === 0 ? (
                <p className="text-xl text-center py-4">No tasks found.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr className="text-xl">
                            <th>Task</th>
                            <th>isDone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <Task key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TodoList;
