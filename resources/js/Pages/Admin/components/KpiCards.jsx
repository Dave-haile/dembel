import {
  Users,
  Building,
  Briefcase,
  Wrench,
  Bell,
  Images,
  FileText,
  Store,
  TrendingUp,
  TrendingDown,
  Database,
  User,
  Mail,
  Calendar,
  MapPin,
  Camera,
  Star,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";

function KPICard({ title, value, icon, change, description, color }) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
        <div
          className={`flex items-center space-x-1 ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span className="font-semibold">{Math.abs(change)}%</span>
        </div>
      </div>

      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

export default function KPICards({ tables = [], counts = {} }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCardLimit = 6; // Show 6 cards initially
  // Icon mapping for different table types
  const getTableIcon = (tableName) => {
    const iconMap = {
      users: <User size={24} className="text-blue-600" />,
      tenants: <Users size={24} className="text-blue-600" />,
      applications: <FileText size={24} className="text-yellow-600" />,
      categories: <Database size={24} className="text-gray-600" />,
      clients: <User size={24} className="text-green-600" />,
      contacts: <Mail size={24} className="text-purple-600" />,
      departments: <Building size={24} className="text-orange-600" />,
      events: <Calendar size={24} className="text-pink-600" />,
      floors: <MapPin size={24} className="text-indigo-600" />,
      galleries: <Camera size={24} className="text-teal-600" />,
      news: <Bell size={24} className="text-red-600" />,
      services: <Wrench size={24} className="text-orange-600" />,
      sliders: <Images size={24} className="text-purple-600" />,
      teams: <Users size={24} className="text-blue-600" />,
      testimonials: <Star size={24} className="text-yellow-600" />,
      vacancy: <Briefcase size={24} className="text-green-600" />,
      free_spaces: <Building size={24} className="text-cyan-600" />,
      malls: <Store size={24} className="text-teal-600" />,
    };

    return (
      iconMap[tableName.toLowerCase()] || (
        <Database size={24} className="text-gray-600" />
      )
    );
  };

  // Color mapping for different table types
  const getTableColor = (tableName) => {
    const colorMap = {
      users: "bg-blue-100",
      tenants: "bg-blue-100",
      applications: "bg-yellow-100",
      categories: "bg-gray-100",
      clients: "bg-green-100",
      contacts: "bg-purple-100",
      departments: "bg-orange-100",
      events: "bg-pink-100",
      floors: "bg-indigo-100",
      galleries: "bg-teal-100",
      news: "bg-red-100",
      services: "bg-orange-100",
      sliders: "bg-purple-100",
      teams: "bg-blue-100",
      testimonials: "bg-yellow-100",
      vacancy: "bg-green-100",
      free_spaces: "bg-cyan-100",
      malls: "bg-teal-100",
    };

    return colorMap[tableName.toLowerCase()] || "bg-gray-100";
  };

  // Get count for a table from the counts data
  const getTableCount = (tableName) => {
    const countMap = {
      users: counts.users || 0,
      tenants: counts.tenants || 0,
      applications: counts.applications || 0,
      categories: counts.categories || 0,
      clients: counts.clients || 0,
      contacts: counts.contacts || 0,
      departments: counts.departments || 0,
      events: counts.events || 0,
      floors: counts.floors || 0,
      galleries: counts.gallery || 0, // Note: controller uses 'gallery' not 'galleries'
      news: counts.news || 0,
      services: counts.services || 0,
      sliders: counts.slides || 0, // Note: controller uses 'slides' not 'sliders'
      teams: counts.team || 0, // Note: controller uses 'team' not 'teams'
      testimonials: counts.testimonials || 0,
      vacancies: counts.vacancies || 0,
      free_spaces: counts.free_spaces || 0,
      malls: counts.malls || 0,
    };

    return countMap[tableName.toLowerCase()] || 0;
  };

  // Generate KPI cards from tables data
  const kpis = tables.map((table) => {
    const tableName = table.name || table;
    const count = getTableCount(tableName);

    return {
      title:
        tableName.charAt(0).toUpperCase() +
        tableName.slice(1).replace("_", " "),
      value: count,
      icon: getTableIcon(tableName),
      change: Math.floor(Math.random() * 20) - 10, // Random change for demo (you can implement real change calculation later)
      description: `Total ${tableName} records`,
      color: getTableColor(tableName),
    };
  });

  // Determine which cards to show
  const visibleKpis = isExpanded ? kpis : kpis.slice(0, initialCardLimit);
  const hasMoreCards = kpis.length > initialCardLimit;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleKpis.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {hasMoreCards && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-gray-50"
          >
            <span className="text-gray-700 font-medium">
              {isExpanded
                ? "Show Less"
                : `Show All (${kpis.length - initialCardLimit} more)`}
            </span>
            {isExpanded ? (
              <ChevronUp size={20} className="text-gray-600" />
            ) : (
              <ChevronDown size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
