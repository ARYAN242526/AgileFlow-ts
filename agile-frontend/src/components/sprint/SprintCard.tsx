import { useNavigate } from "react-router-dom";
import type { Sprint } from "../../types/sprint";
import { deleteSprint } from "../../services/sprintService";
import { useState } from "react";

export default function SprintCard({
    sprint,
    refresh,
    projectId,
} : { 
    sprint: Sprint;
    refresh: () => void;
    projectId: string;
}) {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-GB");
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Delete this sprint?");
        if (!confirmDelete) return;

        setLoading(true);
        await deleteSprint(sprint._id);
        await refresh();
        setLoading(false);
    };

    // status badge color
    const statusColor = 
        sprint.status === "planned"
        ? "bg-yellow-100 text-yellow-700"
        : sprint.status === "active"
        ? "bg-green-100 text-green-700"
        : "bg-gray-200 text-gray-700";

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg">{sprint.name}</h3>

            <p className="text-sm text-gray-500 mt-1">
                Project: {sprint.project?.name}
            </p>

            <p className="text-xs text-gray-400 mt-2">
                {formatDate(sprint.startDate)} → {formatDate(sprint.endDate)}
            </p>

            {/* Status Badge */}
            <div className="mt-2">
                <span className={`text-xs px-2 py-1 rounded ${statusColor}`}>
                    {sprint.status}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
                <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{sprint.progress ?? 0}%</span>
                </div>

                <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                        className="bg-green-500 h-2 rounded"
                        style={{ width: `${sprint.progress ?? 0}%` }}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className={`px-3 py-1 rounded text-white ${
                        loading
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                    }`}
                >
                    Delete
                </button>
            </div>

            {/* Navigate */}
            <button
                onClick={() =>
                    navigate(`/projects/${projectId}/sprints/${sprint._id}/features`, {
                        state: { refresh: true }
                    })
                }
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded mt-4 w-full"
            >
                View Features
            </button>
        </div>
    );
}