// import React, { useState } from 'react';
// import { useForm } from '@inertiajs/react';
// import { toast } from 'react-toastify';

// const TalentPoolCTA = ({ onCvSubmit }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const { data, setData, post, processing, errors, reset } = useForm({
//     first_name: '',
//     last_name: '',
//     phone: '',
//     alt_phone: '',
//     birth_date: '',
//     email: '',
//     photo: null,
//     subcity: '',
//     woreda: '',
//     city: '',
//     marital_status: '',
//     education_background: '',
//     vacancy_id: '',
//     cv: null,
//     company: '',
//     position: '',
//     description: '',
//     start_date: '',
//     end_date: '',
//   });

//   const handleFileChange = (e) => {
//     setData(e.target.name, e.target.files[0]);
//   };

//   const handleInputChange = (e) => {
//     setData(e.target.name, e.target.value);
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     post(route('applications.store'), {
//       onSuccess: () => {
//         toast.success('Application submitted successfully!');
//         reset();
//         setIsModalOpen(false);
//       },
//       onError: (err) => {
//         toast.error('Error submitting application.');
//         console.error(err);
//       },
//     });
//   };

//   return (
//     <div className="bg-gray-50 py-16">
//       <div className="max-w-4xl mx-auto px-4 text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">
//           Didn't find a match?
//         </h2>
//         <p className="text-gray-700 mb-6">
//           Submit your CV to our talent pool and we'll contact you when
//           a suitable position becomes available.
//         </p>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="px-8 py-3 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors"
//         >
//           Submit Your CV
//         </button>
//       </div>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto relative">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//             >
//               &times;
//             </button>
//             <h3 className="text-xl font-semibold mb-4">Submit Your Application</h3>
//             <form onSubmit={submit}>
//               <div className="mb-4">
//                 <label htmlFor="first_name" className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
//                 <input type="text" name="first_name" id="first_name" value={data.first_name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 {errors.first_name && <div className="text-red-500 text-xs mt-1">{errors.first_name}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="last_name" className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
//                 <input type="text" name="last_name" id="last_name" value={data.last_name} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 {errors.last_name && <div className="text-red-500 text-xs mt-1">{errors.last_name}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//                 <input type="email" name="email" id="email" value={data.email} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
//                 <input type="text" name="phone" id="phone" value={data.phone} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="alt_phone" className="block text-gray-700 text-sm font-bold mb-2">Alternative Phone:</label>
//                 <input type="text" name="alt_phone" id="alt_phone" value={data.alt_phone} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.alt_phone && <div className="text-red-500 text-xs mt-1">{errors.alt_phone}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="birth_date" className="block text-gray-700 text-sm font-bold mb-2">Birth Date:</label>
//                 <input type="date" name="birth_date" id="birth_date" value={data.birth_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.birth_date && <div className="text-red-500 text-xs mt-1">{errors.birth_date}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="subcity" className="block text-gray-700 text-sm font-bold mb-2">Subcity:</label>
//                 <input type="text" name="subcity" id="subcity" value={data.subcity} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.subcity && <div className="text-red-500 text-xs mt-1">{errors.subcity}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="woreda" className="block text-gray-700 text-sm font-bold mb-2">Woreda:</label>
//                 <input type="text" name="woreda" id="woreda" value={data.woreda} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.woreda && <div className="text-red-500 text-xs mt-1">{errors.woreda}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">City:</label>
//                 <input type="text" name="city" id="city" value={data.city} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="marital_status" className="block text-gray-700 text-sm font-bold mb-2">Marital Status:</label>
//                 <select name="marital_status" id="marital_status" value={data.marital_status} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
//                   <option value="">Select...</option>
//                   <option value="Single">Single</option>
//                   <option value="Married">Married</option>
//                   <option value="Divorced">Divorced</option>
//                   <option value="Widowed">Widowed</option>
//                 </select>
//                 {errors.marital_status && <div className="text-red-500 text-xs mt-1">{errors.marital_status}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="education_background" className="block text-gray-700 text-sm font-bold mb-2">Education Background:</label>
//                 <input type="text" name="education_background" id="education_background" value={data.education_background} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.education_background && <div className="text-red-500 text-xs mt-1">{errors.education_background}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="company" className="block text-gray-700 text-sm font-bold mb-2">Previous Company:</label>
//                 <input type="text" name="company" id="company" value={data.company} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.company && <div className="text-red-500 text-xs mt-1">{errors.company}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="position" className="block text-gray-700 text-sm font-bold mb-2">Position:</label>
//                 <input type="text" name="position" id="position" value={data.position} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.position && <div className="text-red-500 text-xs mt-1">{errors.position}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Job Description:</label>
//                 <textarea name="description" id="description" value={data.description} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
//                 {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="start_date" className="block text-gray-700 text-sm font-bold mb-2">Start Date:</label>
//                 <input type="date" name="start_date" id="start_date" value={data.start_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.start_date && <div className="text-red-500 text-xs mt-1">{errors.start_date}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="end_date" className="block text-gray-700 text-sm font-bold mb-2">End Date:</label>
//                 <input type="date" name="end_date" id="end_date" value={data.end_date} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.end_date && <div className="text-red-500 text-xs mt-1">{errors.end_date}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="photo" className="block text-gray-700 text-sm font-bold mb-2">Photo:</label>
//                 <input type="file" name="photo" id="photo" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
//                 {errors.photo && <div className="text-red-500 text-xs mt-1">{errors.photo}</div>}
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="cv" className="block text-gray-700 text-sm font-bold mb-2">CV:</label>
//                 <input type="file" name="cv" id="cv" onChange={handleFileChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
//                 {errors.cv && <div className="text-red-500 text-xs mt-1">{errors.cv}</div>}
//               </div>
//               <button type="submit" disabled={processing} className="px-8 py-3 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg transition-colors">
//                 {processing ? 'Submitting...' : 'Submit Application'}
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TalentPoolCTA;
import React, { useState, useEffect } from 'react';
import { router, useForm } from '@inertiajs/react';
import { Sparkles, X, ChevronRight, UploadCloud } from 'lucide-react';
import Toast from '@/Pages/Admin/components/Toast';

const TalentPoolCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Simplified form for Talent Pool
  const { data, setData, processing, reset } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    cv: '',
    specialization: ''
  });

  const submit = (e) => {
    e.preventDefault();
    router.post(window.route('applications.store'), data, {
        forceFormData: true,
      onError: (errs) => {
        setToast({ message: errs?.message || "Failed to submit application", type: "error" });
      },
      onSuccess: () => {
        setToast({ message: 'Added to Talent Pool successfully!', type: 'success' });
        reset();
        setIsModalOpen(false);
      },
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
        <div className="relative py-24 overflow-hidden bg-slate-900">
            {/* Abstract Background Shapes with fixed animation delays */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div 
                className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
                style={{ animationDelay: '2s' }}
            ></div>
            <div 
                className="absolute -bottom-32 left-20 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"
                style={{ animationDelay: '4s' }}
            ></div>
            
            <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
                <div className="inline-flex items-center justify-center p-2 bg-slate-800 rounded-full mb-6">
                    <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full mr-2">New</span>
                    <span className="text-slate-300 text-sm font-medium pr-2">Join our exclusive talent network</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Don't see the perfect fit? <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-200">
                        Let the opportunity find you.
                    </span>
                </h2>
                
                <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
                Submit your CV to our talent pool. Our HR team continuously searches this database for hidden gems before posting new openings.
                </p>
                
                <button 
                onClick={() => setIsModalOpen(true)}
                className="group relative inline-flex items-center px-8 py-4 bg-gold-600 text-white font-bold rounded-full overflow-hidden transition-all hover:bg-gold-500 hover:shadow-[0_0_40px_-10px_rgba(217,119,6,0.5)]"
                >
                <span className="relative z-10 flex items-center">
                    Join Talent Pool
                    <Sparkles className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
                </span>
                </button>
            </div>
        </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop - clicking here closes the modal */}
            <div 
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                onClick={() => setIsModalOpen(false)}
            />

            {/* Drawer Panel */}
            <div 
                className="relative w-full max-w-xl bg-white h-full shadow-2xl overflow-y-auto animate-slide-in-right md:rounded-l-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 bg-white z-10 border-b border-slate-100 p-6 flex justify-between items-center shrink-0">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">General Application</h3>
                        <p className="text-sm text-slate-500">Join the Dembel City Center Talent Network</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors text-slate-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={submit} className="p-8 space-y-6 flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">First Name</label>
                            <input 
                                type="text" 
                                value={data.first_name || ''}
                                onChange={(e) => setData('first_name', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-slate-50 focus:bg-white transition-all"
                                required 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Last Name</label>
                            <input 
                                type="text" 
                                value={data.last_name || ''}
                                onChange={(e) => setData('last_name', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-slate-50 focus:bg-white transition-all"
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input 
                            type="email" 
                            value={data.email || ''}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-slate-50 focus:bg-white transition-all"
                            required 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Area of Interest / Specialization</label>
                        <select 
                            value={data.specialization || ''}
                            onChange={(e) => setData('specialization', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none bg-slate-50 focus:bg-white transition-all"
                        >
                            <option value="">Select an area...</option>
                            <option value="Administration">Administration</option>
                            <option value="Security">Security</option>
                            <option value="Maintenance">Maintenance & Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales & Leasing</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Upload CV</label>
                        <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors group">
                            <input 
                                type="file" 
                                onChange={(e) => setData('cv', e.target.files ? e.target.files[0] : '')} 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                required
                            />
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gold-100 transition-colors">
                                <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-gold-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-900">
                                {data.cv ? data.cv.name : "Drop your resume here or browse"}
                            </p>
                            <p className="text-xs text-slate-500 mt-1">Supports PDF, DOCX (Max 10MB)</p>
                        </div>
                    </div>

                    <div className="pt-4 pb-8">
                        <button 
                            type="submit" 
                            disabled={processing} 
                            className="w-full py-4 bg-gold-600 hover:bg-gold-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center"
                        >
                            {processing ? 'Submitting...' : 'Submit to Talent Pool'}
                            {!processing && <ChevronRight className="w-5 h-5 ml-2" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
      {toast && (
          <Toast className={'bottom-4'} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
    </>
  );
};

export default TalentPoolCTA;