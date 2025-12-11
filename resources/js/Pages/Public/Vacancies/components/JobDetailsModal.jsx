import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, MapPin, Calendar, Users, Briefcase, CheckCircle2 } from 'lucide-react';
import ApplyForm from './ApplyForm';

const JobDetailsModal = ({ job, onClose, onApplicationSubmit, formErrors }) => {
  const [showApplyForm, setShowApplyForm] = useState(false);

  useEffect(() => {
    // Prevent scrolling on the main page when the modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = 'unset';
    };
  }, []);



  if (!job) return null;

  return (
    <div className="fixed top-16 right-0 bottom-0 left-0 z-50 flex justify-end">
        {/* Backdrop - clicking here closes the modal */}
        <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
        />

        {/* Drawer Panel */}
        <div 
            className="relative w-full md:max-w-4xl bg-white h-full shadow-2xl flex flex-col md:flex-row overflow-hidden animate-slide-in-right md:rounded-l-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the drawer from closing it
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white text-slate-500 hover:text-red-500 p-2 rounded-full transition-all shadow-sm backdrop-blur-sm"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Sidebar / Top Image Section */}
            <div className="md:w-1/3 bg-slate-50 border-r border-slate-100 flex flex-col h-auto md:h-full overflow-y-auto">
                <div className="h-48 md:h-64 w-full relative shrink-0">
                    <img
                        src={job.thumbnail}
                        alt={job.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                        <span className="inline-block px-2 py-1 bg-gold-600 rounded text-xs font-bold mb-1 uppercase tracking-wider">
                            {job.department}
                        </span>
                    </div>
                </div>
                
                <div className="p-6 space-y-6 flex-grow">
                    <div>
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Information</h3>
                        <div className="space-y-4">
                            <InfoItem icon={<Briefcase />} label="Type" value={job.employment_type} />
                            <InfoItem icon={<MapPin />} label="Location" value={job.work_location} />
                            <InfoItem icon={<Users />} label="Openings" value={job.number_of_positions.toString()} />
                            <InfoItem 
                                icon={<Calendar />} 
                                label="Closing" 
                                value={new Date(job.closing_date).toLocaleDateString()} 
                                highlight={true}
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Contact HR</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center text-slate-600">
                                <Mail className="w-4 h-4 mr-3 text-gold-500" />
                                <span>{job.contact_email}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                                <Phone className="w-4 h-4 mr-3 text-gold-500" />
                                <span>{job.contact_phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="md:w-2/3 flex flex-col h-full bg-white relative">
                <div className="p-8 overflow-y-auto custom-scrollbar flex-grow pb-24">
                    {showApplyForm ? (
                        <div className="animate-in slide-in-from-right duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Apply for {job.title}</h2>
                                <button 
                                    onClick={() => setShowApplyForm(false)}
                                    className="text-sm text-gold-600 hover:text-gold-700 font-medium underline"
                                >
                                    Back to Job Details
                                </button>
                            </div>
                            <ApplyForm 
                                job={job} 
                                onApplicationSubmit={onApplicationSubmit} // Pass the handler from Vacancies.jsx
                                formErrors={formErrors} // Pass errors down
                                onSuccess={() => {
                                    setShowApplyForm(false);
                                    onClose();
                                }} // This onSuccess will be called by ApplyForm itself to manage local modal state
                            />
                        </div>
                    ) : (
                        <div className="animate-in slide-in-from-left duration-300">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{job.title}</h2>
                            <div className="flex items-center text-gold-600 font-semibold text-xl mb-8">
                                {job.currency} {job.salary_min.toLocaleString()} – {job.salary_max.toLocaleString()}
                                <span className="text-slate-400 text-sm font-normal ml-2">/ month</span>
                            </div>

                            <Section title="Job Description" content={job.job_description} />
                            <Section title="Requirements" content={job.requirements} />
                            <Section title="Benefits" content={job.benefits} />

                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
                                <h3 className="flex items-center text-blue-800 font-semibold mb-2">
                                    <CheckCircle2 className="w-5 h-5 mr-2" />
                                    How to Apply
                                </h3>
                                <p className="text-blue-700 text-sm leading-relaxed">
                                    {job.how_to_apply}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                
                {!showApplyForm && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-100 bg-white/95 backdrop-blur-sm z-10 flex justify-end">
                        <button 
                            onClick={() => setShowApplyForm(true)}
                            className="px-8 py-4 bg-gold-600 hover:bg-gold-700 text-white font-bold rounded-xl shadow-lg hover:shadow-gold-500/30 hover:-translate-y-0.5 transition-all w-full md:w-auto"
                        >
                            Apply Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

// Helper components
const InfoItem = ({ icon, label, value, highlight = false }) => (
  <div className="flex items-start">
    <div className={`p-2 rounded-lg mr-3 ${highlight ? 'bg-red-50 text-red-500' : 'bg-white border border-slate-200 text-slate-500'}`}>
        {React.cloneElement(icon, { size: 16 })}
    </div>
    <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className={`font-semibold ${highlight ? 'text-red-600' : 'text-slate-700'}`}>{value}</p>
    </div>
  </div>
);

const Section = ({ title, content }) => (
  <div className="mb-8">
    <h3 className="text-lg font-bold text-slate-900 mb-3 border-l-4 border-gold-500 pl-3">
      {title}
    </h3>
    <div className="text-slate-600 leading-relaxed space-y-2">
        {content.split(';').map((sentence, i) => (
            <p key={i} className="mb-2">{sentence.trim()}.</p>
        ))}
    </div>
  </div>
);

export default JobDetailsModal;