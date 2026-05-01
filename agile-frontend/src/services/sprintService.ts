import api from "./api";
import type { Sprint } from "../types/sprint";

export const getSprints = async (projectId: string): Promise<Sprint[]> => {
    const res = await api.get(`/sprints/project/${projectId}`);
    return res.data.data;
};

export const getSprint = async (sprintId: string): Promise<Sprint[]> => {
    const res = await api.get(`/sprints/details/${sprintId}`);
    return res.data.data;
}

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

export const deleteSprint = async (sprintId: string) => {
    const res = await api.delete(`/sprints/${sprintId}`);
    return res.data;
};