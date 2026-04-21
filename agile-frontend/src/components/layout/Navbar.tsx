import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white border-b flex items-center justify-end px-6">

      {/* User Avatar + Hover Info */}
      <div className="relative group cursor-pointer">
        
        {/* Avatar */}
        <img
          src={
            user?.avatar ||
            `https://ui-avatars.com/api/?name=${user?.email || "User"}`
          }
          alt="user"
          className="w-9 h-9 rounded-full border shadow-sm"
        />

        {/* Hover Card */}
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-3 
                        opacity-0 group-hover:opacity-100 transition duration-200 z-50">

          <p className="text-sm font-medium text-gray-800 truncate">
            {user?.email || "User"}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            {user?.role || "Member"}
          </p>

        </div>
      </div>
    </div>
  );
}