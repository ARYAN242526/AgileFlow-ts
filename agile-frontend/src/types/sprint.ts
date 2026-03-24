export interface Sprint {
    _id: string;
    name: string;
    startDate: string;
    endDate: string;
    project: {
        _id: string;
        name: string;
    };
}