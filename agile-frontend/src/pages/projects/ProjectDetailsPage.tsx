import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";

export default function ProjectDetailsPage() {
    const {projectId} = useParams();
    const navigate = useNavigate();

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-6">Project Dashboard</h1>

            <div className="grid grid-cols-3 gap-4">

                <div
                    onClick={() => navigate(`/projects/${projectId}/sprints`)}
                    className="p-6 border rounded cursor-pointer hover:shadow-md transition"
                >

                <h2 className="font-bold text-lg">Sprints</h2>
                <p className="text-sm text-gray-500">Manage project sprints</p>
                </div>

                <div
                    onClick={() => navigate(`/projects/${projectId}/features`)}
                    className="p-6 border rounded cursor-pointer hover:shadow-md transition"
                >
                 <h2 className="font-bold text-lg">Features</h2>
                <p className="text-sm text-gray-500">View and create features</p>
                </div>

                <div
                onClick={() => navigate(`/projects/${projectId}/tasks`)}
                className="p-6 border rounded cursor-pointer hover:shadow-md transition"
                >
                <h2 className="font-bold text-lg">Tasks</h2>
                <p className="text-sm text-gray-500">Track tasks and progress</p>
                </div>   
            </div>
        </MainLayout>
    )
}