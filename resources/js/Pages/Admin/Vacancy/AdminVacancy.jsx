// import React, { useMemo, useState } from "react";
// import AdminLayout from "../Shared/AdminLayout";
// import DataTable from "../Shared/DataTable";
// import ModalForm from "../Shared/ModalForm";
// import DeleteConfirmModal from "../Shared/DeleteConfirmModal";
// import ActivityLog from "../Shared/ActivityLog";

// const AdminVacancy = ({ vacancies = [] }) => {
//   const [items, setItems] = useState(vacancies);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const [activityLog, setActivityLog] = useState([]);
//   const [notice, setNotice] = useState(null);

//   const filteredItems = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     if (!q) return items;
//     return items.filter((v) =>
//       [
//         v.title,
//         v.department,
//         v.employment_type,
//         v.work_location,
//         v.status,
//       ]
//         .map((x) => (x ?? "").toString().toLowerCase())
//         .some((t) => t.includes(q))
//     );
//   }, [items, searchTerm]);

//   const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
//   const currentItems = filteredItems.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const log = (action, payload) => {
//     const entry = {
//       id: Date.now(),
//       action,
//       entity: "Vacancy",
//       item: payload?.title || payload?.id,
//       timestamp: new Date().toISOString(),
//       user: "Admin",
//     };
//     setActivityLog((prev) => [entry, ...prev.slice(0, 49)]);
//   };

//   const handleCreate = () => {
//     setEditingItem(null);
//     setIsModalOpen(true);
//   };

//   async function submitForm(e) {
//     e.preventDefault();
//     const form = e.target;
//     const fd = new FormData(form);
//     const toBody = (appendMethod) => {
//       const body = new FormData();
//       for (const [k, v] of fd.entries()) body.append(k, v);
//       if (appendMethod) body.append("_method", appendMethod);
//       return body;
//     };

//     try {
//       let res;
//       if (editingItem) {
//         res = await fetch(`/admin/vacancies/${editingItem.id}`, {
//           method: "POST",
//           headers: { "X-Requested-With": "XMLHttpRequest" },
//           body: toBody("PUT"),
//           credentials: "same-origin",
//         });
//       } else {
//         res = await fetch(`/admin/vacancies`, {
//           method: "POST",
//           headers: { "X-Requested-With": "XMLHttpRequest" },
//           body: toBody(),
//           credentials: "same-origin",
//         });
//       }
//       if (!res.ok) throw new Error("Failed to save vacancy");
//       const saved = await res.json();
//       setItems((prev) => {
//         const exists = prev.find((p) => p.id === saved.id);
//         if (exists) return prev.map((p) => (p.id === saved.id ? saved : p));
//         return [saved, ...prev];
//       });
//       setNotice({ type: "success", message: editingItem ? "Updated." : "Created." });
//       log(editingItem ? "Updated" : "Created", saved);
//       setIsModalOpen(false);
//       setEditingItem(null);
//       form.reset();
//     } catch (err) {
//       setNotice({ type: "error", message: err.message || "Error" });
//     }
//   }

//   async function confirmDelete() {
//     if (!itemToDelete) return;
//     try {
//       const res = await fetch(`/admin/vacancies/${itemToDelete}`, {
//         method: "DELETE",
//         headers: { "X-Requested-With": "XMLHttpRequest" },
//         credentials: "same-origin",
//       });
//       if (!res.ok) throw new Error("Failed to delete vacancy");
//       setItems((prev) => prev.filter((s) => s.id !== itemToDelete));
//       setNotice({ type: "success", message: "Deleted." });
//       log("Deleted", { id: itemToDelete });
//     } catch (e) {
//       setNotice({ type: "error", message: e.message || "Error" });
//     } finally {
//       setIsDeleteModalOpen(false);
//       setItemToDelete(null);
//     }
//   }

//   const columns = [
//     { header: "Title", render: (row) => <span className="font-semibold">{row.title}</span> },
//     { header: "Type", accessor: "employment_type" },
//     { header: "Location", accessor: "work_location" },
//     {
//       header: "Dates",
//       render: (row) => (
//         <div className="text-sm text-gray-600">
//           <div>Posted: {row.posted_date}</div>
//           <div>Closes: {row.closing_date}</div>
//         </div>
//       ),
//     },
//     {
//       header: "Contact",
//       render: (row) => (
//         <div className="text-sm">
//           <div>{row.contact_phone || "—"}</div>
//           {row.contact_email ? (
//             <a href={`mailto:${row.contact_email}`} className="text-blue-600 hover:underline">
//               {row.contact_email}
//             </a>
//           ) : (
//             <span className="text-gray-500">—</span>
//           )}
//         </div>
//       ),
//     },
//   ];

