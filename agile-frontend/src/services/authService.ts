import api from "./api";

export const loginUser = async(data: {
    email: string;
    password: string;
}) => {
    const response = await api.post("/auth/login", data);
    return response.data;
}