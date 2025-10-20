import { Link } from "@inertiajs/react";
import {
  LayoutDashboard,
  Users,
  Building,
  Briefcase,
  Bell,
  Wrench,
  Images,
  UserCog,
  FileText,
  FolderOpen,
  Mail,
  Layers,
  Newspaper,
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
  Calendar,
  Grid,
} from "lucide-react";
export default function Sidebar({
  isOpen,
  currentPage,
  onPageChange,
  onToggle,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      link: "/admin",
    },
    { id: "tenants", label: "Tenants", icon: Users, link: "/admin/tenants" },
    {
      id: "free-spaces",
      label: "Free Spaces",
      icon: Building,
      link: "/admin/free-spaces",
    },
    {
      id: "vacancies",
      label: "Vacancies",
      icon: Briefcase,
      link: "/admin/vacancies",
    },
    {
      id: "announcements",
      label: "Announcements",
      icon: Bell,
      link: "/admin/announcements",
    },
    {
      id: "services",
      label: "Services",
      icon: Wrench,
      link: "/admin/services",
    },
    { id: "gallery", label: "Gallery", icon: Images, link: "/admin/gallery" },
    { id: "users", label: "Users", icon: UserCog, link: "/admin/users" },
    {
      id: "applications",
      label: "Applications",
      icon: FileText,
      link: "/admin/applications",
    },
    {
      id: "categories",
      label: "Categories",
      icon: FolderOpen,
      link: "/admin/categories",
    },
    { id: "contacts", label: "Contacts", icon: Mail, link: "/admin/contacts" },
    {
      id: "departments",
      label: "Departments",
      icon: Layers,
      link: "/admin/departments",
    },
    {
      id: "news",
      label: "News & Events",
      icon: Newspaper,
      link: "/admin/news",
    },
    { id: "floors", label: "Floors", icon: Grid, link: "/admin/floors" },
    { id: "slides", label: "Slides", icon: Calendar, link: "/admin/slides" },
    { id: "team", label: "Team", icon: Users, link: "/admin/team" },
    { id: "malls", label: "Malls", icon: Store, link: "/admin/malls" },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      link: "/admin/settings",
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onToggle}
      />

      <aside
        className={`fixed left-0 top-0 bottom-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-50 transition-all duration-300 ${
          isOpen ? "w-64" : "w-0 lg:w-20"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            {isOpen && (
              <div className="flex items-center space-x-2">
                <Store className="text-blue-400" size={32} />
                <span className="text-xl font-bold">Mall Admin</span>
              </div>
            )}
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors ml-auto"
            >
              {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <Link
                  href={item.link}
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {isOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
