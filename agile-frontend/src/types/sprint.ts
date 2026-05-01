export interface Sprint {
    _id: string;
    name: string;
    goal: string;

    startDate: string;
    endDate: string;

    status: "planned" | "active" | "completed";

    project: {
        _id: string;
        name: string;
    };
    progress?: number;
}