import React from 'react';
import { Upload } from 'lucide-react';

const ApplyForm = ({ job, onApplicationSubmit, formErrors, onSuccess }) => {
    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        alt_phone: '',
        birth_date: '',
        photo: null,
        subcity: '',
        woreda: '',
        city: '',
        marital_status: '',
        education_background: '',
        cv: null,
        company: '',
        position: '',
        description: '',
        start_date: '',
        end_date: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData(prev => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = { ...formData, vacancy_id: job.id };
        onApplicationSubmit(dataToSubmit);
        // Call onSuccess to close the modal and trigger toast in parent (JobDetailsModal)
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">First Name</label>
                    <input 
                        type="text" 
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                        placeholder="e.g. Abebe"
                        required
                    />
                    {formErrors.first_name && <p className="text-red-500 text-xs mt-1">{formErrors.first_name}</p>}
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Last Name</label>
                    <input 
                        type="text" 
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                        placeholder="e.g. Kebede"
                        required
                    />
                    {formErrors.last_name && <p className="text-red-500 text-xs mt-1">{formErrors.last_name}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                        placeholder="name@example.com"
                        required
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Phone Number</label>
                    <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                        placeholder="+251..."
                        required
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Alternative Phone (Optional)</label>
                <input 
                    type="tel" 
                    name="alt_phone"
                    value={formData.alt_phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    placeholder="+251..."
                />
                {formErrors.alt_phone && <p className="text-red-500 text-xs mt-1">{formErrors.alt_phone}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Birth Date (Optional)</label>
                    <input 
                        type="date" 
                        name="birth_date"
                        value={formData.birth_date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                    {formErrors.birth_date && <p className="text-red-500 text-xs mt-1">{formErrors.birth_date}</p>}
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Marital Status (Optional)</label>
                    <select 
                        name="marital_status"
                        value={formData.marital_status}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    >
                        <option value="">Select...</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                    </select>
                    {formErrors.marital_status && <p className="text-red-500 text-xs mt-1">{formErrors.marital_status}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Subcity (Optional)</label>
                    <input 
                        type="text" 
                        name="subcity"
                        value={formData.subcity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                    {formErrors.subcity && <p className="text-red-500 text-xs mt-1">{formErrors.subcity}</p>}
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Woreda (Optional)</label>
                    <input 
                        type="text" 
                        name="woreda"
                        value={formData.woreda}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                    {formErrors.woreda && <p className="text-red-500 text-xs mt-1">{formErrors.woreda}</p>}
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">City (Optional)</label>
                    <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Education Background (Optional)</label>
                <input 
                    type="text" 
                    name="education_background"
                    value={formData.education_background}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                />
                {formErrors.education_background && <p className="text-red-500 text-xs mt-1">{formErrors.education_background}</p>}
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Photo (Optional)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                    <input 
                        type="file" 
                        name="photo"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept="image/*"
                    />
                    <div className="bg-gold-100 p-3 rounded-full mb-2">
                        <Upload className="w-6 h-6 text-gold-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">
                        {formData.photo ? formData.photo.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">JPEG, PNG, JPG, GIF, SVG up to 2MB</p>
                </div>
                {formErrors.photo && <p className="text-red-500 text-xs mt-1">{formErrors.photo}</p>}
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Resume / CV</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
                    <input 
                        type="file" 
                        name="cv"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".pdf,.doc,.docx"
                        required
                    />
                    <div className="bg-gold-100 p-3 rounded-full mb-2">
                        <Upload className="w-6 h-6 text-gold-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">
                        {formData.cv ? formData.cv.name : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">PDF, DOC, DOCX up to 2MB</p>
                </div>
                {formErrors.cv && <p className="text-red-500 text-xs mt-1">{formErrors.cv}</p>}
            </div>

            <h4 className="text-lg font-bold text-slate-900 mt-8 mb-4">Work Experience (Optional)</h4>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Company</label>
                <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    placeholder="Previous company name"
                />
                {formErrors.company && <p className="text-red-500 text-xs mt-1">{formErrors.company}</p>}
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Position</label>
                <input 
                    type="text" 
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    placeholder="Your position at the company"
                />
                {formErrors.position && <p className="text-red-500 text-xs mt-1">{formErrors.position}</p>}
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Description (Responsibilities/Achievements)</label>
                <textarea 
                    rows={4}
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    placeholder="Briefly describe your roles and achievements..."
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">Start Date</label>
                    <input 
                        type="date" 
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                    {formErrors.start_date && <p className="text-red-500 text-xs mt-1">{formErrors.start_date}</p>}
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-semibold text-slate-700">End Date</label>
                    <input 
                        type="date" 
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    />
                    {formErrors.end_date && <p className="text-red-500 text-xs mt-1">{formErrors.end_date}</p>}
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-sm font-semibold text-slate-700">Cover Letter (Optional)</label>
                <textarea 
                    rows={4}
                    name="cover_letter"
                    value={formData.cover_letter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none"
                    placeholder="Tell us why you are a great fit..."
                />
                {formErrors.cover_letter && <p className="text-red-500 text-xs mt-1">{formErrors.cover_letter}</p>}
            </div>

            <button 
                type="submit" 
                // `processing` is now managed by Vacancies.jsx's useForm
                className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Submit Application
            </button>
        </form>
    );
};

export default ApplyForm;