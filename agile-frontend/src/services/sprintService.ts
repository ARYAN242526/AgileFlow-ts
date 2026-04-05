import api from "./api";
import type { Sprint } from "../types/sprint";

export const getSprints = async (projectId: string): Promise<Sprint[]> => {
    const res = await api.get(`/sprints/${projectId}`);
    return res.data.data;
};

export const createSprint = async (data: {
    name: string;
    gaol: string;
    startDate: string;
    endDate: string;
    projectId: string;
}) => {
    const res = await api.post(`/sprints/${data.projectId}`, data);
    return res.data;
};

export const startSprint = async (sprintId: string) => {
    const res = await api.patch(`/sprints/start/${sprintId}`);
    return res.data;
};

export const completeSprint = async (sprintId: string) => {
    const res = await api.patch(`/sprints/complete/${sprintId}`);
    return res.data;
};

export const deleteSprint = async (sprintId: string) => {
    const res = await api.delete(`/sprints/${sprintId}`);
    return res.data;
};