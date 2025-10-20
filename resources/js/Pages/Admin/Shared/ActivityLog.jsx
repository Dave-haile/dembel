import React from "react";

const ActivityLog = ({ activities }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mt-6">
      <h3 className="font-semibold mb-3">Recent Activity</h3>
      <ul className="space-y-2">
        {activities.length > 0 ? (
          activities.map((log) => (
            <li
              key={log.id}
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              <span className="font-medium">{log.user}</span>{" "}
              {log.action.toLowerCase()}{" "}
              <span className="font-medium">{log.entity}</span>: {log.item} •{" "}
              {new Date(log.timestamp).toLocaleString()}
            </li>
          ))
        ) : (
          <li className="text-gray-500">No recent activity</li>
        )}
      </ul>
    </div>
  );
};

export default ActivityLog;
