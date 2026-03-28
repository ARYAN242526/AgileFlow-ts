import { useState } from "react";

interface Props {
    onCreate: (data: any) => void;
    sprints : {_id: string; name: string }[];
}

export default function FeatureForm({ onCreate, sprints }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [sprint, setSprint] = useState("");

    const handleSubmit = () => {
        if(!title || !sprint) return;

        onCreate({
            title,
            description,
            sprint,
        });

        setTitle("");
        setDescription("");
    };

    return (
        <div className="mb-6 p-4 border rounded">
            <h3 className="font-bold mb-2">Create Feature</h3>

            <input
            placeholder="Title"
            className="border p-2 mr-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />

            <input
            placeholder="Description"
            className="border p-2 mr-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />

            <select
            className="border p-2 mr-2"
            value={sprint}
            onChange={(e) => setSprint(e.target.value)}
            >
                <option value="">Select Sprint</option>
                {sprints.map((s) => (
                    <option key={s._id} value={s._id}>
                        {s.name}
                    </option>
                ))}
            </select>

            <button onClick={handleSubmit} className="bg-blue-500 text-white px-3 py-2">
                Create
            </button>
        </div>
    )
}