//   return (
//     <AdminLayout
//       currentPage={"vacancies"}
//       setCurrentPage={setCurrentPage}
//       setSidebarOpen={setSidebarOpen}
//       sidebarOpen={sidebarOpen}
//     >
//       <div className="p-4 md:p-6">
//         <div className="mb-6 flex items-start justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Vacancies</h1>
//             <p className="mt-1 text-sm text-gray-500">Manage open and closed positions</p>
//           </div>
//           <button
//             onClick={handleCreate}
//             className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
//           >
//             Add Vacancy
//           </button>
//         </div>

//         {notice && (
//           <div
//             className={`mb-4 rounded-md border px-4 py-2 text-sm ${
//               notice.type === "success"
//                 ? "border-green-200 bg-green-50 text-green-800"
//                 : "border-red-200 bg-red-50 text-red-800"
//             }`}
//           >
//             {notice.message}
//           </div>
//         )}

//         <div className="rounded-xl border border-gray-200 bg-white p-3 shadow">
//           <div className="mb-4 flex items-center justify-between px-1">
//             <h3 className="text-base font-semibold text-gray-900">All Vacancies</h3>
//             <div className="relative w-full max-w-xs">
//               <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 105.358 11.02l3.686 3.686a.75.75 0 101.06-1.06l-3.686-3.686A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z" clipRule="evenodd" /></svg>
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search vacancies..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                 }}
//                 className="w-full rounded-md border border-gray-300 bg-white px-9 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
//               />
//             </div>
//           </div>

//           <DataTable
//             columns={columns}
//             data={currentItems}
//             onEdit={(item) => {
//               setEditingItem(item);
//               setIsModalOpen(true);
//             }}
//             onDelete={(id) => {
//               setItemToDelete(id);
//               setIsDeleteModalOpen(true);
//             }}
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//             itemsPerPage={itemsPerPage}
//             filteredCount={filteredItems.length}
//           />
//         </div>

//         <div className="mt-6">
//           <ActivityLog activities={activityLog} />
//         </div>

//         <ModalForm
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             setEditingItem(null);
//           }}
//           title={editingItem ? "Edit Vacancy" : "Add Vacancy"}
//           onSubmit={submitForm}
//         >
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <input name="title" defaultValue={editingItem?.title || ""} required placeholder="Title *" className="p-2 border rounded" />
//             <input name="department" defaultValue={editingItem?.department || ""} placeholder="Department" className="p-2 border rounded" />
//             <input name="employment_type" defaultValue={editingItem?.employment_type || "Full-time"} required placeholder="Employment Type" className="p-2 border rounded" />
//             <input name="work_location" defaultValue={editingItem?.work_location || "On-site"} required placeholder="Work Location" className="p-2 border rounded" />
//             <input name="posted_date" type="date" defaultValue={editingItem?.posted_date || ""} required className="p-2 border rounded" />
//             <input name="closing_date" type="date" defaultValue={editingItem?.closing_date || ""} required className="p-2 border rounded" />
//             <input name="salary_min" defaultValue={editingItem?.salary_min || ""} placeholder="Salary Min" className="p-2 border rounded" />
//             <input name="salary_max" defaultValue={editingItem?.salary_max || ""} placeholder="Salary Max" className="p-2 border rounded" />
//             <input name="currency" defaultValue={editingItem?.currency || "ETB"} placeholder="Currency" className="p-2 border rounded" />
//             <input name="number_of_positions" defaultValue={editingItem?.number_of_positions || 1} placeholder="Positions" className="p-2 border rounded" />
//             <input name="contact_email" defaultValue={editingItem?.contact_email || ""} placeholder="Contact Email" className="p-2 border rounded" />
//             <input name="contact_phone" defaultValue={editingItem?.contact_phone || ""} placeholder="Contact Phone" className="p-2 border rounded" />
//             <input name="slug" defaultValue={editingItem?.slug || ""} placeholder="Slug" className="p-2 border rounded" />
//             <input name="thumbnail" type="file" accept="image/*" className="p-2 border rounded" />
//             <textarea name="job_description" defaultValue={editingItem?.job_description || ""} required placeholder="Job Description" className="p-2 border rounded md:col-span-2" rows={3} />
//             <textarea name="requirements" defaultValue={editingItem?.requirements || ""} placeholder="Requirements" className="p-2 border rounded md:col-span-2" rows={2} />
//             <textarea name="benefits" defaultValue={editingItem?.benefits || ""} placeholder="Benefits" className="p-2 border rounded md:col-span-2" rows={2} />
//             <textarea name="how_to_apply" defaultValue={editingItem?.how_to_apply || ""} required placeholder="How to Apply" className="p-2 border rounded md:col-span-2" rows={2} />
//           </div>
//         </ModalForm>

