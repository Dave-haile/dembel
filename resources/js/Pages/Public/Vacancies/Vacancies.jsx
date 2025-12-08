import React, { useState, useEffect, useCallback } from "react";
import Hero from "./components/Hero";
import JobFilters from "./components/JobFilters";
import JobCard from "./components/JobCard";
import JobDetailsModal from "./components/JobDetailsModal";
import TalentPoolCTA from "./components/TalentPoolCTA";
import { Head, router, useForm, usePage } from "@inertiajs/react";
import MainLayout from "../Shared/MainLayout";
import Toast from "@/Pages/Admin/components/Toast";

const Vacancies = () => {
  const { flash, vacancies: van } = usePage().props;
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({
    department: "",
    employmentType: "",
    location: "",
  });

  // Application Form state (managed by Vacancies.jsx now)
  const { post, errors, reset } = useForm({
    first_name: '',
    last_name: '',
    phone: '',
    alt_phone: '',
    birth_date: '',
    email: '',
    photo: null,
    subcity: '',
    woreda: '',
    city: '',
    marital_status: '',
    education_background: '',
    vacancy_id: '',
    cv: null,
    company: '',
    position: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  // Loading state for realism
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setVacancies(van);
      setFilteredVacancies(van);
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = vacancies;

    if (filters.department && filters.department !== '') {
      result = result.filter((job) => job.department === filters.department);
    }

    if (filters.employmentType && filters.employmentType !== '') {
      result = result.filter(
        (job) => job.employment_type === filters.employmentType
      );
    }

    if (filters.location && filters.location !== '') {
      result = result.filter((job) =>
        job.work_location.includes(filters.location)
      );
    }

    setFilteredVacancies(result);
  }, [filters, vacancies]);

  useEffect(() => {
    if (flash.success) {
      setToast({ message: flash.success, type: 'success' });
    }
    if (flash.error) {
      setToast({ message: flash.error, type: 'error' });
    }
  }, [flash]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      department: "",
      employmentType: "",
      location: "",
    });
  };

  // Get unique values for filters
  const departments = Array.from(new Set(vacancies.map((job) => job.department)));
  const employmentTypes = Array.from(new Set(vacancies.map((job) => job.employment_type)));
  const locations = Array.from(new Set(vacancies.map((job) => job.work_location)));

  // Function to handle application submission, passed down to JobDetailsModal
  const handleApplicationSubmit = useCallback((formDataToSubmit) => {
    console.log(formDataToSubmit)
    router.post(window.route('applications.store'), formDataToSubmit,
    {
      forceFormData: true,
      onError: (errs) => {
        setToast({ message: errs?.message || "Failed to submit application", type: "error" });
      },
      onSuccess: () => {
        setToast({ message: "Application Submitted Successfully!", type: 'success' });
        reset();
        setSelectedJob(null);
      },
    });
  }, [post, reset]);

  return (
    <MainLayout>
      <Head title="Vacancies" />
      <Hero />
      <div className="relative z-10 -mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100">
            <h2 className="text-3xl font-bold text-center mb-6 text-slate-800">Why Work With Us?</h2>
            <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto leading-relaxed">
            We believe in great customer service, teamwork, and growth. At
            <span className="font-semibold text-gold-600"> Dembel City Center</span>, we're committed to creating exceptional
            experiences for our visitors while fostering a supportive and
            dynamic work environment for our team members.
            </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Current Openings</h3>
            
            {/* Filters */}
            <JobFilters 
            filters={filters}
            departments={departments}
            employmentTypes={employmentTypes}
            locations={locations}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            />
        </div>

        {/* Job Listings */}
        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-96 bg-slate-200 rounded-2xl"></div>
                ))}
            </div>
        ) : filteredVacancies.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🔍</div>
            <h3 className="text-xl font-semibold text-slate-900">No matches found</h3>
            <p className="text-slate-500 mt-2">Try adjusting your filters or check back later.</p>
            <button 
                onClick={clearFilters}
                className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
                Clear all filters
            </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVacancies.map((job) => (
                <JobCard 
                key={job.slug} 
                job={job} 
                onClick={() => setSelectedJob(job)} 
                />
            ))}
            </div>
        )}
      </main>

      {/* Talent Pool CTA */}
      <TalentPoolCTA />

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal 
          job={selectedJob} 
          onClose={() => setSelectedJob(null)} 
          onApplicationSubmit={handleApplicationSubmit}
          formErrors={errors}
        />
      )}
      
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Dembel City Center. All rights reserved.</p>
        </div>
      </footer>
      {toast && (
          <Toast className={'bottom-4'} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
    </MainLayout>
  );
};

export default Vacancies;