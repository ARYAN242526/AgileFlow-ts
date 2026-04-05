import api from "./api";

export const createFeature = async (data: {
    title: string;
    description?: string;
    sprintId: string;
}) => {
    const res = await api.post(`/features/${data.sprintId}`, {
        ...data,
        status: "planned", // default
    });
    return res.data;
};

export const getSprintFeatures = async (sprintId: string) => {
    const res = await api.get(`/features/sprint/${sprintId}`);
    return res.data.data;
};

export const deleteFeature = async (featureId: string) => {
    return await api.delete(`/features/${featureId}`);
};