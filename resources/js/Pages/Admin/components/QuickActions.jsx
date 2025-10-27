// import { useState } from "react";
// import {
//   X,
//   Users,
//   Building,
//   Briefcase,
//   Bell,
//   Images,
//   Wrench,
// } from "lucide-react";

// export default function QuickActions() {
//   const [showModal, setShowModal] = useState(false);
//   const [modalType, setModalType] = useState("");

//   const actions = [
//     {
//       id: "tenant",
//       label: "Add Tenant",
//       icon: Users,
//       color: "from-blue-600 to-blue-400",
//     },
//     {
//       id: "space",
//       label: "Add Free Space",
//       icon: Building,
//       color: "from-green-600 to-green-400",
//     },
//     {
//       id: "vacancy",
//       label: "Post Vacancy",
//       icon: Briefcase,
//       color: "from-purple-600 to-purple-400",
//     },
//     {
//       id: "announcement",
//       label: "Post Announcement",
//       icon: Bell,
//       color: "from-pink-600 to-pink-400",
//     },
//     {
//       id: "service",
//       label: "Add Service",
//       icon: Wrench,
//       color: "from-orange-600 to-orange-400",
//     },
//     {
//       id: "image",
//       label: "Upload Image",
//       icon: Images,
//       color: "from-indigo-600 to-indigo-400",
//     },
//   ];

//   const handleAction = (actionId) => {
//     setModalType(actionId);
//     setShowModal(true);
//   };

//   return (
//     <>
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//           {actions.map((action) => {
//             const Icon = action.icon;
//             return (
//               <button
//                 key={action.id}
//                 onClick={() => handleAction(action.id)}
//                 className={`flex flex-col items-center justify-center p-4 rounded-lg bg-gradient-to-br ${action.color} text-white hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl`}
//               >
//                 <Icon size={28} className="mb-2" />
//                 <span className="text-xs font-semibold text-center">
//                   {action.label}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
//           <div className="bg-white rounded-xl max-w-md w-full p-6 animate-scale-in">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold text-gray-900">
//                 {actions.find((a) => a.id === modalType)?.label}
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter title..."
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Description
//                 </label>
//                 <textarea
//                   placeholder="Enter description..."
//                   rows={4}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                 />
//               </div>

//               <div className="flex space-x-3">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => {
//                     setShowModal(false);
//                   }}
//                   className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all"
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { Plus } from 'lucide-react';

const QuickActions = ({ actions }) => {
  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    green: 'bg-green-600 hover:bg-green-700',
    orange: 'bg-orange-600 hover:bg-orange-700',
    purple: 'bg-purple-600 hover:bg-purple-700',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg
              text-white font-medium text-sm transition-all duration-200
              hover:shadow-md transform hover:-translate-y-0.5
              ${colorClasses[action.color]}
            `}
          >
            <Plus className="w-4 h-4" />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
