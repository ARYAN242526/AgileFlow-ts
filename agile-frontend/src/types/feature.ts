export interface Feature {
    _id: string;
    title: string;
    description?: string;
    status: "planned" | "in-progress" | "completed";
    sprint: string;
    project: string;
    createdAt: string; 
}