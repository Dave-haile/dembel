import React, { useState, useEffect } from "react";
import {
  Building,
  Clock1,
  Currency,
  Mail,
  Map,
  MapIcon,
  Phone,
  X,
} from "lucide-react";
import MainLayout from "../Shared/MainLayout";
import { Head } from "@inertiajs/react";

const Vacancy = ({ vacancies: van }) => {
  console.log(van);
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

  return (
    <MainLayout>
      <Head title="Vacancies" />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
              Join Our Team at Dembel City Center
            </h1>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            We believe in great customer service, teamwork, and growth. At
            Dembel City Center, we&apos;re committed to creating exceptional
            experiences for our visitors while fostering a supportive and
            dynamic work environment for our team members.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                name="employmentType"
                value={filters.employmentType}
                onChange={handleFilterChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              >
                <option value="">All Employment Types</option>
                {employmentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          {filteredVacancies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No positions match your current filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {filteredVacancies.map((job) => (
                <div
                  key={job.slug}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedJob(job)}
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
                  <div className="p-6relative">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Building className="w-4 h-4 mr-2" />
                        {/* <BuildingOfficeIcon className="w-4 h-4 mr-2" /> */}
                        <span>{job.department}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        {/* <ClockIcon className="w-4 h-4 mr-2" /> */}
                        <Clock1 className="w-4 h-4 mr-2" />
                        <span>{job.employment_type}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        {/* <MapPinIcon className="w-4 h-4 mr-2" /> */}
                        <MapIcon className="w-4 h-4 mr-2" />
                        <span>{job.work_location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        {/* <CurrencyDollarIcon className="w-4 h-4 mr-2" /> */}
                        <Currency className="w-4 h-4 mr-2" />
                        <span>
                          {job.currency} {job.salary_min.toLocaleString()} –{" "}
                          {job.salary_max.toLocaleString()} / month
                        </span>
                      </div>
                    </div>
                    <button className=" mt-4 w-full py-2 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Details Modal */}
        {selectedJob && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setSelectedJob(null);
            }}
          >
            <div
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedJob.title}
                </h2>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {/* <XMarkIcon className="w-6 h-6" /> */}
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {selectedJob.thumbnail && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <img
                      src={selectedJob.thumbnail}
                      alt={selectedJob.title}
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
                      <div className="flex">
                        <span className="font-medium w-32">Department:</span>
                        <span>{selectedJob.department}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Employment:</span>
                        <span>{selectedJob.employment_type}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Location:</span>
                        <span>{selectedJob.work_location}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Salary:</span>
                        <span>
                          {selectedJob.currency}{" "}
                          {selectedJob.salary_min.toLocaleString()} –{" "}
                          {selectedJob.salary_max.toLocaleString()} / month
                        </span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Positions:</span>
                        <span>{selectedJob.number_of_positions}</span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Posted:</span>
                        <span>
                          {new Date(
                            selectedJob.posted_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="font-medium w-32">Closing:</span>
                        <span>
                          {new Date(
                            selectedJob.closing_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        {/* <EnvelopeIcon className="w-5 h-5 mt-0.5 mr-2 text-gray-500" /> */}
                        <Mail className="w-5 h-5 mt-0.5 mr-2 text-gray-500" />
                        <span>{selectedJob.contact_email}</span>
                      </div>
                      <div className="flex items-start">
                        <Phone className="w-5 h-5 mt-0.5 mr-2 text-gray-500" />
                        {/* <PhoneIcon className="w-5 h-5 mt-0.5 mr-2 text-gray-500" /> */}
                        <span>{selectedJob.contact_phone}</span>
                      </div>
                      <div className="flex items-start">
                        <Map className="w-5 h-5 mt-0.5 mr-2 text-gray-500" />
                        {/* <MapPinIcon className="w-5 h-5 mt-0.5 mr-2 text-gray-500" /> */}
                        <span>{selectedJob.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Job Description
                  </h3>
                  <p className="text-gray-700">{selectedJob.job_description}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Requirements
                  </h3>
                  <p className="text-gray-700">{selectedJob.requirements}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Benefits
                  </h3>
                  <p className="text-gray-700">{selectedJob.benefits}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    How to Apply
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {selectedJob.how_to_apply}
                  </p>
                  <button className="px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Talent Pool CTA */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Didn&apos;t find a match?
            </h2>
            <p className="text-gray-700 mb-6">
              Submit your CV to our talent pool and we&apos;ll contact you when
              a suitable position becomes available.
            </p>
            <button className="px-8 py-3 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors">
              Submit Your CV
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Vacancy;
