import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import FeatureCard from "../../components/feature/FeatureCard";
import FeatureForm from "../../components/feature/FeatureForm";
import { createFeature, getSprintFeatures } from "../../services/featureService";
import { getSprints } from "../../services/sprintService";

export default function FeaturesPage() {
    const {projectId} = useParams();

    const [features, setFeatures] = useState<any[]>([]);
    const [sprints, setSprints] = useState<any[]>([]);
    const [selectedSprint, setSelectedSprint] = useState("");
    const [loading, setLoading] = useState(false);

    // fetch sprints using dynamic projectId
    const fetchSprints = async () => {

        try {
            if(!projectId) return;

            setLoading(true);
            
            const data = await getSprints(projectId);
            setSprints(data);

            // auto select first sprint(only if none selected)
            if(data.length > 0 && !selectedSprint){
                setSelectedSprint(data[0]._id);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // fetch features by sprint
    const fetchFeatures = async (sprintId: string) => {
        try {
            setLoading(true);

            const data = await getSprintFeatures(sprintId);
            setFeatures(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSprints();
    } , [projectId]);

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

                {!loading && sprints.length === 0 && (
                    <p className="text-red-500 mb-4">
                        No sprints found. Please create a sprint first.
                    </p>
                )}

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

             <FeatureForm onCreate={handleCreate} sprints={sprints} />

            <div className="grid grid-cols-3 gap-4">
                {loading ? (
                <p>Loading...</p>
                ) : features.length > 0 ? (
                    features.map((f) => (
                    <FeatureCard key={f._id} feature={f} />
                ))
                ) : (
                <p className="text-gray-500">No features found</p>
                )}
            </div>
        </MainLayout>
    );
}