import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import ProjectsPage from '../pages/projects/ProjectsPage';
import ProjectDetailsPage from '../pages/projects/ProjectDetailsPage';

import ProtectedRoute from './ProtectedRoute';
import RoleProtectedRoute from './RoleProtectedRoute';
import FeaturesPage from '../pages/features/FeaturesPage';
import TasksPage from '../pages/tasks/TasksPage';
import SprintsPage from '../pages/sprints/SprintsPage';


export default function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
            {/*  Public  */}
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage />} />

            {/* Protected */}
            <Route 
            path='/dashboard'
            element={
            <ProtectedRoute>
                <DashboardPage />
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

            <Route  
            path='/projects/:projectId'
            element={
                <ProtectedRoute>
                    <ProjectDetailsPage />
                </ProtectedRoute>
            }
            
            />

            <Route
            path="/projects/:projectId/sprints"
            element={
                <ProtectedRoute>
                    <SprintsPage />
                </ProtectedRoute>
            }
            />

            <Route
            path="/projects/:projectId/sprints/:sprintId/features"
            element={
                <ProtectedRoute>
                    <FeaturesPage />
                </ProtectedRoute>
            }
            />

            <Route
            path="/projects/:projectId/sprints/:sprintId/features/:featureId/tasks"
            element={
                <ProtectedRoute>
                    <TasksPage />
                </ProtectedRoute>
            }
            />
        </Routes>
        </BrowserRouter>
    );
}