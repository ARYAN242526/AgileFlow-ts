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
  const [loading, setLoading] = useState(false);

  const fetchFeatures = async () => {
    if (!sprintId) return;

    try {
      setLoading(true);
      const data = await getSprintFeatures(sprintId);
      setFeatures(data);
    } catch (err) {
      console.error("Error fetching features", err);
    } finally {
      setLoading(false);
    }
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
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* 🔥 HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Sprint Features 🚀
          </h1>
          <p className="text-gray-500 text-sm">
            Organize work into features and track progress
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-xl shadow text-sm">
          Total Features: <span className="font-semibold">{features.length}</span>
        </div>
      </div>

      {/* 🔥 CREATE FEATURE CARD */}
      <div className="mb-6 bg-white p-5 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Create New Feature
        </h2>
        <FeatureForm onCreate={handleCreate} />
      </div>

      {/* 🔥 LOADING */}
      {loading && (
        <p className="text-gray-500 text-center">Loading features...</p>
      )}

      {/* 🔥 EMPTY STATE */}
      {!loading && features.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl shadow">
          <h3 className="text-lg font-semibold text-gray-700">
            No features yet 😕
          </h3>
          <p className="text-gray-500 text-sm mt-2">
            Start by creating your first feature
          </p>
        </div>
      )}

      {/* 🔥 FEATURES GRID */}
      {features.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature._id}
              className="transition-transform hover:scale-[1.02]"
            >
              <FeatureCard
                feature={feature}
                refresh={fetchFeatures}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}