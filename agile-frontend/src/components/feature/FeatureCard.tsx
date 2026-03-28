import type { Feature } from "../../types/feature";

export default function FeatureCard({ feature }: { feature: Feature }) {
    return (
        <div className="border p-4 rounded shadow">
            <h3 className="font-bold">{feature.title}</h3>
            <p>{feature.description}</p>
            <span className="text-sm text-gray-500">{feature.status}</span>
        </div>
    )
}