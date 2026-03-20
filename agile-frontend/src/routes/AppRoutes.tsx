import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashBoardPage from '../pages/dashboard/DashboardPage';
import ProjectsPage from '../pages/projects/ProjectsPage';

import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';


export default function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
            {/*  Public  */}
            <Route path='/' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage />} />

            {/* Protected */}
            <Route 
            path='/dashboard'
            element={
            <ProtectedRoute>
                <DashBoardPage />
            </ProtectedRoute>
            }
            />

            {/* Role- based */}
            <Route 
            path='/projects' 
            element={
            <RoleProtectedRoute allowedRoles={["Admin" , "ProjectManager"]}>
                <ProjectsPage />
            </RoleProtectedRoute>
            }
            />
        </Routes>
        </BrowserRouter>
    );
}