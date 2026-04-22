import { useState } from "react";
import { addProjectMember } from "../../services/projectService";

export default function AddMember({
    projectId,
    onAdded,
}: {
    projectId: string;
    onAdded: () => void;
}) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAdd = async () => {
        if(!email.trim()) return;

        try {
            setLoading(true);
            setError("");
            await addProjectMember(projectId, email);
            setEmail("");
            onAdded();
        } catch (err: any) {
            setError(err?.resposne?.data?.message || "Failed to add member");            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-3">
            <div className="flex gap-2">
                <input
                type="email"
                placeholder="Enter member email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 border px-3 py-2 rounded-md text-sm outline-none"
                />
                <button
                onClick={handleAdd}
                disabled={loading}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-600 disabled:opacity-50"
                >
                {loading ? "Adding..." : "Add"}
                </button>
            </div>

            {error && (
                <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
            </div>
    )
}