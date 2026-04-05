import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SprintForm({
    onCreate,
}: {
    onCreate: (data: any) => void;
}) {
    const { projectId } = useParams();

    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleSubmit = () => {
        if(!name || !projectId) return;

        onCreate({ name, startDate, endDate, projectId });

        setName("");
        setStartDate("");
        setEndDate("");
    };
    
    return (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h2 className="font-semibold mb-3">Create Sprint</h2>

            <input
            type="text"
            placeholder="Sprint Name"
            className="w-full mb-2 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input
            type="date"
            className="w-full mb-2 p-2 border rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            />

            <input
            type="date"
            className="w-full mb-2 p-2 border rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            />

            <button
            onClick={handleSubmit}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
                Create Sprint
            </button>
        </div>
    )
}