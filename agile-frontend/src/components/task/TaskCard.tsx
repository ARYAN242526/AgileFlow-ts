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
            ? `translate3d(${transform.x}px, ${transform.y}px)`
            : undefined,
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        await deleteTask(task._id);
        refresh();
    };

     return (
        <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition cursor-grab active:cursor-grabbing"
    >
      <h4 className="font-semibold text-gray-800">{task.title}</h4>

      <p className="text-xs text-gray-500 mt-1">{task.description}</p>

      {task.assignee && (
        <div className="flex items-center gap-2 mt-2">
          <img
            src={task.assignee.avatar}
            alt={task.assignee.name}
            className="w-6 h-6 rounded-full border"
          />
          <span className="text-xs text-gray-600">
            {task.assignee.name}
          </span>

        </div>
      )}

      {/* 🔥 Priority Badge */}
      <span
        className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${
          task.priority === "high"
            ? "bg-red-100 text-red-600"
            : task.priority === "medium"
            ? "bg-yellow-100 text-yellow-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {task.priority}
      </span>

      <button
        onClick={handleDelete}
        className="block mt-3 text-xs text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );
}