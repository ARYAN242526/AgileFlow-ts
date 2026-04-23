import { createContext, useContext, useEffect, useState } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;

}

export const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);

    // load user from localStorage on refresh
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
         if (storedUser && storedUser !== "undefined") {
            try {
            setUser(JSON.parse(storedUser));
            } catch (error) {
            console.error("Invalid user in localStorage");
            localStorage.removeItem("user");
            }
        }
    }, []);

    const login = (token: string, user: User) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};