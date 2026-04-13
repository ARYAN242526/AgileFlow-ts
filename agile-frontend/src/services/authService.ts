import api from "./api";

export const registerUser = async(data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await api.post("auth/register", data);

    return res.data.data || res.data;
}

export const loginUser = async(data: {
    email: string;
    password: string;
}) => {
    const response = await api.post("/auth/login", data);
    return response.data;
}