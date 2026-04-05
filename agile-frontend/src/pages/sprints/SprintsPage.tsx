import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SprintForm from "../../components/sprint/SprintForm";
import SprintCard from "../../components/sprint/SprintCard";
import { getSprints, createSprint } from "../../services/sprintService";
import type { Sprint } from "../../types/sprint";

export default function SprintsPage() {

    const { projectId } = useParams();

    const [sprints, setSprints] = useState<Sprint[]>([]);

    const fetchSprints = async () => {
       if(!projectId) return;
       const data = await getSprints(projectId);
       setSprints(data);
    };

    useEffect(() => {
        fetchSprints();
    }, [projectId]);

    const handleCreate = async (data: any) => {
        await createSprint(data);
        fetchSprints();
    };

    return (
        <div className="p-6">
            <SprintForm onCreate={handleCreate} />

        <div className="grid grid-cols-3 gap-4">
            {sprints.map((sprint) => (
                <SprintCard
                key={sprint._id}
                sprint={sprint}
                refresh={fetchSprints}
                projectId={projectId!}
                />
            ))}
        </div>
        </div>
    );
}