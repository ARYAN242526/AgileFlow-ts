import { useState } from "react";

export default function FeatureForm({
  onCreate,
}: {
  onCreate: (data: {
    title: string;
    description?: string;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onCreate({ title, description });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-semibold mb-3">Create Feature</h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Feature Title"
        className="w-full mb-2 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Description */}
      <textarea
        placeholder="Feature Description"
        className="w-full mb-2 p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white px-4 py-2 rounded"
      >
        Create Feature
      </button>
    </div>
  );
}