import { ITask } from "@/types/task"
import Task from "./Task"

interface TodoListProps {
    tasks: ITask[]
}

const TodoList = ({ tasks }: TodoListProps) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr className="text-xl">
                        <th>Task</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TodoList