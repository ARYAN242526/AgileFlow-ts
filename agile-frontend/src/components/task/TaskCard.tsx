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

            <button
            onClick={(e) => {
                e.stopPropagation();
                handleDelete();
            }}
            className="text-red-500 text-xs mt-2"
            >
                Delete
            </button>
        </div>
    )
}