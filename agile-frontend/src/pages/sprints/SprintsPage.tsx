import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import SprintForm from "../../components/sprint/SprintForm";
import SprintCard from "../../components/sprint/SprintCard";
import { getSprints, createSprint } from "../../services/sprintService";
import { getProjects } from "../../services/projectService";
import type { Sprint } from "../../types/sprint";

export default function SprintsPage() {
    const [sprints, setSprints] = useState<Sprint[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [projectId, setProjectId] = useState("");

    // fetch all projects for dropdown
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await getProjects();
                setProjects(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProjects();
    }, []);

    // fetch sprints based on selected project
    const fetchSprints = async () => {
        try {
            if(!projectId) return; // prevent invalid call
            const data = await getSprints(projectId);
            console.log("SPRINTS:", data);
            
            setSprints(data);
        } catch (error) {
            console.error(error);
        }
    };

    // run when projectId changes
    useEffect(() => {
        if(projectId){
            fetchSprints();
        }
    }, [projectId]);

    const handleCreate = async (data: any) => {
        try {
            const res = await createSprint(data);
            console.log("Create Response :", res);
            
            fetchSprints();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-6">Sprints</h1>

             {/* Project Dropdown */}
            <select
                className="mb-4 p-2 border rounded"
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
            >
                <option value="">Select Project</option>
                {projects.map((p) => (
                <option key={p._id} value={p._id}>
                    {p.name}
                </option>
                ))}
            </select>

        <SprintForm onCreate={handleCreate} />

        {/* Sprint List */}
        <div className="grid grid-cols-3 gap-4">
        {sprints.length > 0 ? (
          sprints.map((sprint) => (
            <SprintCard key={sprint._id} sprint={sprint} />
          ))
        ) : (
          <p className="text-gray-500">No sprints found</p>
        )}
      </div>
        </MainLayout>
    );
}