export interface Sprint {
    _id: string;
    name: string;
    goal: string;

    startDate: string;
    endDate: string;

    status: "PLANNED" | "ACTIVE" | "COMPLETED";

    project: {
        _id: string;
        name: string;
    };
}