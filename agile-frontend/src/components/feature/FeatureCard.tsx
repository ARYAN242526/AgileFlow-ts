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
  const { projectId, sprintId} = useParams(); // get IDs from URL

  const handleDelete = async () => {
    await deleteFeature(feature._id);
    refresh();
  };

  const getStatusColor = () => {
    if (feature.status === "planned") return "bg-yellow-100 text-yellow-700";
    if (feature.status === "in-progress") return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">

      {/* Title */}
      <h3 className="font-semibold text-lg">{feature.title}</h3>

      {/* Description */}
      <p className="text-sm text-gray-500 mt-1">
        {feature.description || "No description"}
      </p>

      {/* Status */}
      <span
        className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getStatusColor()}`}
      >
        {feature.status}
      </span>

      {/* Created Date */}
      <p className="text-xs text-gray-400 mt-2">
        Created: {new Date(feature.createdAt).toLocaleDateString()}
      </p>

        <button
        onClick={() =>
          navigate(
            `/projects/${projectId}/sprints/${sprintId}/features/${feature._id}/tasks`
          )
        }
        className="bg-indigo-500 text-white px-3 py-1 rounded mt-3 w-full"
      >
        View Tasks
      </button>

      {/* Actions */}
      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-2 py-1 rounded mt-3"
      >
        Delete
      </button>
    </div>
  );
}