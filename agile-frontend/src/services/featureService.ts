import api from "./api";

export const createFeature = async (data: {
    title: string;
    description? : string;
    sprint: string;
    status? : string; 
}) => {
    const res = await api.post("/features", data);
    return res.data.data;
};

export const getSprintFeatures = async (sprintId: string) => {
    const res = await api.get(`/features/sprint/${sprintId}`);
    return res.data.data;
};