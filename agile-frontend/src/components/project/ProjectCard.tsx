import { useNavigate } from "react-router-dom";
import type { Project } from "../../types/project";

export default function ProjectCard({ project } : { project: Project}) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/projects/${project._id}/sprints`)}
            className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
        >

            <h2 className="font-semibold text-lg">{project.name}</h2>

            <p className="text-sm text-gray-500 mt-2">
                {project.description}
            </p>

            <div className="mt-4">
                <span className="text-xs text-gray-400">
                    Created by : {project.createdBy}
                </span>
            </div>
        </div>
    )
}