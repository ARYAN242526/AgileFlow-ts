import { useState } from "react";

export default function ProjectForm({
    onCreate,
}: {
    onCreate: (data: { name: string; description: string}) => void;
}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        if(!name) return;

        onCreate({ name, description});

        setName("");
        setDescription("");
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="font-semibold mb-3">Create Project</h2>

            <input 
            type="text"
            placeholder="Project Name"
            className="w-full mb-2 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <textarea 
            placeholder="Description"
            className="w-full mb-2 p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

            <button 
            className="bg-indigo-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            >
                Create
            </button>
        </div>
    )
}