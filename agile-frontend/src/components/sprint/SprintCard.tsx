import { useNavigate } from "react-router-dom";
import type { Sprint } from "../../types/sprint";
import { 
    startSprint, 
    completeSprint, 
    deleteSprint 
} from "../../services/sprintService";

export default function SprintCard({
    sprint,
    refresh,
    projectId,
} : { 
    sprint: Sprint;
    refresh: () => void;
    projectId: string;
}) {

    const navigate = useNavigate();

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString("en-GB");
    };

    const handleStart = async () => {
        await startSprint(sprint._id);
        refresh();
    };

    const handleComplete = async () => {
        await completeSprint(sprint._id);
        refresh();
    };

    const handleDelete = async () => {
        await deleteSprint(sprint._id);
        refresh();
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg">{sprint.name}</h3>

        <p className="text-sm text-gray-500 mt-1">
            Project : {sprint.project?.name}
        </p>

        <p className="text-xs text-gray-400 mt-2">
            {formatDate(sprint.startDate)} -→ {formatDate(sprint.endDate)}
        </p>

        <p className="text-xs mt-2">
            Status: <span className="font-semibold">{sprint.status}</span>
        </p>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
        {sprint.status === "PLANNED" && (
          <button
            onClick={handleStart}
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Start
          </button>
        )}

        {sprint.status === "ACTIVE" && (
          <button
            onClick={handleComplete}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            Complete
          </button>
        )}

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
        </div>
        <button
            onClick={() =>
            navigate(`/projects/${projectId}/sprints/${sprint._id}/features`, {
              state: {refresh: true}
            })
            }
            className="bg-indigo-500 text-white px-3 py-1 rounded mt-4 w-full"
        >
        View Features
      </button>
    </div>
    );
}