import api from "./api";
import type { Project } from "../types/project";
import { Role } from "../constants/roles";

export const getProjects = async () : Promise<Project[]> => {
    const res = await api.get("/projects");
    return res.data.data;
};

export const addProjectMember = async (
  projectId: string,
  email: string,
  role: Role
) => {
    const res = await api.post(`/projects/${projectId}/members`, { 
      email,
      role,
    });
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

export const updateProject = async (
  projectId: string,
  data: {name: string, description?: string}
): Promise<Project> => {
  const res = await api.patch(`/projects/${projectId}`, data);
  return res.data.data;
}

export const createProject = async (data: {
    name: string;
    description: string
}) => {
    const res = await api.post("/projects", data);
    return res.data;
};