import { getAllTasksTodo } from "@/api"
import Task from "./Task"

const TodosTasks = async () => {
    const tasks = await getAllTasksTodo()
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

export default TodosTasks