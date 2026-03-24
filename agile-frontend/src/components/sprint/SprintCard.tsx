import type { Sprint } from "../../types/sprint";

export default function SprintCard({ sprint } : { sprint: Sprint}) {
    return (
        <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="font-semibold text-lg">{sprint.name}</h3>

        <p className="text-sm text-gray-500 mt-1">
            Project : {sprint.project?.name}
        </p>

        <p className="text-xs text-gray-400 mt-2">
            {sprint.startDate} -→ {sprint.endDate}
        </p>
        </div>
    );
}