import { useNavigate } from "react-router-dom";
import type { Project } from "../../types/project";
import {
  updateMemberRole,
  removeMember,
} from "../../services/projectService";
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

      {/* 🔥 Members Section */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Members
          </span>

          {/* ➕ Toggle Add */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAdd(!showAdd);
            }}
            className="text-xs text-indigo-500 hover:underline"
          >
            + Add
          </button>
        </div>

        {/* Members List */}
        <div className="flex items-center gap-2 flex-wrap">
          {project.members?.map((m: any) => {
            const isOwner = m.user._id === project.owner?._id;

            return (
              <div
                key={m.user._id}
                className="relative group flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Avatar */}
                <img
                  src={
                    m.user.avatar ||
                    `https://ui-avatars.com/api/?name=${m.user.name}`
                  }
                  className="w-7 h-7 rounded-full"
                />

                {/* Name */}
                <span className="text-xs">{m.user.name}</span>

                {/* Role */}
                <select
                  value={m.role}
                  disabled={isOwner}
                  onChange={(e) =>
                    updateMemberRole(
                      project._id,
                      m.user._id,
                      e.target.value
                    ).then(refresh)
                  }
                  className={`text-xs bg-transparent ${
                    isOwner
                      ? "text-gray-400 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <option value="Admin">Admin</option>
                  <option value="Member">Member</option>
                </select>

                {/* 👑 Owner */}
                {isOwner && (
                  <span className="text-[10px] bg-yellow-200 px-1 rounded">
                    Owner
                  </span>
                )}

                {/* ❌ Remove */}
                {!isOwner && (
                  <button
                    onClick={() => {
                      if (confirm("Remove member?")) {
                        removeMember(project._id, m.user._id).then(refresh);
                      }
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 hidden group-hover:flex items-center justify-center"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* ➕ Add Member UI */}
        {showAdd && (
          <div
            className="mt-3"
            onClick={(e) => e.stopPropagation()}
          >
            <AddMember projectId={project._id} onAdded={refresh} />
          </div>
        )}
      </div>
    </div>
  );
}