import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const {logout} = useAuth();
  const location = useLocation();

  // extract projectId from URL instead of localStorage
  const match = location.pathname.match("/projects\/([^/]+)");
  const projectId = match ? match[1] : null;

  const linkClass = "p-2 rounded-md text-sm font-medium";
  const activeClass = "bg-slate-700 text-white";
  const inactiveClass = "text-slate-300 hover:bg-slate-800";
  const disabledClass = "opacity-50 cursor-not-allowed text-slate-500";

  return (
    <div className="w-60 bg-slate-900 text-white flex flex-col p-4">
      <h1 className="text-xl font-bold mb-6">AgileFlow</h1>

      <nav className="flex flex-col gap-2 flex-1">
        <NavLink 
        to="/dashboard" 
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : inactiveClass}`
        }>
          Dashboard
        </NavLink>

        <NavLink 
        to="/projects" 
        className={({ isActive }) =>
          `${linkClass} ${isActive ? activeClass : inactiveClass}`
        }>
          Projects
        </NavLink>

        <NavLink
          to={projectId ? `/projects/${projectId}/sprints` : "#"}
          className={() =>
            `${linkClass} ${
              projectId ? activeClass : disabledClass
            }`
          }
        >
          Sprints
        </NavLink>

        <NavLink
          to={projectId ? `/projects/${projectId}/features` : "#"}
          className={() =>
            `${linkClass} ${
              projectId ? activeClass : disabledClass
            }`
          }
        >
          Features
        </NavLink>

        <NavLink
          to={projectId ? `/projects/${projectId}/tasks` : "#"}
          className={() =>
            `${linkClass} ${
              projectId ? activeClass : disabledClass
            }`
          }
        >
          Tasks
        </NavLink>
      </nav>

      <button
        onClick={logout}
        className="mt-4 p-2 bg-red-500 rounded-md"
      >
        Logout
      </button>
    </div>
  );

  
}

