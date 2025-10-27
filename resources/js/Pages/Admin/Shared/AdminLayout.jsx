
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { useState } from "react";
export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      <div className="flex h-full">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onToggle={() => setSidebarOpen((v) => !v)}
        />
        <div className={`flex-1 flex flex-col min-w-0 h-full ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
          <TopBar onMenuClick={() => setSidebarOpen(true)} sidebarOpen={sidebarOpen} />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
