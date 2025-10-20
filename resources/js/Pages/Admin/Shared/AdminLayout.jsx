import React from "react";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/Topbar";

const AdminLayout = ({
  setSidebarOpen,
  currentPage,
  sidebarOpen,
  setCurrentPage,
  children, // Fix the typo here
}) => {
  return (
    <div
      className={`min-h-screen bg-gray-100 transition-all duration-300 ${
        sidebarOpen ? "lg:ml-64" : "lg:ml-20"
      }`}
    >
      <Sidebar
        isOpen={sidebarOpen}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <main>{children}</main>
      <footer className="bg-white border-t border-gray-200 py-6 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
          <p>&copy; 2025 Dembel Mall Admin. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Help
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
