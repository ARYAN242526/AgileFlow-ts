import { useState } from "react";

export default function TaskForm({
    onCreate,
}: {
    onCreate: (data: { title: string; description?: string}) => void;
}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if(!title.trim()) return;

        onCreate({ title, description });

        setTitle("");
        setDescription("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <input
            className="border p-2 mr-2"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <input
            className="border p-2 mr-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

            <button className="bg-blue-500 text-white px-3 py-2 rounded">
                Add Task
            </button>
        </form>
    )
}