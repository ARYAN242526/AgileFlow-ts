import { useState, useEffect } from "react";
import { getProjects } from "../../services/projectService";

export default function SprintForm({
    onCreate,
}: {
    onCreate: (data: any) => void;
}) {
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [projectId, setProjectId] = useState("");
    const [projects, setProjects] = useState<any[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const data = await getProjects();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    const handleSubmit = () => {
        if(!name || !projectId) return;

        onCreate({ name, startDate, endDate, projectId });

        setName("");
        setStartDate("");
        setEndDate("");
        setProjectId("");
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

            {/* Project Dropdown */}
            <select
            className="w-full mb-2 p-2 border rounded"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            >

            <option value="">Seelct Project</option>
            {projects?.map((p) => (
                <option key={p._id} value={p._id}>
                    {p.name}
                </option>
            ))}
            </select>

            <button
            onClick={handleSubmit}
            className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
                Create
            </button>
        </div>
    )
}