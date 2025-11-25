import React from "react";
import FormInput from "../../components/FormInput";
import VacancyThumbnailUpload from "./VacancyThumbnailUpload";

const VacancyForm = ({
  formData,
  errors,
  onChange,
  onSubmit,
  onClose,
  departments,
  employmentTypes,
  fileInputRef,
  logoPreview,
  onLogoInputChange,
  onLogoDrop,
  onLogoDragOver,
  onLogoDragLeave,
  isDragging,
}) => {
  return (
    <form onSubmit={onSubmit} className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <FormInput
                label="Job Title"
                name="title"
                value={formData.title || ""}
                onChange={onChange}
                error={errors.title}
                required
                placeholder="e.g., Retail Sales Associate"
              />
            </div>

            <FormInput
              label="Department"
              name="department"
              type="select"
              value={formData.department || ""}
              onChange={onChange}
              error={errors.department}
              options={departments.map((d) => ({ value: d, label: d }))}
            />

            <FormInput
              label="Employment Type"
              name="employment_type"
              type="select"
              value={formData.employment_type || ""}
              onChange={onChange}
              error={errors.employment_type}
              required
              options={employmentTypes.map((t) => ({ value: t, label: t }))}
            />

            <div className="md:col-span-2">
              <FormInput
                label="Work Location"
                name="work_location"
                value={formData.work_location || ""}
                onChange={onChange}
                error={errors.work_location}
                required
                placeholder="e.g., Dembel City Center, Addis Ababa"
              />
            </div>

            <FormInput
              label="Number of Positions"
              name="number_of_positions"
              type="number"
              value={formData.number_of_positions || 1}
              onChange={onChange}
              error={errors.number_of_positions}
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Salary Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Minimum Salary"
              name="salary_min"
              type="number"
              value={formData.salary_min || ""}
              onChange={onChange}
              error={errors.salary_min}
              placeholder="5000"
            />

            <FormInput
              label="Maximum Salary"
              name="salary_max"
              type="number"
              value={formData.salary_max || ""}
              onChange={onChange}
              error={errors.salary_max}
              placeholder="7000"
            />

            <FormInput
              label="Currency"
              name="currency"
              value={formData.currency || "ETB"}
              onChange={onChange}
              placeholder="ETB"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Details</h3>
          <div className="space-y-4">
            <FormInput
              label="Job Description"
              name="job_description"
              type="textarea"
              value={formData.job_description || ""}
              onChange={onChange}
              error={errors.job_description}
              required
              placeholder="Describe the role and responsibilities..."
              rows={4}
            />

            <FormInput
              label="Requirements"
              name="requirements"
              type="textarea"
              value={formData.requirements || ""}
              onChange={onChange}
              placeholder="List required qualifications and skills..."
              rows={3}
            />

            <FormInput
              label="Benefits"
              name="benefits"
              type="textarea"
              value={formData.benefits || ""}
              onChange={onChange}
              placeholder="Describe employee benefits..."
              rows={3}
            />

            <FormInput
              label="How to Apply"
              name="how_to_apply"
              type="textarea"
              value={formData.how_to_apply || ""}
              onChange={onChange}
              placeholder="Provide application instructions..."
              rows={2}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Posted Date"
              name="posted_date"
              type="date"
              value={formData.posted_date || ""}
              onChange={onChange}
              error={errors.posted_date}
              required
            />

            <FormInput
              label="Closing Date"
              name="closing_date"
              type="date"
              value={formData.closing_date || ""}
              onChange={onChange}
              error={errors.closing_date}
              required
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Contact Email"
              name="contact_email"
              type="email"
              value={formData.contact_email || ""}
              onChange={onChange}
              error={errors.contact_email}
              placeholder="hr@example.com"
            />

            <FormInput
              label="Contact Phone"
              name="contact_phone"
              type="tel"
              value={formData.contact_phone || ""}
              onChange={onChange}
              error={errors.contact_phone}
              placeholder="+251911223344"
            />

            <div className="md:col-span-2">
              <FormInput
                label="Address"
                name="address"
                value={formData.address || ""}
                onChange={onChange}
                placeholder="Office address..."
              />
            </div>

            <div>
              <div className="flex flex-col justify-center">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thumbnail
                  </label>
                  <VacancyThumbnailUpload
                    fileInputRef={fileInputRef}
                    logoPreview={logoPreview}
                    formData={formData}
                    onLogoInputChange={onLogoInputChange}
                    onLogoDrop={onLogoDrop}
                    onLogoDragOver={onLogoDragOver}
                    onLogoDragLeave={onLogoDragLeave}
                    isDragging={isDragging}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          {formData?.id ? "Update Vacancy" : "Create Vacancy"}
        </button>
      </div>
    </form>
  );
};

export default VacancyForm;
