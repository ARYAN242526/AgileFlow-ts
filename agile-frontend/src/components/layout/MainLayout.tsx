import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
    <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <Navbar />

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
            <Outlet />
            </div>
        </div>
    </div>
    );
}