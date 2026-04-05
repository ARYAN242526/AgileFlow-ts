import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import FeatureCard from "../../components/feature/FeatureCard";
import FeatureForm from "../../components/feature/FeatureForm";

import {
  getSprintFeatures,
  createFeature,
} from "../../services/featureService";

import type { Feature } from "../../types/feature";

export default function FeaturesPage() {
  const { sprintId } = useParams();

  const [features, setFeatures] = useState<Feature[]>([]);

  const fetchFeatures = async () => {
    if (!sprintId) return;
    const data = await getSprintFeatures(sprintId);
    setFeatures(data);
  };

  useEffect(() => {
    fetchFeatures();
  }, [sprintId]);

  const handleCreate = async (data: {
    title: string;
    description?: string;
  }) => {
    if (!sprintId) return;

    await createFeature({
      ...data,
      sprintId,
    });

    fetchFeatures();
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">Features</h1>

      {/* Create */}
      <FeatureForm onCreate={handleCreate} />

      {/* List */}
      {features.length === 0 ? (
        <p className="text-gray-500">No features yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature._id}
              feature={feature}
              refresh={fetchFeatures}
            />
          ))}
        </div>
      )}
    </div>
  );
}