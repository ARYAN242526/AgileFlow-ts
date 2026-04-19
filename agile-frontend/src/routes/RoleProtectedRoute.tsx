import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function RoleProtectedRoute({
    allowedRoles,
}: {
    allowedRoles: string[];
}) {
    const {user} = useAuth();

    if(!user) {
        return <Navigate to="/login" replace />;
    }

    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet/>;
}