import api from "./api";

export const getUsers = async () => {
    const res = await api.get("/users");
    return res.data.data;
};

export const searchUsers = async (query: string, projectId: string) => {
    const res = await api.get(`/users?search=${query}%projectId=${projectId}`);
    return res.data.data; 
} 