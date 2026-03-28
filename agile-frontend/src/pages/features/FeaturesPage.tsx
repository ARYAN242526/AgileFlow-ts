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

    // fetch sprints using dynamic projectId
    const fetchSprints = async () => {
        try {
            if(!projectId) return;
            
            const data = await getSprints(projectId);
            console.log("Sprints:", data);
            
            setSprints(data);
        } catch (err) {
            console.error(err);
        }
    }

    // fetch features by sprint
    const fetchFeatures = async (sprintId: string) => {
        try {
            const data = await getSprintFeatures(sprintId);
            setFeatures(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSprints();
    } , [projectId]);

    useEffect(() => {
        if(selectedSprint) {
            fetchFeatures(selectedSprint);
        }
    }, [selectedSprint]);

    const handleCreate = async (data: any) => {
    try {
      await createFeature(data);

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
                {features?.map((f) => (
                <FeatureCard key={f._id} feature={f} />
                ))}
            </div>
        </MainLayout>
    );
}