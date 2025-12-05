import React, { useState, useEffect, useCallback } from "react";
import MainLayout from "../Shared/MainLayout";
import { Head } from "@inertiajs/react";
import Hero from "./components/Hero";
import JobFilters from "./components/JobFilters";
import JobCard from "./components/JobCard";
import JobDetailsModal from "./components/JobDetailsModal";
import TalentPoolCTA from "./components/TalentPoolCTA";
import { toast } from "react-toastify";

const Vacancy = ({ vacancies: van }) => {
  const [vacancies, setVacancies] = useState([]);
  const [filteredVacancies, setFilteredVacancies] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [filters, setFilters] = useState({
    department: "",
    employmentType: "",
    location: "",
  });

  useEffect(() => {
    // Simulate API call
    setVacancies(van);
    setFilteredVacancies(van);
  }, []);

  useEffect(() => {
    let result = vacancies;

    if (filters.department) {
      result = result.filter((job) => job.department === filters.department);
    }

    if (filters.employmentType) {
      result = result.filter(
        (job) => job.employment_type === filters.employmentType
      );
    }

    if (filters.location) {
      result = result.filter((job) =>
        job.work_location.includes(filters.location)
      );
    }

    setFilteredVacancies(result);
  }, [filters, vacancies]);

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
  const departments = [...new Set(vacancies.map((job) => job.department))];
  const employmentTypes = [
    ...new Set(vacancies.map((job) => job.employment_type)),
  ];
  const locations = [...new Set(vacancies.map((job) => job.work_location))];

  // Handle CV submission
  const handleCvSubmit = useCallback(() => {
    toast.info('Coming Soon')
  }, []);

  return (
    <MainLayout>
      <Head title="Vacancies" />
      <div className="min-h-screen bg-white">
        <Hero />

        {/* Introduction */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            We believe in great customer service, teamwork, and growth. At
            Dembel City Center, we're committed to creating exceptional
            experiences for our visitors while fostering a supportive and
            dynamic work environment for our team members.
          </p>
        </div>

        {/* Filters */}
        <JobFilters 
          filters={filters}
          departments={departments}
          employmentTypes={employmentTypes}
          locations={locations}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />

        {/* Job Listings */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          {filteredVacancies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No positions match your current filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVacancies.map((job) => (
                <JobCard 
                  key={job.slug} 
                  job={job} 
                  onClick={() => setSelectedJob(job)} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <JobDetailsModal 
            job={selectedJob} 
            onClose={() => setSelectedJob(null)} 
          />
        )}

        {/* Talent Pool CTA */}
        <TalentPoolCTA onCvSubmit={handleCvSubmit} />
      </div>
    </MainLayout>
  );
};

export default Vacancy;
