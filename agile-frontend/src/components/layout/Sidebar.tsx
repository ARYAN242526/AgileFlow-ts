import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  // Extract IDs dynamically
  const projectMatch = location.pathname.match("/projects/([^/]+)");
  const sprintMatch = location.pathname.match("/sprints/([^/]+)");
  const featureMatch = location.pathname.match("/features/([^/]+)");

  const projectId = projectMatch?.[1];
  const sprintId = sprintMatch?.[1];
  const featureId = featureMatch?.[1];

  const baseClass =
    "p-2 rounded-md text-sm font-medium transition";

  const getClass = (isActive: boolean, disabled?: boolean) => {
    if (disabled) return `${baseClass} opacity-50 cursor-not-allowed`;
    return `${baseClass} ${
      isActive
        ? "bg-slate-700 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`;
  };

  return (
    <div className="w-60 bg-slate-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">AgileFlow</h1>

      <nav className="flex flex-col gap-2 flex-1">

        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) => getClass(isActive)}
        >
          📊 Dashboard
        </NavLink>

        {/* Projects */}
        <NavLink
          to="/projects"
          className={({ isActive }) => getClass(isActive)}
        >
          📁 Projects
        </NavLink>

        {/* Sprints */}
        <NavLink
          to={projectId ? `/projects/${projectId}/sprints` : ""}
          onClick={(e) => !projectId && e.preventDefault()}
          className={({ isActive }) =>
            getClass(isActive, !projectId)
          }
        >
          🏃 Sprints
        </NavLink>

        {/* Features */}
        <NavLink
          to={
            projectId && sprintId
              ? `/projects/${projectId}/sprints/${sprintId}/features`
              : ""
          }
          onClick={(e) =>
            !(projectId && sprintId) && e.preventDefault()
          }
          className={({ isActive }) =>
            getClass(isActive, !(projectId && sprintId))
          }
        >
          ⚙️ Features
        </NavLink>

        {/* Tasks */}
        <NavLink
          to={
            projectId && sprintId && featureId
              ? `/projects/${projectId}/sprints/${sprintId}/features/${featureId}/tasks`
              : ""
          }
          onClick={(e) =>
            !(projectId && sprintId && featureId) &&
            e.preventDefault()
          }
          className={({ isActive }) =>
            getClass(
              isActive,
              !(projectId && sprintId && featureId)
            )
          }
        >
          🧩 Tasks
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-4 p-2 bg-red-500 rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
}