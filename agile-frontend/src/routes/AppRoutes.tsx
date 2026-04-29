import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ProjectsPage from "../pages/projects/ProjectsPage";
import ProjectDetailsPage from "../pages/projects/ProjectDetailsPage";
import SprintsPage from "../pages/sprints/SprintsPage";
import FeaturesPage from "../pages/features/FeaturesPage";
import TasksPage from "../pages/tasks/TasksPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";
import MainLayout from "../components/layout/MainLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔐 Protected */}
        <Route element={<ProtectedRoute />}>
          
          {/* Layout wrapper */}
          <Route element={<MainLayout />}>

            {/* Dashboard */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Role-based routes */}
            <Route element={<RoleProtectedRoute allowedRoles={["Admin", "ProjectManager", "Developer"]} />}>
              <Route path="/projects" element={<ProjectsPage />} />
            </Route>

            {/* Other routes */}
            <Route path="/projects/:projectId" element={<ProjectDetailsPage />} />
            <Route path="/projects/:projectId/sprints" element={<SprintsPage />} />
            <Route path="/projects/:projectId/sprints/:sprintId/features" element={<FeaturesPage />} />
            <Route path="/projects/:projectId/sprints/:sprintId/features/:featureId/tasks" element={<TasksPage />} />

          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}