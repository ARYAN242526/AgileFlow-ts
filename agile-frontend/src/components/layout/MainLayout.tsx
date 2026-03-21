import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ 
    children,
}: { children: React.ReactNode}) {
    return (
    <div className="flex h-screen bg-slate-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Right Section */}
        <div className="flex-1 flex flex-col">
            {/* Navbar */}
            <Navbar />

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
            {children}
        </main>
        </div>
    </div>
    );
}