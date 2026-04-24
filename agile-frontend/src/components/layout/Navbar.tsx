import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    console.log("before:", theme);
    toggleTheme();
  } 

  return (
    <div className="h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-700 
                    flex items-center justify-end px-6">

      <div className="flex items-center gap-4">

        {/* 🌙 Theme Toggle */}
        <button
          onClick={handleToggleTheme}
          className="text-xl bg-gray-100 dark:bg-gray-800 p-2 rounded-full 
                     hover:scale-105 transition"
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>

        {/* 👤 User Avatar */}
        <div className="relative group cursor-pointer">
          
          <img
            src={
              user?.avatar ||
              `https://ui-avatars.com/api/?name=${user?.email || "User"}`
            }
            alt="user"
            className="w-9 h-9 rounded-full border shadow-sm"
          />

          {/* Hover Card */}
          <div className="absolute right-0 mt-3 w-64 
                          bg-white dark:bg-gray-800 
                          border dark:border-gray-700 
                          rounded-xl shadow-lg p-4 
                          opacity-0 invisible group-hover:visible group-hover:opacity-100 
                          transition-all duration-200 z-50">

            <div className="flex items-center gap-3">
              <img
                src={
                  user?.avatar ||
                  `https://ui-avatars.com/api/?name=${user?.email || "User"}`
                }
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white break-words">
                  {user?.email || "User"}
                </p>

                <p className="text-xs text-gray-400">
                  {user?.role || "Member"}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}