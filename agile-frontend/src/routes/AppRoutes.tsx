import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import DashBoardPage from '../pages/dashboard/DashboardPage';
import ProjectsPage from '../pages/projects/ProjectsPage';

export default function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/register' element={<RegisterPage />} />

            <Route path='/dashboard' element={<DashBoardPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
        </Routes>
        </BrowserRouter>
    );
}