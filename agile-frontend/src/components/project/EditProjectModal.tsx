import { useState } from "react";
import type { Project } from "../../types/project";

export default function EditProjectModal({
    project,
    onClose,
    onUpdate,
}: {
    project: Project;
    onClose: () => void;
    onUpdate: (data: {name: string; description: string }) => void;
}) {
    const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description || "");

  const handleSubmit = () => {
    if (!name) return;
    onUpdate({ name, description });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="text-lg font-semibold mb-4">Edit Project</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded mb-3"
          placeholder="Project Name"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          placeholder="Description"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-indigo-500 text-white rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}