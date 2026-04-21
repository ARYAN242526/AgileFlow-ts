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

            <div className="flex items-center gap-2 mt-2">
                <img
                    src={`https://ui-avatars.com/api/?name=${project.owner?.name}`}
                    className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-600">
                    {project.owner?.name}
                </span>
                </div>
        </div>
    )
}