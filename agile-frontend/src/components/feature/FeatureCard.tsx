import { useParams, useNavigate } from "react-router-dom";
import type { Feature } from "../../types/feature";
import { deleteFeature } from "../../services/featureService";

export default function FeatureCard({
  feature,
  refresh,
}: {
  feature: Feature;
  refresh: () => void;
}) {
  const navigate = useNavigate();
  const { projectId, sprintId } = useParams();

  const handleDelete = async () => {
    await deleteFeature(feature._id);
    refresh();
  };

  const getStatusColor = () => {
    if (feature.status === "planned")
      return "bg-yellow-100 text-yellow-700";
    if (feature.status === "in-progress")
      return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all border">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-gray-800">
          {feature.title}
        </h3>

        <span
          className={`text-xs px-2 py-1 rounded-full ${getStatusColor()}`}
        >
          {feature.status}
        </span>
      </div>

      {/* 🔥 DESCRIPTION */}
      <p className="text-sm text-gray-500 mt-2 line-clamp-2">
        {feature.description || "No description provided"}
      </p>

      {/* 🔥 META INFO */}
      <div className="mt-3 text-xs text-gray-400">
        Created: {new Date(feature.createdAt).toLocaleDateString()}
      </div>

      {/* 🔥 ACTIONS */}
      <div className="flex gap-2 mt-4">

        {/* View Tasks */}
        <button
          onClick={() =>
            navigate(
              `/projects/${projectId}/sprints/${sprintId}/features/${feature._id}/tasks`
            )
          }
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-3 py-2 rounded-lg transition"
        >
          View Tasks →
        </button>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="bg-red-100 hover:bg-red-200 text-red-600 text-sm px-3 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}