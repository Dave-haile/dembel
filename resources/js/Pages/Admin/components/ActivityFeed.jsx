// import { UserPlus, Edit, Trash2, Image, Clock, Building, FileText } from "lucide-react";

// export default function ActivityFeed({ activities = [] }) {
//   const iconFor = (action, subject) => {
//     const a = (action || "").toLowerCase();
//     const s = (subject || "").toLowerCase();
//     if (a === "created") return <UserPlus size={18} />;
//     if (a === "deleted") return <Trash2 size={18} />;
//     if (a === "updated") return <Edit size={18} />;
//     if (s.includes("slider") || s.includes("image") || s.includes("gallery")) return <Image size={18} />;
//     if (s.includes("tenant") || s.includes("mall")) return <Building size={18} />;
//     return <FileText size={18} />;
//   };

//   const colorFor = (action) => {
//     const a = (action || "").toLowerCase();
//     if (a === "created") return "bg-blue-100 text-blue-600";
//     if (a === "updated") return "bg-green-100 text-green-600";
//     if (a === "deleted") return "bg-red-100 text-red-600";
//     return "bg-gray-100 text-gray-600";
//   };

//   const formatTime = (ts) => {
//     if (!ts) return "";
//     const d = new Date(ts);
//     if (Number.isNaN(d.getTime())) return String(ts);
//     const diff = Math.floor((Date.now() - d.getTime()) / 1000);
//     if (diff < 60) return `${diff}s ago`;
//     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//     return d.toLocaleString();
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-md p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
//         <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">View All</button>
//       </div>

//       <div className="space-y-4">
//         {activities.map((a) => (
//           <div key={a.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
//             <div className={`p-2 rounded-lg ${colorFor(a.action)} flex-shrink-0`}>
//               {iconFor(a.action, a.subject_type)}
//             </div>
//             <div className="flex-1 min-w-0">
//               <h4 className="text-sm font-semibold text-gray-900 mb-1">
//                 {a.description || `${a.action} ${a.subject_type}`}
//               </h4>
//               <p className="text-xs text-gray-600 mb-1">
//                 {a.user?.name ? `By ${a.user.name}` : "System"} • {a.subject_type}#{a.subject_id ?? "-"}
//               </p>
//               <div className="flex items-center space-x-1 text-xs text-gray-500">
//                 <Clock size={12} />
//                 <span>{formatTime(a.created_at)}</span>
//               </div>
//             </div>
//           </div>
//         ))}
import { UserPlus, Edit, Trash2, Image, Clock, Building, FileText, User as UserIcon } from "lucide-react";

const ActivityFeed = ({ activities = [] }) => {
  const iconFor = (action, subject) => {
    const a = (action || "").toLowerCase();
    const s = (subject || "").toLowerCase();
    if (a === "created") return <UserPlus size={18} className="text-blue-600" />;
    if (a === "deleted") return <Trash2 size={18} className="text-red-600" />;
    if (a === "updated") return <Edit size={18} className="text-green-600" />;
    if (s.includes("tenant") || s.includes("mall")) return <Building size={18} className="text-indigo-600" />;
    if (s.includes("image") || s.includes("logo") || s.includes("gallery")) return <Image size={18} className="text-amber-600" />;
    return <FileText size={18} className="text-gray-600" />;
  };

  const bubbleColor = (action) => {
    const a = (action || "").toLowerCase();
    if (a === "created") return "bg-blue-50";
    if (a === "updated") return "bg-green-50";
    if (a === "deleted") return "bg-red-50";
    return "bg-gray-50";
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    if (Number.isNaN(d.getTime())) return String(ts);
    const diff = Math.floor((Date.now() - d.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleString();
  };

  const isImagePath = (val) => {
    if (!val || typeof val !== "string") return false;
    return /(\.(png|jpe?g|gif|webp|svg)$)|(^storage\/.*\.(png|jpe?g|gif|webp|svg)$)/i.test(val);
  };

  const renderValue = (key, val) => {
    if (val === null || val === undefined || val === "") return <span className="text-gray-400">empty</span>;
    if (key.toLowerCase().includes("logo") || isImagePath(val)) {
      const href = `/${val}`;
      const file = typeof val === 'string' ? val.split('/').pop() : 'image';
      return (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-xs"
        >
          <Image size={14} />
          <span className="truncate max-w-[12rem]" title={String(val)}>
            {file}
          </span>
        </a>
      );
    }
    if (typeof val === "object") return <code className="text-xs text-gray-600">{JSON.stringify(val)}</code>;
    return <span className="text-gray-700">{String(val)}</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {activities && activities.length > 0 ? (
          activities.map((a) => {
            const subject = a.subject_type || "Item";
            const actor = a.user?.name || "System";
            const subjectId = a.subject_id != null ? `#${a.subject_id}` : "";
            const hasChanges = !!a.changes && typeof a.changes === "object";
            const before = hasChanges ? a.changes.before || {} : {};
            const after = hasChanges ? a.changes.after || {} : {};
            const fields = hasChanges ? Array.from(new Set([...Object.keys(before), ...Object.keys(after)])) : [];
            return (
              <div key={a.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${bubbleColor(a.action)}`}>
                    {iconFor(a.action, subject)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-gray-800 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <UserIcon size={14} className="text-gray-500" />
                        {actor}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="capitalize">{(a.action || '').toLowerCase()}</span>
                      <span className="text-gray-400">•</span>
                      <span className="truncate">{subject}{subjectId ? ` ${subjectId}` : ""}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {a.description || `${actor} ${(a.action || '').toLowerCase()} ${subject}${subjectId ? ` ${subjectId}` : ''}`}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock size={12} />
                      <span>{formatTime(a.created_at)}</span>
                    </div>

                    {hasChanges && fields.length > 0 && (
                      <details className="mt-3 bg-gray-50 rounded-md p-3 group">
                        <summary className="cursor-pointer text-xs text-gray-600 font-medium select-none">
                          View changes ({fields.length})
                        </summary>
                        <div className="mt-2 space-y-3">
                          {fields.map((key) => (
                            <div key={key} className="text-xs">
                              <div className="text-gray-700 font-semibold mb-1">{key}</div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="line-through text-red-600">
                                  {renderValue(key, before[key])}
                                </span>
                                <span className="text-gray-400">→</span>
                                <span className="text-green-700">
                                  {renderValue(key, after[key])}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-6 text-sm text-gray-500">No recent activity.</div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;
