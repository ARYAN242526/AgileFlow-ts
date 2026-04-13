import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../types/task";
import { deleteTask } from "../../services/taskService";

export default function TaskCard({
    task,
    refresh,
}: {
    task: Task;
    refresh: () => void;
}) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
    });

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    const handleDelete = async () => {
        await deleteTask(task._id);
        refresh();
    };

    const getPriorityColor = (priority: Task["priority"]) => {
        switch(priority) {
            case "low" :
                return "bg-green-100 text-green-700";
            case "medium" :
                return "bg-yellow-100 text-yellow-700";
            case "high" :
                return "bg-red-100 text-gray-700";
            default: 
            return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white p-3 rounded shadow-md"
        >
         {/* Drag handle */}
            <div
                {...listeners}
                {...attributes}
                className="cursor-grab active:cursor-grabbing font-semibold"
            >
                {task.title}
        </div>

        <p className="text-xs text-gray-500">{task.description}</p>

        <span
            className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getPriorityColor(task.priority)}`}
        >
            {task.priority.toUpperCase()}
        </span>

            <button
            onClick={(e) => {
                e.stopPropagation();
                handleDelete();
            }}
            className="block text-red-500 text-xs mt-2"
            >
                Delete
            </button>
        </div>
    )
}