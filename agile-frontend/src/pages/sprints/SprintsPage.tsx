import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import SprintForm from "../../components/sprint/SprintForm";
import SprintCard from "../../components/sprint/SprintCard";
import { getSprints, createSprint } from "../../services/sprintService";
import type { Sprint } from "../../types/sprint";

export default function SprintsPage() {
    const [sprints, setSprints] = useState<Sprint[]>([]);

    const fetchSprints = async () => {
        try {
            const data = await getSprints();
            setSprints(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSprints();
    }, []);

    const handleCreate = async (data: any) => {
        try {
            const res = await createSprint(data);
            console.log("Create Resposne :", res);
            
            fetchSprints();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <MainLayout>
            <h1 className="text-2xl font-bold mb-6">Sprints</h1>

        <SprintForm onCreate={handleCreate} />

        <div className="grid grid-cols-3 gap-4">
            {sprints?.map((sprint) => (
                <SprintCard key={sprint._id} sprint={sprint} />
            ))}
        </div>
        </MainLayout>
    );
}