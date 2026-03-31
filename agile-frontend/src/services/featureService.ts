import api from "./api";

export const createFeature = async (projectId: string, data: any) => {
    const res = await api.post(`/features/${projectId}`, data);
    return res.data.data;
};

export const getSprintFeatures = async (sprintId: string) => {
    const res = await api.get(`/features/sprint/${sprintId}`);
    return res.data.data;
};