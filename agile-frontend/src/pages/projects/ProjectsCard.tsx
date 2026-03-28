import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project }: any) {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{project.name}</h2>

      <button
        onClick={() => navigate(`/projects/${project._id}/features`)}
        className="mt-2 bg-blue-500 text-white px-3 py-1"
      >
        View Features
      </button>
    </div>
  );
}