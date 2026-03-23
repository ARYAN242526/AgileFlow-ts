import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const {logout} = useAuth();

  const linkClass = "p-2 rounded-md text-sm font-medium transition-colors";

  const activeClass = "bg-slate-700 text-white";
  const inactiveClass = "text-slate-300 hover:bg-slate-800";


  return (
    <div className="w-60 bg-slate-900 text-white flex flex-col p-4">

      {/* Logo */}
      <h1 className="text-xl font-bold mb-6">AgileFlow</h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <NavLink
        to="/dashboard"
        className={({ isActive}) => 
          `${linkClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        DashBoard
        </NavLink>

      <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Projects
        </NavLink>

        <NavLink
        to="/features"
        className={({ isActive }) => 
          `${linkClass} ${isActive ? activeClass: inactiveClass}`
        }
        >
          Features
        </NavLink>

         <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          Tasks
        </NavLink>
      </nav>

      {/* Logout */}
      <button
      className="mt-4 p-2 bg-red-500 rounded-md hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )
}

