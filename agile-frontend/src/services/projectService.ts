import api from "./api";
import type { Project } from "../types/project";

export const getProjects = async () : Promise<Project[]> => {
    const res = await api.get("/projects");
    return res.data.data;
};

export const addProjectMember = async (projectId: string, email: string) => {
    const res = await api.post(`/projects/${projectId}/members`, { email });
    return res.data;
};

export const updateMemberRole = async (
  projectId: string,
  userId: string,
  role: string
) => {
  return await api.patch(`/projects/${projectId}/members/${userId}`, { role });
};

export const removeMember = async (
  projectId: string,
  userId: string
) => {
  return await api.delete(`/projects/${projectId}/members/${userId}`);
};

export const createProject = async (data: {
    name: string;
    description: string
}) => {
    const res = await api.post("/projects", data);
    return res.data;
};