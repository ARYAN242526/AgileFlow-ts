import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    const {user} = useAuth();

    return (
        <div className="h-16 bg-white border-b flex items-center justify-between px-6">
        
        {/* Search */}
        <input
        type="text"
        placeholder="Search..."
        className="bg-gray-100 px-4 py-2 rounded-md outline-none w-64"
        />

        {/* Right Side */}
        <div className="flex items-center gap-4">
            {/* Notification */}
        <span className="text-xl cursor-pointer">🔔</span>

        {/* User */}
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span className="text-sm font-medium">
                {user?.email || "User"}
            </span>
        </div>
    </div>
</div>
    );
}