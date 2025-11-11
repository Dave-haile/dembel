// import { Clock } from 'lucide-react';

// const RecentActivities = ({ activities }) => {
//   const getActionColor = (action) => {
//     switch (action) {
//       case 'created':
//         return 'text-green-600 bg-green-50';
//       case 'updated':
//         return 'text-blue-600 bg-blue-50';
//       case 'deleted':
//         return 'text-red-600 bg-red-50';
//       default:
//         return 'text-gray-600 bg-gray-50';
//     }
//   };

//   const getActionText = (action) => {
//     switch (action) {
//       case 'created':
//         return 'Created';
//       case 'updated':
//         return 'Updated';
//       case 'deleted':
//         return 'Deleted';
//       default:
//         return action;
//     }
//   };

//   const formatTime = (ts) => {
//     if (!ts) return '';
//     const d = new Date(ts);
//     if (Number.isNaN(d.getTime())) return String(ts);
//     const diff = Math.floor((Date.now() - d.getTime()) / 1000);
//     if (diff < 60) return `${diff}s ago`;
//     if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//     if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//     return d.toLocaleString();
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-sm border border-gray-100">
//       <div className="p-4 border-b">
//         <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//           <Clock className="w-5 h-5" />
//           Recent Activities
//         </h3>
//       </div>
//       <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
//         {activities.length > 0 ? (
//           activities.map((activity) => (
//             <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
//               <div className="flex items-start gap-3">
//                 <span
//                   className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(
//                     activity.action
//                   )}`}
//                 >
//                   {getActionText(activity.action)}
//                 </span>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-gray-800">
//                     <span className="font-medium">{activity.user?.name || 'System'}</span>{' '}
//                     {activity.action} {activity.subject_type}{' '}
//                     {activity.subject_id != null && (
//                       <span className="font-medium">#{activity.subject_id}</span>
//                     )}
//                   </p>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {formatTime(activity.created_at)}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="p-8 text-center text-gray-500">
//             No recent activities
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecentActivities;
import { useEffect, useState } from "react";
import { UserPlus, Edit, Trash2, Image, Clock, Building, FileText, User as UserIcon } from "lucide-react";

const ActivityFeed = ({ activities = [], subjectType, onViewMore }) => {
  const [list, setList] = useState(activities || []);
  const [loading, setLoading] = useState(false);
  const [perPage, setPerPage] = useState(null); // null means using initial props

  useEffect(() => {
    // Only update the list if we're not using server-side pagination
    // and the activities array has changed
    if (!perPage && JSON.stringify(activities) !== JSON.stringify(list)) {
      setList(activities || []);
    }
  }, [activities, perPage, list]);

  const fetchActivities = async (size, subjectType) => {
    try {
      setLoading(true);
      setPerPage(size);
      const url = window.route('admin.activity.index', {
        per_page: size === 'all' ? 'all' : String(size),
        subject: subjectType || undefined,
      });
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // endpoint returns Laravel paginator when not 'all'
      const items = Array.isArray(data) ? data : (data.data || []);
      setList(items);
    } catch (e) {
      console.error('Failed to load activities:', e);
    } finally {
      setLoading(false);
    }
  };
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
          title={String(val)}
        >
          View image ({file})
        </a>
      );
    }
    if (typeof val === "object") return <code className="text-xs text-gray-600">{JSON.stringify(val)}</code>;
    return <span className="text-gray-700">{String(val)}</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Recent Activity Regarding {subjectType}</h3>
          <button
            type="button"
            onClick={onViewMore}
            className="px-4 md:px-5 py-2 md:py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-semibold transition-colors shadow-sm hover:shadow"
            aria-label="View more activities"
          >
            View More
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gray-500">Show:</span>
          {[10,20,100].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => fetchActivities(n, subjectType)}
              className={`px-3 py-1.5 rounded border ${perPage===n? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
              disabled={loading && perPage===n}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => fetchActivities('all', subjectType)}
            className={`px-3 py-1.5 rounded border ${perPage==='all'? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'}`}
            disabled={loading && perPage==='all'}
          >
            Load all
          </button>
          {loading && <span className="text-gray-500">Loading...</span>}
        </div>
      </div>
      <div className="divide-y divide-gray-100 min-h-[40vh] max-h-[75vh] md:max-h-[80vh] overflow-y-auto">
        {list && list.length > 0 ? (
          list.map((a) => {
            const subject = a.subject_type || "Item";
            const actor = a.user?.name || "System";
            const subjectId = a.subject_id != null ? `#${a.subject_id}` : "";
            const hasChanges = !!a.changes && typeof a.changes === "object";
            const before = hasChanges ? a.changes.before || {} : {};
            const after = hasChanges ? a.changes.after || {} : {};
            const fields = hasChanges ? Array.from(new Set([...Object.keys(before), ...Object.keys(after)])) : [];
            return (
              <div key={a.id} className="p-5 md:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${bubbleColor(a.action)}`}>
                    {iconFor(a.action, subject)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm md:text-base text-gray-800 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <UserIcon size={14} className="text-gray-500" />
                        {actor}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="capitalize">{(a.action || '').toLowerCase()}</span>
                      <span className="text-gray-400">•</span>
                      <span className="truncate">{subject}{subjectId ? ` ${subjectId}` : ""}</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 mt-1">
                      {a.description || `${actor} ${(a.action || '').toLowerCase()} ${subject}${subjectId ? ` ${subjectId}` : ''}`}
                    </p>
                    <div className="flex items-center gap-1 text-xs md:text-sm text-gray-500 mt-1">
                      <Clock size={12} />
                      <span>{formatTime(a.created_at)}</span>
                    </div>

                    {hasChanges && fields.length > 0 && (
                      <details className="mt-3 bg-gray-50 rounded-md p-3 md:p-4 group">
                        <summary className="cursor-pointer text-xs md:text-sm text-gray-600 font-medium select-none">
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