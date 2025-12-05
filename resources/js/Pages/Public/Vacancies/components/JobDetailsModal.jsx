import React from 'react';
import { X, Mail, Phone, Map } from 'lucide-react';
import { toast } from 'react-toastify';

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  const handleApplyNow = () => {
    toast.info('Coming Soon')
    onClose()
  }

  return (
    <div
     onClick={onClose}
     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            {job.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {job.thumbnail && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={job.thumbnail}
                alt={job.title}
                className="w-full h-64 object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Job Details
              </h3>
              <div className="space-y-3">
                <DetailItem label="Department:" value={job.department} />
                <DetailItem label="Employment:" value={job.employment_type} />
                <DetailItem label="Location:" value={job.work_location} />
                <DetailItem 
                  label="Salary:" 
                  value={`${job.currency} ${job.salary_min.toLocaleString()} – ${job.salary_max.toLocaleString()} / month`} 
                />
                <DetailItem label="Positions:" value={job.number_of_positions} />
                <DetailItem 
                  label="Posted:" 
                  value={new Date(job.posted_date).toLocaleDateString()} 
                />
                <DetailItem 
                  label="Closing:" 
                  value={new Date(job.closing_date).toLocaleDateString()} 
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mt-0.5 mr-2 text-gray-500" />
                  <span>{job.contact_email}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mt-0.5 mr-2 text-gray-500" />
                  <span>{job.contact_phone}</span>
                </div>
                <div className="flex items-start">
                  <Map className="w-5 h-5 mt-0.5 mr-2 text-gray-500" />
                  <span>{job.address}</span>
                </div>
              </div>
            </div>
          </div>

          <Section title="Job Description" content={job.job_description} />
          <Section title="Requirements" content={job.requirements} />
          <Section title="Benefits" content={job.benefits} />

          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              How to Apply
            </h3>
            <p className="text-gray-700 mb-4">
              {job.how_to_apply}
            </p>
            <button 
            onClick={handleApplyNow}
            className="px-6 py-3 bg-accent-700 hover:bg-accent-700 text-white font-medium rounded-lg transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const DetailItem = ({ label, value }) => (
  <div className="flex">
    <span className="font-medium w-32">{label}</span>
    <span>{value}</span>
  </div>
);

const Section = ({ title, content }) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">
      {title}
    </h3>
    <p className="text-gray-700">{content}</p>
  </div>
);

export default JobDetailsModal;
