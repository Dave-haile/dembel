// import React from 'react';
// import { Building, Clock1, Currency, MapIcon } from 'lucide-react';

// const JobCard = ({ job, onClick }) => {
//   return (
//     <div
//       className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
//       onClick={onClick}
//     >
//       {job.thumbnail && (
//         <div className="h-40 overflow-hidden">
//           <img
//             src={job.thumbnail}
//             alt={job.title}
//             className="w-full h-full object-cover"
//           />
//         </div>
//       )}
//       <div className="p-6">
//         <h3 className="text-xl font-bold text-gray-900 mb-2">
//           {job.title}
//         </h3>
//         <div className="space-y-3">
//           <div className="flex items-center text-gray-600">
//             <Building className="w-4 h-4 mr-2" />
//             <span>{job.department}</span>
//           </div>
//           <div className="flex items-center text-gray-600">
//             <Clock1 className="w-4 h-4 mr-2" />
//             <span>{job.employment_type}</span>
//           </div>
//           <div className="flex items-center text-gray-600">
//             <MapIcon className="w-4 h-4 mr-2" />
//             <span>{job.work_location}</span>
//           </div>
//           <div className="flex items-center text-gray-600">
//             <Currency className="w-4 h-4 mr-2" />
//             <span>
//               {job.currency} {job.salary_min.toLocaleString()} – {job.salary_max.toLocaleString()} / month
//             </span>
//           </div>
//         </div>
//           <button className="mt-4 w-full py-2 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors">
//           Apply Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobCard;
import React from 'react';
import { Building2, Clock, Banknote, MapPin, ArrowRight } from 'lucide-react';

const JobCard = ({ job, onClick }) => {
  return (
    <div
      className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-gold-300 hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        {job.thumbnail ? (
          <img
            src={job.thumbnail}
            alt={job.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
           <div className="w-full h-full bg-slate-100 flex items-center justify-center">
             <Building2 className="w-12 h-12 text-slate-300" />
           </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
        <div className="absolute bottom-4 left-4 right-4">
             <span className="inline-block bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm mb-2">
                {job.department}
             </span>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-gold-600 transition-colors">
          {job.title}
        </h3>
        
        <div className="space-y-3 mt-2 mb-6 text-sm text-slate-600 flex-grow">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2.5 text-gold-500" />
            <span>{job.employment_type}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2.5 text-gold-500" />
            <span className="truncate">{job.work_location}</span>
          </div>
          <div className="flex items-center font-medium text-slate-900">
            <Banknote className="w-4 h-4 mr-2.5 text-gold-500" />
            <span>
              {job.currency} {job.salary_min.toLocaleString()} – {job.salary_max.toLocaleString()}
            </span>
            <span className="text-slate-400 font-normal ml-1">/ mo</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
                Posted {new Date(job.posted_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center text-gold-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                View Details <ArrowRight className="w-4 h-4 ml-1" />
            </span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;