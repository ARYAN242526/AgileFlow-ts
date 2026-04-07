import type { Task } from "../../types/task";
import { deleteTask } from "../../services/taskService";

export default function TaskCard({
    task,
    refresh,
}: {
    task: Task;
    refresh: () => void;
}) {
    const handleDelete = async () => {
        await deleteTask(task._id);
        refresh();
    };

    return (
        <div className="bg-white p-3 rounded shadow-md">
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-xs text-gray-500">{task.description}</p>

            <button
            onClick={handleDelete}
            className="text-red-500 text-xs mt-2"
            >
                Delete
            </button>
        </div>
    )
}