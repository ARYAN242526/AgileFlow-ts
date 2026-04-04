import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const {logout} = useAuth();
  const location = useLocation();

  // extract projectId from URL instead of localStorage
  const match = location.pathname.match("/projects\/([^/]+)");
  const projectId = match ? match[1] : null;

  const linkClass = "p-2 rounded-md text-sm font-medium transition-colors";
  const activeClass = "bg-slate-700 text-white";
  const inactiveClass = "text-slate-300 hover:bg-slate-800";
  const disabledClass = "opacity-50 cursor-not-allowed text-slate-500";

  // custom active matcher
  const isActivePath = (path: string) => {
    return location.pathname.includes(path);
  }

  return (
    <div className="w-60 bg-slate-900 text-white flex flex-col p-4">

      {/* Logo */}
      <h1 className="text-xl font-bold mb-6">AgileFlow</h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
        to="/dashboard"
        end
        className={({ isActive}) => 
          `${linkClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        DashBoard
        </NavLink>

      <NavLink
          to="/projects"
          end
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Projects
        </NavLink>

        <NavLink
          to={projectId ? `/projects/${projectId}/sprints` : "#"}
          onClick={(e) => !projectId && e.preventDefault()}
          className={() =>
            `${linkClass} ${
              !projectId
                ? disabledClass
                : isActivePath("/sprints")
                ? activeClass
                : inactiveClass
             }`
          }
        >
          Sprints
        </NavLink>

        <NavLink
        to={projectId ? `/projects/${projectId}/features` : "#"}
        onClick={(e) => !projectId && e.preventDefault()}
        className={() => 
          `${linkClass} ${
            !projectId
              ? disabledClass
              : isActivePath("/features")
              ? activeClass
              : inactiveClass
           }`
        }
        >
          Features
        </NavLink>

         <NavLink
          to={projectId ? `/projects/${projectId}/tasks` : "#"}
          onClick={(e) => !projectId && e.preventDefault()}
          className={() =>
            `${linkClass} ${
              !projectId
                ? disabledClass
                : isActivePath("/tasks")
                ? activeClass
                : inactiveClass
              }`
          }
        >
          Tasks
        </NavLink>
      </nav>

      {/* Logout */}
      <button
      onClick={logout}
      className="mt-4 p-2 bg-red-500 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}

