import {
  UserPlus,
  Building,
  FileText,
  Edit,
  Trash2,
  Image,
  Clock,
} from "lucide-react";

export default function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "create",
      icon: <UserPlus size={18} />,
      title: "New tenant added",
      description: "Zara Fashion Store has been added to unit A-101",
      time: "5 minutes ago",
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "update",
      icon: <Edit size={18} />,
      title: "Free space updated",
      description: "Office Space A1 details have been modified",
      time: "15 minutes ago",
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      type: "create",
      icon: <FileText size={18} />,
      title: "New job application",
      description: "Application received for Security Officer position",
      time: "1 hour ago",
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      type: "create",
      icon: <Image size={18} />,
      title: "Gallery updated",
      description: "5 new images uploaded to mall gallery",
      time: "2 hours ago",
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: 5,
      type: "delete",
      icon: <Trash2 size={18} />,
      title: "Announcement deleted",
      description: "Weekend Sale announcement has been removed",
      time: "3 hours ago",
      color: "bg-red-100 text-red-600",
    },
    {
      id: 6,
      type: "update",
      icon: <Building size={18} />,
      title: "Tenant status changed",
      description: "BookWorld status updated to Pending",
      time: "5 hours ago",
      color: "bg-yellow-100 text-yellow-600",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">
                {activity.title}
              </h4>
              <p className="text-xs text-gray-600 mb-1">
                {activity.description}
              </p>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock size={12} />
                <span>{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
