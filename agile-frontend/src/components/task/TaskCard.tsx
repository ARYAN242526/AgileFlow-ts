import { useDraggable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import { deleteTask, updateTaskAssignee } from "../../services/taskService";
import { getUsers } from "../../services/userService";


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

    // assignee state
    const [showUsers, setShowUsers] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [currentAssignee, setCurrentAssignee] = useState(task.assignee);

      useEffect(() => {
        const fetchUsers = async () => {
          const data = await getUsers();
          setUsers(data);
        };
        fetchUsers();
    }, []);

      const handleAssign = async (user: any) => {
        setCurrentAssignee(user); // optimistic UI
        setShowUsers(false);

        try {
          await updateTaskAssignee(task._id, user._id);
        } catch {
          refresh(); // fallback
        }
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
        className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition cursor-grab active:cursor-grabbing relative"
    >
      <h4 className="font-semibold text-gray-800">{task.title}</h4>

      <p className="text-xs text-gray-500 mt-1">{task.description}</p>

      <div className="mt-2 relative">
        {currentAssignee ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation(); // ❗ prevent drag
              setShowUsers(!showUsers);
            }}
          >
            <img
              src={currentAssignee.avatar}
              alt={currentAssignee.name}
              className="w-6 h-6 rounded-full border"
            />
            <span className="text-xs text-gray-600">
              {currentAssignee.name}
            </span>
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowUsers(!showUsers);
            }}
            className="text-xs text-gray-400 cursor-pointer"
          >
            Assign user
          </div>
        )}

        {/* 🔥 Dropdown */}
        {showUsers && (
          <div
            className="absolute z-10 bg-white border shadow-md rounded mt-2 w-40"
            onClick={(e) => e.stopPropagation()} // ❗ prevent drag
          >
            {users.map((u) => (
              <div
                key={u._id}
                onClick={() => handleAssign(u)}
                className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 ${
                  currentAssignee?._id === u._id ? "bg-blue-50" : ""
                }`}
              >
                <img
                  src={u.avatar}
                  className="w-5 h-5 rounded-full"
                />
                <span className="text-xs">{u.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

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