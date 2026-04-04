import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import FeatureCard from "../../components/feature/FeatureCard";
import FeatureForm from "../../components/feature/FeatureForm";
import { createFeature, getSprintFeatures } from "../../services/featureService";
import { getSprints } from "../../services/sprintService";

export default function FeaturesPage() {
    const {projectId} = useParams();
    const navigate = useNavigate();

    const [features, setFeatures] = useState<any[]>([]);
    const [sprints, setSprints] = useState<any[]>([]);
    const [selectedSprint, setSelectedSprint] = useState("");

    // separate loading classes
    const [sprintLoading, setSprintLoading] = useState(false);
    const [featureLoading, setFeatureLoading] = useState(false);

    // fetch sprints using dynamic projectId
    const fetchSprints = async () => {

        try {
            if(!projectId) return;

            setSprintLoading(true);
            
            const data = await getSprints(projectId);
            setSprints(data);

            // auto select first sprint(only if none selected)
            if(data.length > 0 && !selectedSprint){
                setSelectedSprint(data[0]._id);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSprintLoading(false);
        }
    }

    useEffect(() => {
        fetchSprints();
    } , [projectId]);

    // fetch features by sprint
    const fetchFeatures = async (sprintId: string) => {
        try {
            setFeatureLoading(true);

            const data = await getSprintFeatures(sprintId);
            setFeatures(data);
        } catch (err) {
            console.error(err);
        } finally {
            setFeatureLoading(false);
        }
    };

    useEffect(() => {
        if(selectedSprint) {
            fetchFeatures(selectedSprint);
        } else {
            setFeatures([]); // clear if no sprint selected
        }
    }, [selectedSprint]);

    const handleCreate = async (data: any) => {
    try {
      await createFeature(projectId as string, data);

      if (selectedSprint) {
        fetchFeatures(selectedSprint);
      }
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-6">Features</h1>

            {/* Sprint state handling */}
                {sprintLoading ? (
                    <p>Loading sprints...</p>
                ) : sprints.length === 0 ? (
                    <div className="mb-4">
                        <p className="text-red-500 mb-2">
                            No sprints found. Please create a sprint first.
                        </p>

                        <button
                            onClick={() => navigate(`/projects/${projectId}/sprints`)}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Go to Sprints
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Sprint Filter */}
                        <select
                            className="border p-2 mb-4"
                            value={selectedSprint}
                            onChange={(e) => setSelectedSprint(e.target.value)}
                        >
                            <option value="">Select Sprint</option>
                            {sprints?.map((s: any) => (
                                <option key={s._id} value={s._id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </>
                )}
           

             {sprints.length > 0 && (
                <FeatureForm
                onCreate={handleCreate}
                sprints={sprints}
                selectedSprint={selectedSprint}
                />
             )}

              {/* Features Section */}
            <div className="grid grid-cols-3 gap-4">
                {featureLoading ? (
                <p>Loading features...</p>
                ) : features.length > 0 ? (
                features.map((f) => (
                    <FeatureCard key={f._id} feature={f} />
                ))
                ) : (
                !sprintLoading && (
                    <p className="text-gray-500">No features found</p>
                )
                )}
            </div>
        </MainLayout>
    );
}