//         <DeleteConfirmModal
//           isOpen={isDeleteModalOpen}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={confirmDelete}
//           itemName={items.find((i) => i.id === itemToDelete)?.title || "this vacancy"}
//         />
//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminVacancy;
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, Search, X, Calendar, Users } from 'lucide-react';
import Toast from '../components/Toast';
import DeleteConfirmation from '../components/DeleteConfirmation';
import FormInput from '../components/FormInput';
import RecentActivities from '../components/RecentActivities';
import Modal from '../components/Modal';
import AdminLayout from '../Shared/AdminLayout';
import { usePage } from '@inertiajs/react';

const VacanciesCRUD = () => {
  const { vacancies: vacancy, activities } = usePage().props;
  const [vacancies, setVacancies] = useState(vacancy);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  // Lock body scroll when the form modal is open
  useEffect(() => {
    if (isModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isModalOpen]);

  const departments = ['Retail', 'Security', 'Operations', 'Customer Service', 'Maintenance', 'Administration'];
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];

  const itemsPerPage = 10;

  const filteredVacancies = vacancies.filter(vacancy => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || vacancy.employment_type === filterType;
    const matchesDepartment = !filterDepartment || vacancy.department === filterDepartment;
    return matchesSearch && matchesType && matchesDepartment;
  });

  const totalPages = Math.ceil(filteredVacancies.length / itemsPerPage);
  const paginatedVacancies = filteredVacancies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = 'Title is required';
    if (!formData.department?.trim()) newErrors.department = 'Department is required';
    if (!formData.employment_type) newErrors.employment_type = 'Employment type is required';
    if (!formData.work_location?.trim()) newErrors.work_location = 'Work location is required';
    if (!formData.salary_min) newErrors.salary_min = 'Minimum salary is required';
    if (!formData.salary_max) newErrors.salary_max = 'Maximum salary is required';
    if (formData.salary_min && formData.salary_max && formData.salary_min > formData.salary_max) {
      newErrors.salary_max = 'Maximum salary must be greater than minimum';
    }
    if (!formData.job_description?.trim()) newErrors.job_description = 'Job description is required';
    if (!formData.posted_date) newErrors.posted_date = 'Posted date is required';
    if (!formData.closing_date) newErrors.closing_date = 'Closing date is required';
    if (!formData.number_of_positions || formData.number_of_positions < 1) {
      newErrors.number_of_positions = 'Number of positions must be at least 1';
    }
    if (!formData.contact_email?.trim()) {
      newErrors.contact_email = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = 'Email is invalid';
    }
    if (!formData.contact_phone?.trim()) newErrors.contact_phone = 'Contact phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCreate = () => {
    setFormData({
      title: '',
      department: '',
      employment_type: '',
      work_location: '',
      salary_min: 0,
      salary_max: 0,
      currency: 'ETB',
      job_description: '',
      requirements: '',
      benefits: '',
      how_to_apply: '',
      posted_date: new Date().toISOString().split('T')[0],
      closing_date: '',
      number_of_positions: 1,
      contact_email: '',
      contact_phone: '',
      address: '',
      is_approved: 1,
      slug: '',
      thumbnail: ''
    });
    setSelectedVacancy(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (vacancy) => {
    setFormData(vacancy);
    setSelectedVacancy(vacancy);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleView = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsViewModalOpen(true);
  };

  const handleDelete = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({ message: 'Please fix the errors in the form', type: 'error' });
      return;
    }

    const timestamp = new Date().toISOString();

    if (selectedVacancy) {
      const updatedVacancy = {
        ...selectedVacancy,
        ...formData,
        updated_at: timestamp
      };
      setVacancies(prev => prev.map(v => v.id === selectedVacancy.id ? updatedVacancy : v));
      setToast({ message: `Vacancy "${updatedVacancy.title}" updated successfully`, type: 'success' });
    } else {
      const newVacancy = {
        id: Math.max(...vacancies.map(v => v.id), 0) + 1,
        ...formData,
        created_at: timestamp,
        updated_at: timestamp
      };
      setVacancies(prev => [...prev, newVacancy]);
      setToast({ message: `Vacancy "${newVacancy.title}" created successfully`, type: 'success' });
    }

    setIsModalOpen(false);
    setFormData({});
  };

  const confirmDelete = () => {
    if (selectedVacancy) {
      setVacancies(prev => prev.filter(v => v.id !== selectedVacancy.id));
      setToast({ message: `Vacancy "${selectedVacancy.title}" deleted successfully`, type: 'success' });
      setIsDeleteModalOpen(false);
      setSelectedVacancy(null);
    }
  };


  const isClosingSoon = (closingDate) => {
    const closing = new Date(closingDate);
    const today = new Date();
    const diffDays = Math.ceil((closing.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Vacancies Management</h1>
          <p className="text-gray-600 mt-1">Manage job openings and positions</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Vacancy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Total Vacancies</p>
          <p className="text-3xl font-bold text-gray-800">{vacancies.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Open Positions</p>
          <p className="text-3xl font-bold text-orange-600">
            {vacancies.reduce((sum, v) => sum + v.number_of_positions, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Full-time</p>
          <p className="text-3xl font-bold text-blue-600">
            {vacancies.filter(v => v.employment_type === 'Full-time').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">Part-time</p>
          <p className="text-3xl font-bold text-green-600">
            {vacancies.filter(v => v.employment_type === 'Part-time').length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="lg:col-span-2 space-y-6 shadow-2xl rounded-xl min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vacancies..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All Types</option>
                {employmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <select
                value={filterDepartment}
                onChange={(e) => {
                  setFilterDepartment(e.target.value);
                  setCurrentPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {paginatedVacancies.length > 0 ? (
                paginatedVacancies.map((vacancy) => (
                  <div key={vacancy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <img
                        src={`/${vacancy.thumbnail}`}
                        alt={vacancy.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800">{vacancy.title}</h3>
                            <div className="flex flex-wrap items-center gap-2 mt-2">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium">
                                {vacancy.department}
                              </span>
                              <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                                {vacancy.employment_type}
                              </span>
                              {isClosingSoon(vacancy.closing_date) && (
                                <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium">
                                  Closing Soon
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleView(vacancy)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(vacancy)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(vacancy)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{vacancy.number_of_positions} positions</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Posted: {new Date(vacancy.posted_date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>Closes: {new Date(vacancy.closing_date).toLocaleDateString()}</span>
                          </div>
                          <div className="text-gray-800 font-medium">
                            {vacancy.salary_min} - {vacancy.salary_max} {vacancy.currency}
                          </div>
                        </div>

                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {vacancy.job_description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No vacancies found
                </div>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, filteredVacancies.length)} of{' '}
                  {filteredVacancies.length} vacancies
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='mt-6 shadow-[9px_9px_15px_5px_#c8bfbf] rounded-xl p-6 hover:shadow-none transition-all'>
          <RecentActivities activities={activities} />
        </div>
      </div>

      {isModalOpen && (
        // <div className="fixed inset-0 z-50 flex justify-end">
        //   <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
        //   <div className="relative h-full w-full max-w-[560px] bg-white shadow-2xl overflow-y-auto">
        //     <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
        //       <h2 className="text-xl font-semibold text-gray-800">
        //         {selectedVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}
        //       </h2>
        //       <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
        //         <X className="w-5 h-5 text-gray-600" />
        //       </button>
        //     </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedVacancy ? 'Edit Vacancy' : 'Add New Vacancy'}>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <FormInput
                        label="Job Title"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleInputChange}
                        error={errors.title}
                        required
                        placeholder="e.g., Retail Sales Associate"
                      />
                    </div>

                    <FormInput
                      label="Department"
                      name="department"
                      type="select"
                      value={formData.department || ''}
                      onChange={handleInputChange}
                      error={errors.department}
                      required
                      options={departments.map(d => ({ value: d, label: d }))}
                    />

                    <FormInput
                      label="Employment Type"
                      name="employment_type"
                      type="select"
                      value={formData.employment_type || ''}
                      onChange={handleInputChange}
                      error={errors.employment_type}
                      required
                      options={employmentTypes.map(t => ({ value: t, label: t }))}
                    />

                    <div className="md:col-span-2">
                      <FormInput
                        label="Work Location"
                        name="work_location"
                        value={formData.work_location || ''}
                        onChange={handleInputChange}
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
                      onChange={handleInputChange}
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
                      value={formData.salary_min || ''}
                      onChange={handleInputChange}
                      error={errors.salary_min}
                      required
                      placeholder="5000"
                    />

                    <FormInput
                      label="Maximum Salary"
                      name="salary_max"
                      type="number"
                      value={formData.salary_max || ''}
                      onChange={handleInputChange}
                      error={errors.salary_max}
                      required
                      placeholder="7000"
                    />

                    <FormInput
                      label="Currency"
                      name="currency"
                      value={formData.currency || 'ETB'}
                      onChange={handleInputChange}
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
                      value={formData.job_description || ''}
                      onChange={handleInputChange}
                      error={errors.job_description}
                      required
                      placeholder="Describe the role and responsibilities..."
                      rows={4}
                    />

                    <FormInput
                      label="Requirements"
                      name="requirements"
                      type="textarea"
                      value={formData.requirements || ''}
                      onChange={handleInputChange}
                      placeholder="List required qualifications and skills..."
                      rows={3}
                    />

                    <FormInput
                      label="Benefits"
                      name="benefits"
                      type="textarea"
                      value={formData.benefits || ''}
                      onChange={handleInputChange}
                      placeholder="Describe employee benefits..."
                      rows={3}
                    />

                    <FormInput
                      label="How to Apply"
                      name="how_to_apply"
                      type="textarea"
                      value={formData.how_to_apply || ''}
                      onChange={handleInputChange}
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
                      value={formData.posted_date || ''}
                      onChange={handleInputChange}
                      error={errors.posted_date}
                      required
                    />

                    <FormInput
                      label="Closing Date"
                      name="closing_date"
                      type="date"
                      value={formData.closing_date || ''}
                      onChange={handleInputChange}
                      error={errors.closing_date}
                      required
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Contact Email"
                      name="contact_email"
                      type="email"
                      value={formData.contact_email || ''}
                      onChange={handleInputChange}
                      error={errors.contact_email}
                      required
                      placeholder="hr@example.com"
                    />

                    <FormInput
                      label="Contact Phone"
                      name="contact_phone"
                      type="tel"
                      value={formData.contact_phone || ''}
                      onChange={handleInputChange}
                      error={errors.contact_phone}
                      required
                      placeholder="+251911223344"
                    />

                    <div className="md:col-span-2">
                      <FormInput
                        label="Address"
                        name="address"
                        value={formData.address || ''}
                        onChange={handleInputChange}
                        placeholder="Office address..."
                      />
                    </div>

                    <FormInput
                      label="Thumbnail URL"
                      name="thumbnail"
                      value={formData.thumbnail || ''}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  {selectedVacancy ? 'Update Vacancy' : 'Create Vacancy'}
                </button>
              </div>
            </form>
          </Modal>
        //   </div>
        // </div>
      )}

      {isViewModalOpen && selectedVacancy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)} />
          <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Vacancy Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4 pb-4 border-b">
                <img
                  src={selectedVacancy.thumbnail || 'https://via.placeholder.com/100'}
                  alt={selectedVacancy.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedVacancy.title}</h3>
                  <p className="text-gray-600 mt-1">{selectedVacancy.department} • {selectedVacancy.employment_type}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded text-sm font-medium">
                      {selectedVacancy.number_of_positions} positions
                    </span>
                    {isClosingSoon(selectedVacancy.closing_date) && (
                      <span className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm font-medium">
                        Closing Soon
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Salary Range</p>
                  <p className="text-gray-800 font-medium">
                    {selectedVacancy.salary_min} - {selectedVacancy.salary_max} {selectedVacancy.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800 font-medium">{selectedVacancy.work_location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posted Date</p>
                  <p className="text-gray-800 font-medium">{new Date(selectedVacancy.posted_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Closing Date</p>
                  <p className="text-gray-800 font-medium">{new Date(selectedVacancy.closing_date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-2">Job Description</p>
                  <p className="text-gray-800">{selectedVacancy.job_description}</p>
                </div>

                {selectedVacancy.requirements && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-2">Requirements</p>
                    <p className="text-gray-800">{selectedVacancy.requirements}</p>
                  </div>
                )}

                {selectedVacancy.benefits && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-2">Benefits</p>
                    <p className="text-gray-800">{selectedVacancy.benefits}</p>
                  </div>
                )}

                {selectedVacancy.how_to_apply && (
                  <div>
                    <p className="text-sm text-gray-500 font-medium mb-2">How to Apply</p>
                    <p className="text-gray-800">{selectedVacancy.how_to_apply}</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 font-medium mb-2">Contact Information</p>
                <div className="space-y-1">
                  <p className="text-gray-800"><strong>Email:</strong> {selectedVacancy.contact_email}</p>
                  <p className="text-gray-800"><strong>Phone:</strong> {selectedVacancy.contact_phone}</p>
                  {selectedVacancy.address && (
                    <p className="text-gray-800"><strong>Address:</strong> {selectedVacancy.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={selectedVacancy?.title || ''}
      />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
    </AdminLayout>
  );
};

export default VacanciesCRUD;
