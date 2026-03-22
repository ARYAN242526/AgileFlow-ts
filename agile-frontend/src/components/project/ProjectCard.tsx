import type { Project } from "../../types/project";

export default function ProjectCard({ project } : { project: Project}) {
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
        </div>
    )
}