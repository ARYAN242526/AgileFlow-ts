import api from "./api";

export const getFeatureTasks = async (featureId: string) => {
    const res = await api.get(`/tasks/feature/${featureId}`);
    return res.data.data;
};

export const createTask = async (data: {
    title: string;
    description?: string;
    featureId: string;
    projectId: string;
    priority: "low" | "medium" | "high";
    assignee?: string;
}) => {
    const res = await api.post(`/tasks`, {
        title: data.title,
        description: data.description || "",
        feature: data.featureId,
        project: data.projectId,
        priority: data.priority,
        status: "todo",
        assignee: data.assignee || undefined,
    });
    return res.data;
};

export const updateTaskStatus = async (id: string, status: string) => {
    const res = await api.patch(`/tasks/${id}/status`, { status });
    return res.data;
};

export const updateTaskAssignee = async(taskId: string, assigneeId: string) => {
    const res = await api.patch(`/tasks/${taskId}`, {
        assignee: assigneeId
    });

    return res.data;
};

export const deleteTask = async(id: string) => {
    await api.delete(`/tasks/${id}`);
}