import { useState } from "react";

interface Props {
    onCreate: (data: any) => void;
    sprints : {_id: string; name: string }[];
    selectedSprint: string;
}

export default function FeatureForm({ onCreate, sprints, selectedSprint }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = () => {
        if(!title) {
            setError("Title is required");
            return;
        }

        if(!selectedSprint) {
            setError("Please select a sprint");
            return;
        }

        setError(""); // clear error

        onCreate({
            title,
            description,
            sprint: selectedSprint,
        });
        // reset
        setTitle("");
        setDescription("");
    };

    const isDisabled = !title || !selectedSprint;

    return (
        <div className="mb-6 p-4 border rounded">
            <h3 className="font-bold mb-2">Create Feature</h3>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <input
            placeholder="Title"
            className="border p-2 mr-2"
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);
                setError("");
            }}
            />

            <input
            placeholder="Description"
            className="border p-2 mr-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

                <select
                className="border p-2 mr-2 bg-gray-100"
                value={selectedSprint}
                disabled
            >
                <option value="">Select Sprint</option>
                {sprints.map((s) => (
                    <option key={s._id} value={s._id}>
                    {s.name}
                </option>
                ))}
            </select>

            <button
            onClick={handleSubmit}
            disabled ={isDisabled} 
            className={`px-3 py-2 text-white ${
                isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
            }`}
            >
                Create
            </button>
        </div>
    )
}