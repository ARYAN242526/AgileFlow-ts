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
    const [creating , setCreating] = useState(false);

    const handleSubmit = async () => {
        if(!title) {
            setError("Title is required");
            return;
        }

        if(!selectedSprint) {
            setError("Please select a sprint");
            return;
        }

       try {
         setError("");
         setCreating(true);
 
         await onCreate({
            title,
            description,
            sprint: selectedSprint,
         });

         // reset only if success
         setTitle("");
         setDescription("");
       } catch (error) {
            setError("Failed to create feature");
       } finally {
        setCreating(false);
       }
    };

    const isDisabled = !title || !selectedSprint;

    const sprintName = sprints.find((s) => s._id === selectedSprint)?.name || "None";

    return (
        <div className="mb-6 p-4 border rounded">
            <h3 className="font-bold mb-2">Create Feature</h3>

            <p className="mb-2 text-sm text-gray-600">
                Sprint: {sprintName}
            </p>

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


            <button
            onClick={handleSubmit}
            disabled ={isDisabled} 
            className={`px-3 py-2 text-white ${
                isDisabled || creating 
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500"
            }`}
            >
                {creating ? "Creating..." : "Create"}
            </button>
        </div>
    )
}