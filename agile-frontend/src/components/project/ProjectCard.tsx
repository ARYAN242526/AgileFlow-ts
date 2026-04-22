import { useNavigate } from "react-router-dom";
import type { Project } from "../../types/project";
import AddMember from "./AddMember";
import { useState } from "react";

export default function ProjectCard({
  project,
  refresh,
}: {
  project: Project;
  refresh: () => void;
}) {
  const navigate = useNavigate();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      onClick={() => navigate(`/projects/${project._id}/sprints`)}
      className="bg-white p-5 rounded-xl shadow hover:shadow-md transition cursor-pointer"
    >
      {/* Title */}
      <h2 className="font-semibold text-lg">{project.name}</h2>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1">
        {project.description || "No description"}
      </p>

      {/* Owner */}
      <p className="text-xs text-gray-400 mt-3">
        Created by: {project.owner?.name}
      </p>

      {/* Members */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex -space-x-2">
          {project.members?.slice(0, 5).map((m: any) => (
            <img
              key={m.user._id}
              src={
                m.user.avatar ||
                `https://ui-avatars.com/api/?name=${m.user.name}`
              }
              className="w-8 h-8 rounded-full border-2 border-white"
              title={m.user.name}
              onClick={(e) => e.stopPropagation()} // 🔥 important
            />
          ))}
        </div>

        {/* + Add button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // 🔥 prevent navigation
            setShowAdd(!showAdd);
          }}
          className="text-xs text-indigo-500 hover:underline"
        >
          + Add
        </button>
      </div>

      {/* Add Member Form */}
      {showAdd && (
        <div
          onClick={(e) => e.stopPropagation()} // prevent navigation
          className="mt-3"
        >
          <AddMember projectId={project._id} onAdded={refresh} />
        </div>
      )}
    </div>
  );
}