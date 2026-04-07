import api from "./api";

export const getFeatureTasks = async (featureId: string) => {
    const res = await api.get(`/tasks/features/${featureId}`);
    return res.data;
};

export const createTask = async (data: {
    title: string;
    description?: string;
    featureId: string;
}) => {
    const res = await api.post(`/tasks`, {
        title: data.title,
        description: data.description || "",
        feature: data.featureId,
        status: "todo",
    });
    return res.data;
};

export const updateTaskStatus = async (id: string, status: string) => {
    const res = await api.patch(`/tasks/status/${id}`, { status });
    return res.data;
};

export const deleteTask = async(id: string) => {
    await api.delete(`/tasks/${id}`);
}