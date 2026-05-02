import { useEffect, useState } from "react";
import type { Task } from "../../types/task";
import { getUsers } from "../../services/userService";

export default function EditTaskModal({
  task,
  onClose,
  onUpdate,
}: {
  task: Task;
  onClose: () => void;
  onUpdate: (data: any) => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  // 🔥 store only ID
  const [assigneeId, setAssigneeId] = useState(
    typeof task.assignee === "string"
      ? task.assignee
      : task.assignee?._id || ""
  );

  // 🔥 users list
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = () => {
    if (!title) return;

    onUpdate({
      title,
      description,
      priority,
      assignee: assigneeId || undefined,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          placeholder="Title"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          placeholder="Description"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* ✅ ASSIGNEE DROPDOWN (FIXED) */}
        <select
          value={assigneeId}
          onChange={(e) => setAssigneeId(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 px-3 py-1 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-indigo-500 text-white px-3 py-1 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}