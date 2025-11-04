// import { Link } from "@inertiajs/react";
// import {
//   LayoutDashboard,
//   Users,
//   Building,
//   Briefcase,
//   Bell,
//   Wrench,
//   Images,
//   UserCog,
//   FileText,
//   FolderOpen,
//   Mail,
//   Layers,
//   Newspaper,
//   Settings,
//   ChevronLeft,
//   ChevronRight,
//   Store,
//   Calendar,
//   Grid,
// } from "lucide-react";
// export default function Sidebar({
//   isOpen,
//   currentPage,
//   onPageChange,
//   onToggle,
// }) {
//   const menuItems = [
//     {
//       id: "dashboard",
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       link: "/admin",
//     },
//     { id: "tenants", label: "Tenants", icon: Users, link: "/admin/tenants" },
//     {
//       id: "free-spaces",
//       label: "Free Spaces",
//       icon: Building,
//       link: "/admin/free-spaces",
//     },
//     {
//       id: "vacancies",
//       label: "Vacancies",
//       icon: Briefcase,
//       link: "/admin/vacancies",
//     },
//     {
//       id: "announcements",
//       label: "Announcements",
//       icon: Bell,
//       link: "/admin/announcements",
//     },
//     {
//       id: "services",
//       label: "Services",
//       icon: Wrench,
//       link: "/admin/services",
//     },
//     { id: "gallery", label: "Gallery", icon: Images, link: "/admin/gallery" },
//     { id: "users", label: "Users", icon: UserCog, link: "/admin/users" },
//     {
//       id: "applications",
//       label: "Applications",
//       icon: FileText,
//       link: "/admin/applications",
//     },
//     {
//       id: "categories",
//       label: "Categories",
//       icon: FolderOpen,
//       link: "/admin/categories",
//     },
//     { id: "contacts", label: "Contacts", icon: Mail, link: "/admin/contacts" },
//     {
//       id: "departments",
//       label: "Departments",
//       icon: Layers,
//       link: "/admin/departments",
//     },
//     {
//       id: "news",
//       label: "News & Events",
//       icon: Newspaper,
//       link: "/admin/news",
//     },
//     { id: "floors", label: "Floors", icon: Grid, link: "/admin/floors" },
//     { id: "slides", label: "Slides", icon: Calendar, link: "/admin/slides" },
//     { id: "team", label: "Team", icon: Users, link: "/admin/team" },
//     { id: "malls", label: "Malls", icon: Store, link: "/admin/malls" },
//     {
//       id: "settings",
//       label: "Settings",
//       icon: Settings,
//       link: "/admin/settings",
//     },
//   ];

//   return (
//     <>
//       <div
//         className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
//           isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={onToggle}
//       />

//       <aside
//         className={`fixed left-0 top-0 bottom-0 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-50 transition-all duration-300 ${
//           isOpen ? "w-64" : "w-0 lg:w-20"
//         } overflow-hidden`}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex items-center justify-between p-4 border-b border-gray-700">
//             {isOpen && (
//               <div className="flex items-center space-x-2">
//                 <Store className="text-blue-400" size={32} />
//                 <span className="text-xl font-bold">Mall Admin</span>
//               </div>
//             )}
//             <button
//               onClick={onToggle}
//               className="p-2 hover:bg-gray-700 rounded-lg transition-colors ml-auto"
//             >
//               {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
//             </button>
//           </div>

//           <nav className="flex-1 overflow-y-auto py-4 px-2">
//             {menuItems.map((item) => {
//               const Icon = item.icon;
//               const isActive = currentPage === item.id;

//               return (
//                 <Link
//                   href={item.link}
//                   key={item.id}
//                   onClick={() => {
//                     onPageChange(item.id);
//                   }}
//                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
//                     isActive
//                       ? "bg-blue-600 text-white shadow-lg scale-105"
//                       : "text-gray-300 hover:bg-gray-700 hover:text-white"
//                   }`}
//                   title={!isOpen ? item.label : undefined}
//                 >
//                   <Icon size={20} className="flex-shrink-0" />
//                   {isOpen && (
//                     <span className="text-sm font-medium">{item.label}</span>
//                   )}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>
//       </aside>
//     </>
//   );
// }
import { Link } from '@inertiajs/react';
import {
  LayoutDashboard,
  Store,
  MapPin,
  Briefcase,
  Wrench,
  ImageIcon,
  Users,
  FileText,
  Tags,
  Mail,
  Building2,
  Newspaper,
  Calendar,
  Layers,
  Presentation,
  UsersRound,
  Building,
  Settings,
  ChevronLeft,
  Activity,
} from 'lucide-react';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

const Sidebar = ({ isOpen, onClose, onNavigate, onToggle }) => {
  const { url } = usePage();
  // Lock body scroll when the sidebar is open on mobile
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isOpen && isMobile) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, link: '/admin' },
    { id: 'tenants', label: 'Tenants', icon: Store, link: '/admin/tenants' },
    { id: 'free-spaces', label: 'Free Spaces', icon: MapPin, link: '/admin/free-spaces' },
    { id: 'vacancies', label: 'Vacancies', icon: Briefcase, link: '/admin/vacancies' },
    // { id: 'announcements', label: 'Announcements', icon: Megaphone, link: '/admin/announcements' },
    { id: 'services', label: 'Services', icon: Wrench, link: '/admin/services' },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon, link: '/admin/gallery' },
    { id: 'users', label: 'Users', icon: Users, link: '/admin/users' },
    { id: 'slides', label: 'Slides', icon: Presentation, link: '/admin/slides' },
    { id: 'news', label: 'News', icon: Newspaper, link: '/admin/news' },
    { id: 'events', label: 'Events', icon: Calendar, link: '/admin/events' },
    { id: 'applications', label: 'Applications', icon: FileText, link: '/admin/applications' },
    { id: 'categories', label: 'Categories', icon: Tags, link: '/admin/categories' },
    { id: 'contacts', label: 'Contacts', icon: Mail, link: '/admin/contacts' },
    { id: 'departments', label: 'Departments', icon: Building2, link: '/admin/departments' },
    { id: 'floors', label: 'Floors', icon: Layers, link: '/admin/floors' },
    { id: 'teams', label: 'Teams', icon: UsersRound, link: '/admin/teams' },
    { id: 'malls', label: 'Malls', icon: Building, link: '/admin/malls' },
    { id: 'activity-log', label: 'Activity Log', icon: Activity, link: '/admin/activity-log' },
    { id: 'settings', label: 'Settings', icon: Settings, link: '/admin/settings' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-lg z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          w-64 overflow-y-auto
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Mall Admin</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isOpen && <ChevronLeft size={20} />}
            </button>
          </div>
          <nav className="flex-1 py-4 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.link || '#'}
                  onClick={(e) => {
                    if (!item.link) {
                      e.preventDefault();
                      return;
                    }
                    if (typeof onNavigate === 'function') {
                      onNavigate(item.id);
                    }
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 mb-1 rounded-lg
                    transition-all duration-200 hover:bg-gray-50
                    ${url === item.link
                      ? 'bg-blue-50 text-blue-600 shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${url === item.link ? 'text-blue-600' : 'text-gray-500'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-800 mb-1">Need Help?</p>
              <p className="text-xs text-gray-600 mb-3">Contact support team</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors">
                Get Support
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

