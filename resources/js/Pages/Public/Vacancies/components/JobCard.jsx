import React from 'react';
import { Building, Clock1, Currency, MapIcon } from 'lucide-react';

const JobCard = ({ job, onClick }) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      {job.thumbnail && (
        <div className="h-40 overflow-hidden">
          <img
            src={job.thumbnail}
            alt={job.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {job.title}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Building className="w-4 h-4 mr-2" />
            <span>{job.department}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock1 className="w-4 h-4 mr-2" />
            <span>{job.employment_type}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapIcon className="w-4 h-4 mr-2" />
            <span>{job.work_location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Currency className="w-4 h-4 mr-2" />
            <span>
              {job.currency} {job.salary_min.toLocaleString()} – {job.salary_max.toLocaleString()} / month
            </span>
          </div>
        </div>
          <button className="mt-4 w-full py-2 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
