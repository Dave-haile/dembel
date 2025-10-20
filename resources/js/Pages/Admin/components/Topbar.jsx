import { useState } from "react";
import { Search, Bell, Menu, User, Settings, LogOut } from "lucide-react";
import { useForm, usePage } from "@inertiajs/react";

export default function TopBar({ onMenuClick }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications] = useState(3);
  const { auth } = usePage().props;

  const { post } = useForm();

  const handleLogout = () => {
    // eslint-disable-next-line no-undef
    post(route("logout"));
  };
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={24} className="text-gray-600" />
            {notifications > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {auth?.user
                  ? auth.user.name
                    ? auth.user.name.charAt(0).toUpperCase()
                    : auth.user.email.charAt(0).toUpperCase()
                  : "A"}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-semibold text-gray-900">
                  {auth?.user?.name || "Admin User"}
                </div>
                <div className="text-xs text-gray-500">
                  {auth?.user?.email || "admin@dembelmall.et"}
                </div>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2">
                <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-700 transition-colors">
                  <User size={18} />
                  <span>Profile</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-gray-700 transition-colors">
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
