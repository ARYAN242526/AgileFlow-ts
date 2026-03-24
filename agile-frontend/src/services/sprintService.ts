import api from "./api";
import type { Sprint } from "../types/sprint";

export const getSprints = async (): Promise<Sprint[]> => {
    const res = await api.get("/sprints");
    return res.data.data;
};

export const createSprint = async (data: {
    name: string;
    startDate: string;
    endDate: string;
    projectId: string;
}) => {
    const res = await api.post("/sprints", data);
    return res.data;
}