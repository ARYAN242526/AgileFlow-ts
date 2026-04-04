import { useNavigate } from "react-router-dom";
import type { Project } from "../../types/project";

export default function ProjectCard({ project } : { project: Project}) {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
            <h3 className="font-semibold text-lg">{project.name}</h3>

            <p className="text-sm text-gray-500 mt-2">
                {project.description}
            </p>

            <div className="mt-4">
                <span className="text-xs text-gray-400">
                    Created by : {project.createdBy}
                </span>
            </div>
             <button
                onClick={(e) => {
                e.stopPropagation();
                navigate(`/projects/${project._id}`);
                }}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
            Open Project
        </button>
        </div>
    )
}