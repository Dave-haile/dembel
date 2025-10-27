// import React, { useMemo, useState } from "react";
// import AdminLayout from "../Shared/AdminLayout";
// import DataTable from "../Shared/DataTable";
// import ModalForm from "../Shared/ModalForm";
// import DeleteConfirmModal from "../Shared/DeleteConfirmModal";
// import ActivityLog from "../Shared/ActivityLog";

// const AdminFreeSpace = ({ freeSpaces = [], floors = [] }) => {
//   const [items, setItems] = useState(freeSpaces);
//   const [searchTerm, setSearchTerm] = useState("");
//   // incremental display; no traditional page index
//   const [itemsPerPage] = useState(5);
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const [isSheetOpen, setIsSheetOpen] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState(null);
//   const [activityLog, setActivityLog] = useState([]);
//   const [notice, setNotice] = useState(null);

//   const filteredItems = useMemo(() => {
//     const q = searchTerm.trim().toLowerCase();
//     if (!q) return items;
//     return items.filter((s) =>
//       [
//         s.name,
//         s.wing_or_zone,
//         s.dimensions,
//         s.availability_status,
//         s?.floor?.name,
//       ]
//         .map((v) => (v ?? "").toString().toLowerCase())
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
//       entity: "FreeSpace",
//       item: payload?.name || payload?.id,
//       timestamp: new Date().toISOString(),
//       user: "Admin",
//     };
//     setActivityLog((prev) => [entry, ...prev.slice(0, 49)]);
//   };

//   const handleCreate = () => {
//     setEditingItem(null);
//     setIsSheetOpen(true);
//   };

//   async function submitForm(e) {
//     e.preventDefault();
//     const form = e.target;
//     const formData = new FormData(form);

//     try {
//       let res;
//       if (editingItem) {
//         res = await fetch(`/admin/free-spaces/${editingItem.id}`, {
//           method: "POST",
//           headers: { "X-Requested-With": "XMLHttpRequest" },
//           body: (() => {
//             const fd = new FormData();
//             for (const [k, v] of formData.entries()) fd.append(k, v);
//             fd.append("_method", "PUT");
//             return fd;
//           })(),
//           credentials: "same-origin",
//         });
//       } else {
//         res = await fetch(`/admin/free-spaces`, {
//           method: "POST",
//           headers: { "X-Requested-With": "XMLHttpRequest" },
//           body: formData,
//           credentials: "same-origin",
//         });
//       }
//       if (!res.ok) throw new Error("Failed to save");
//       const saved = await res.json();
//       setItems((prev) => {
//         const exists = prev.find((p) => p.id === saved.id);
//         if (exists) return prev.map((p) => (p.id === saved.id ? saved : p));
//         return [saved, ...prev];
//       });
//       setNotice({ type: "success", message: editingItem ? "Updated." : "Created." });
//       log(editingItem ? "Updated" : "Created", saved);
//       setIsSheetOpen(false);
//       setEditingItem(null);
//       form.reset();
//     } catch (err) {
//       setNotice({ type: "error", message: err.message || "Error" });
//     }
//   }

//   async function confirmDelete() {
//     if (!itemToDelete) return;
//     try {
//       const res = await fetch(`/admin/free-spaces/${itemToDelete}`, {
//         method: "DELETE",
//         headers: { "X-Requested-With": "XMLHttpRequest" },
//         credentials: "same-origin",
//       });
//       if (!res.ok) throw new Error("Failed to delete");
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
//     {
//       header: "Image",
//       render: (row) => (
//         <img
//           src={`/${row.thumbnail}`}
//           alt={row.name}
//           className="h-10 w-14 rounded object-cover ring-1 ring-gray-200"
//         />
//       ),
//     },
//     { header: "Name", render: (row) => <span className="font-semibold">{row.name}</span> },
//     { header: "Floor", render: (row) => row.floor?.name || "—" },
//     { header: "Zone", accessor: "wing_or_zone" },
//     {
//       header: "Area",
//       render: (row) => (
//         <span>
//           {row.area_sqm ? Number(row.area_sqm).toFixed(2) : "—"} m²
//         </span>
//       ),
//     },
//     {
//       header: "Rent",
//       render: (row) => (
//         <div className="text-sm">
//           <div className="font-medium">
//             {row.monthly_rent ? `${row.rent_currency || "ETB"} ${row.monthly_rent}` : "—"}
//           </div>
//           {row.negotiable && <div className="text-gray-500">Negotiable</div>}
//         </div>
//       ),
//     },
//     { header: "Status", accessor: "availability_status" },
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
//       currentPage={"free-spaces"}
//       setCurrentPage={setCurrentPage}
//       setSidebarOpen={setSidebarOpen}
//       sidebarOpen={sidebarOpen}
//     >
//       <div className="p-4 md:p-6">
//         <div className="mb-6 flex items-start justify-between">
//           <div>
//             <h1 className="text-2xl font-bold">Free Spaces</h1>
//             <p className="mt-1 text-sm text-gray-500">Manage available spaces for rent</p>
//           </div>
//           <button
//             onClick={handleCreate}
//             className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white shadow hover:bg-blue-700"
//           >
//             Add Space
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
//             <h3 className="text-base font-semibold text-gray-900">All Free Spaces</h3>
//             <div className="relative w-full max-w-xs">
//               <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 105.358 11.02l3.686 3.686a.75.75 0 101.06-1.06l-3.686-3.686A6.75 6.75 0 0010.5 3.75zm-5.25 6.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z" clipRule="evenodd" /></svg>
//               </span>
//               <input
//                 type="text"
//                 placeholder="Search spaces..."
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   // reset view to start
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
//               setIsSheetOpen(true);
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
//           isOpen={isSheetOpen}
//           onClose={() => {
//             setIsSheetOpen(false);
//             setEditingItem(null);
//           }}
//           title={editingItem ? "Edit Free Space" : "Add Free Space"}
//           onSubmit={submitForm}
//         >
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <input name="name" defaultValue={editingItem?.name || ""} required placeholder="Name *" className="p-2 border rounded" />
//             <select name="floor_id" defaultValue={editingItem?.floor_id || editingItem?.floor?.id || ""} className="p-2 border rounded">
//               <option value="">Select floor</option>
//               {floors.map((f) => (
//                 <option key={f.id} value={f.id}>{f.name}</option>
//               ))}
//             </select>
//             <input name="wing_or_zone" defaultValue={editingItem?.wing_or_zone || ""} placeholder="Wing / Zone" className="p-2 border rounded" />
//             <input name="area_sqm" defaultValue={editingItem?.area_sqm || ""} placeholder="Area (sqm)" className="p-2 border rounded" />
//             <input name="dimensions" defaultValue={editingItem?.dimensions || ""} placeholder="Dimensions" className="p-2 border rounded" />
//             <select name="availability_status" defaultValue={editingItem?.availability_status || "available"} className="p-2 border rounded">
//               <option value="available">Available</option>
//               <option value="reserved">Reserved</option>
//               <option value="occupied">Occupied</option>
//             </select>
//             <input name="monthly_rent" defaultValue={editingItem?.monthly_rent || ""} placeholder="Monthly Rent" className="p-2 border rounded" />
//             <input name="rent_currency" defaultValue={editingItem?.rent_currency || "ETB"} placeholder="Currency" className="p-2 border rounded" />
//             <input name="contact_person" defaultValue={editingItem?.contact_person || ""} placeholder="Contact Person" className="p-2 border rounded" />
//             <input name="contact_phone" defaultValue={editingItem?.contact_phone || ""} placeholder="Contact Phone" className="p-2 border rounded" />
//             <input name="contact_email" defaultValue={editingItem?.contact_email || ""} placeholder="Contact Email" className="p-2 border rounded" />
//             <input name="slug" defaultValue={editingItem?.slug || ""} placeholder="Slug" className="p-2 border rounded" />
//             <input name="thumbnail" type="file" accept="image/*" className="p-2 border rounded" />
//           </div>
//         </ModalForm>

//         <DeleteConfirmModal
//           isOpen={isDeleteModalOpen}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={confirmDelete}
//           itemName={items.find((i) => i.id === itemToDelete)?.name || "this free space"}
//         />
//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminFreeSpace;
import { useState, useEffect, useRef } from 'react';
import { Plus, Edit, Trash2, Eye, Search, CheckCircle, XCircle } from 'lucide-react';
import Toast from '../components/Toast';
import DeleteConfirmation from '../components/DeleteConfirmation';
import FormInput from '../components/FormInput';
import RecentActivities from '../components/RecentActivities';
import Modal from '../components/Modal';
import AdminLayout from '../Shared/AdminLayout';
import { usePage, Head, router } from '@inertiajs/react';

const FreeSpacesCRUD = () => {
  const { freeSpaces, floors, activities: active, counts } = usePage().props
  const [spaces, setSpaces] = useState(freeSpaces)
  const [activities] = useState(active);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10); // initial load size
  const maxColumns = 6;
  const [isColumnMenuOpen, setIsColumnMenuOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState([
    'space',
    'floor',
    'area',
    'rent',
    'status',
  ]);
  const columnMenuRef = useRef(null);

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

  // Keep spaces in sync with latest server props after Inertia responses
  useEffect(() => {
    setSpaces(freeSpaces);
  }, [freeSpaces]);

  const itemsPerPage = perPageCount === 'all' ? (spaces?.length || 0) : perPageCount;

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = (space.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (space.wing_or_zone || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || space.availability_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const visibleSpaces = filteredSpaces.slice(0, itemsPerPage || filteredSpaces.length);

  const fetchFreeSpaces = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route('admin.free-spaces.list', {
        per_page: size === 'all' ? 'all' : String(size)
      });
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const items = Array.isArray(data) ? data : (data.data || data);
      setSpaces(items);
    } catch (e) {
      console.error('Failed to load free spaces:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreeSpaces(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!formData.floor_id) newErrors.floor_id = 'Floor is required';
    if (!formData.wing_or_zone?.trim()) newErrors.wing_or_zone = 'Wing/Zone is required';
    if (!formData.area_sqm?.trim()) newErrors.area_sqm = 'Area is required';
    if (!formData.monthly_rent?.trim()) newErrors.monthly_rent = 'Monthly rent is required';
    if (!formData.contact_phone?.trim()) newErrors.contact_phone = 'Contact phone is required';
    if (!formData.contact_email?.trim()) {
      newErrors.contact_email = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = 'Email is invalid';
    }
    if (!formData.slug?.trim()) newErrors.slug = 'Slug is required';
    if (!formData.availability_status?.trim()) newErrors.availability_status = 'Status is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = e.target.checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: e.target.files[0] }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'floor_id' ? Number(value) : value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCreate = () => {
    setFormData({
      name: '',
      floor_id: 0,
      wing_or_zone: '',
      area_sqm: '',
      dimensions: '',
      has_window: false,
      has_ventilation: false,
      has_plumbing: false,
      has_electricity: false,
      features: [],
      monthly_rent: '',
      rent_currency: 'ETB',
      rent_includes: [],
      negotiable: false,
      thumbnail: '',
      gallery: [],
      virtual_tour_url: '',
      short_description: '',
      full_description: '',
      contact_person: '',
      contact_phone: '',
      contact_email: '',
      meta_title: '',
      meta_description: '',
      slug: '',
      availability_status: 'available'
    });
    setSelectedSpace(null);
    setErrors({});
    setIsModalOpen(true);
  };
  const handleLogoFile = (file) => {
    if (!file) return;
    // Frontend validation: only images and max 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, logo: 'Please select a valid image file.' }));
      setToast({ message: 'Invalid file type. Please select an image.', type: 'error' });
      return;
    }
    if (file.size > MAX_SIZE) {
      setErrors((prev) => ({ ...prev, logo: 'Image must be 5MB or smaller.' }));
      setToast({ message: 'Image is too large (max 5MB).', type: 'error' });
      return;
    }
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
    console.log("SELECTED LOGO FILE:", file);
  };

  const onLogoInputChange = (e) => {
    const file = e.target.files?.[0];
    handleLogoFile(file);
  };

  const onLogoDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleLogoFile(file);
    setIsDragging(false);
  };

  const onLogoDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onLogoDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  useEffect(() => {
    return () => {
      if (logoPreview) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const handleEdit = (space) => {
    setFormData(space);
    setSelectedSpace(space);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleView = (space) => {
    setSelectedSpace(space);
    setIsViewModalOpen(true);
  };

  const handleDelete = (space) => {
    setSelectedSpace(space);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: 'Please fix the errors in the form', type: 'error' });
      return;
    }

    const fd = new FormData();
    // Basic details
    fd.append('name', formData.name ?? '');
    if (formData.floor_id) fd.append('floor_id', String(formData.floor_id));
    fd.append('wing_or_zone', formData.wing_or_zone ?? '');
    if (formData.area_sqm !== undefined && formData.area_sqm !== '') fd.append('area_sqm', String(formData.area_sqm));
    fd.append('dimensions', formData.dimensions ?? '');
    fd.append('has_window', formData.has_window ? '1' : '0');
    fd.append('has_ventilation', formData.has_ventilation ? '1' : '0');
    fd.append('has_plumbing', formData.has_plumbing ? '1' : '0');
    fd.append('has_electricity', formData.has_electricity ? '1' : '0');
    if (Array.isArray(formData.features)) fd.append('features', JSON.stringify(formData.features));
    if (formData.monthly_rent !== undefined && formData.monthly_rent !== '') fd.append('monthly_rent', String(formData.monthly_rent));
    fd.append('rent_currency', formData.rent_currency ?? '');
    if (Array.isArray(formData.rent_includes)) fd.append('rent_includes', JSON.stringify(formData.rent_includes));
    fd.append('negotiable', formData.negotiable ? '1' : '0');
    // File
    if (formData.thumbnail instanceof File) {
      fd.append('thumbnail', formData.thumbnail);
    }
    // Optional gallery array not implemented in UI yet
    fd.append('virtual_tour_url', formData.virtual_tour_url ?? '');
    fd.append('short_description', formData.short_description ?? '');
    fd.append('full_description', formData.full_description ?? '');
    fd.append('contact_person', formData.contact_person ?? '');
    fd.append('contact_phone', formData.contact_phone ?? '');
    fd.append('contact_email', formData.contact_email ?? '');
    fd.append('meta_title', formData.meta_title ?? '');
    fd.append('meta_description', formData.meta_description ?? '');
    fd.append('slug', formData.slug ?? '');
    fd.append('availability_status', formData.availability_status ?? 'available');

    if (selectedSpace) {
      fd.append('_method', 'put');
      router.post(
        window.route('admin.free-spaces.update', selectedSpace.id),
        fd,
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedSpace(null);
            setToast({ message: 'Space updated successfully', type: 'success' });
            router.reload({ only: ['freeSpaces', 'counts'] });
          },
        }
      );
    } else {
      router.post(
        window.route('admin.free-spaces.store'),
        fd,
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedSpace(null);
            setToast({ message: 'Space created successfully', type: 'success' });
            router.reload({ only: ['freeSpaces', 'counts'] });
          },
        }
      );
    }
  };

  const confirmDelete = () => {
    if (selectedSpace) {
      router.post(
        window.route('admin.free-spaces.destroy', selectedSpace.id),
        { _method: 'delete' },
        {
          onSuccess: () => {
            setIsDeleteModalOpen(false);
            setSelectedSpace(null);
            setToast({ message: 'Space deleted successfully', type: 'success' });
            router.reload({ only: ['freeSpaces', 'counts'] });
          },
        }
      );
    }
  };

  // (Activity logging is handled server-side via AdminController)

  const getStatusBadge = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-700',
      reserved: 'bg-yellow-100 text-yellow-700',
      occupied: 'bg-red-100 text-red-700'
    };
    return colors[status] || colors.available;
  };

  const allColumns = [
    {
      key: 'space',
      label: 'Space',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.thumbnail ? `/${row.thumbnail}` : 'https://via.placeholder.com/120x80?text=No+Img'}
            alt={row.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium text-gray-800">{row.name}</p>
            <p className="text-sm text-gray-500">{row.wing_or_zone}</p>
          </div>
        </div>
      ),
    },
    { key: 'floor', label: 'Floor', render: (row) => row.floor?.name || '—' },
    {
      key: 'area',
      label: 'Area',
      render: (row) => (
        <div className="text-sm text-gray-800">
          {row.area_sqm} m²
          {row.dimensions && <div className="text-xs text-gray-500">{row.dimensions}</div>}
        </div>
      ),
    },
    {
      key: 'rent',
      label: 'Rent',
      render: (row) => (
        <div className="text-sm">
          <p className="font-medium text-gray-800">{row.rent_currency || 'ETB'} {row.monthly_rent}</p>
          {row.negotiable && <p className="text-xs text-green-600">Negotiable</p>}
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(row.availability_status)}`}>
          {row.availability_status}
        </span>
      ),
    },
    {
      key: 'contact',
      label: 'Contact',
      render: (row) => (
        <div className="text-sm">
          <div>{row.contact_phone || '—'}</div>
          <div className="text-gray-500">{row.contact_email || '—'}</div>
        </div>
      ),
    },
  ];

  const toggleColumn = (key) => {
    setSelectedColumns((prev) => {
      const exists = prev.includes(key);
      if (exists) return prev.filter((k) => k !== key);
      if (prev.length >= maxColumns) return prev;
      return [...prev, key];
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isColumnMenuOpen && columnMenuRef.current && !columnMenuRef.current.contains(e.target)) {
        setIsColumnMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isColumnMenuOpen]);

  return (
    <AdminLayout>
      <Head title="Admin Free Space" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Free Spaces Management</h1>
            <p className="text-gray-600 mt-1">Manage available rental spaces</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Space
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Spaces</p>
            <p className="text-3xl font-bold text-gray-800">{counts.count}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Available</p>
            <p className="text-3xl font-bold text-green-600">
              {counts.available}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Reserved</p>
            <p className="text-3xl font-bold text-yellow-600">
              {counts.reserved}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Occupied</p>
            <p className="text-3xl font-bold text-red-600">
              {counts.occupied}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="lg:col-span-2 space-y-6 shadow-2xl rounded-xl p-6 min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search spaces..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">All Status &nbsp; &nbsp; &nbsp;</option>
                  <option value="available">Available</option>
                  <option value="reserved">Reserved</option>
                  <option value="occupied">Occupied</option>
                </select>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Add more:</span>
                  {[5, 10, 20].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => fetchFreeSpaces((perPageCount === 'all' ? spaces.length : (perPageCount || 0)) + n)}
                      disabled={loading}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => fetchFreeSpaces('all')}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
                <div className="relative" ref={columnMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsColumnMenuOpen((v) => !v)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    title="Customize columns"
                  >
                    Columns
                  </button>
                  {isColumnMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-2">
                      <p className="px-2 py-1 text-xs text-gray-500">Select up to {maxColumns} columns</p>
                      <div className="max-h-60 overflow-auto divide-y divide-gray-100">
                        {allColumns.map((col) => (
                          <label key={col.key} className="flex items-center gap-2 px-2 py-2 cursor-pointer hover:bg-gray-50">
                            <input
                              type="checkbox"
                              checked={selectedColumns.includes(col.key)}
                              onChange={() => toggleColumn(col.key)}
                              className="w-4 h-4 rounded text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm text-gray-700">{col.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      {selectedColumns.map((key) => {
                        const col = allColumns.find((c) => c.key === key);
                        return (
                          <th key={key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">{col?.label}</th>
                        );
                      })}
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {visibleSpaces.length > 0 ? (
                      visibleSpaces.map((space) => (
                        <tr key={space.id} className="hover:bg-gray-50 transition-colors">
                          {selectedColumns.map((key) => {
                            const col = allColumns.find((c) => c.key === key);
                            return (
                              <td key={key} className="px-4 py-4">
                                {col?.render(space)}
                              </td>
                            );
                          })}
                          <td className="px-4 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleView(space)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(space)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(space)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={selectedColumns.length + 1} className="px-4 py-8 text-center text-gray-500">
                          No spaces found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Showing {Math.min(visibleSpaces.length, filteredSpaces.length)} of {filteredSpaces.length} spaces
                </p>
                {loading && <span className="text-sm text-gray-500">Loading…</span>}
              </div>
            </div>
          </div>

          <div className='mt-6 shadow-[9px_9px_15px_5px_#c8bfbf] rounded-xl p-6 hover:shadow-none transition-all'>
            <RecentActivities activities={activities} subjectType={"free_space"} onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'free_space' }))} />
          </div>
        </div>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedSpace ? 'Edit Space' : 'Add New Space'}>
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormInput
                      label="Space Name"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      error={errors.name}
                      required
                      placeholder="e.g., Office Space A1"
                    />

                    <FormInput
                      label="Floor"
                      name="floor_id"
                      type="select"
                      value={formData.floor_id || ''}
                      onChange={handleInputChange}
                      error={errors.floor_id}
                      required
                      options={floors.map(f => ({ value: f.id, label: f.name }))}
                    />

                    <FormInput
                      label="Wing/Zone"
                      name="wing_or_zone"
                      value={formData.wing_or_zone || ''}
                      onChange={handleInputChange}
                      error={errors.wing_or_zone}
                      required
                      placeholder="e.g., North Wing"
                    />

                    <FormInput
                      label="Area (sq m)"
                      name="area_sqm"
                      type="number"
                      value={formData.area_sqm || ''}
                      onChange={handleInputChange}
                      error={errors.area_sqm}
                      required
                      placeholder="50.00"
                    />

                    <FormInput
                      label="Dimensions"
                      name="dimensions"
                      value={formData.dimensions || ''}
                      onChange={handleInputChange}
                      placeholder="5m x 10m"
                    />

                    <FormInput
                      label="Availability Status"
                      name="availability_status"
                      type="select"
                      value={formData.availability_status || 'available'}
                      onChange={handleInputChange}
                      options={[
                        { value: 'available', label: 'Available' },
                        { value: 'reserved', label: 'Reserved' },
                        { value: 'occupied', label: 'Occupied' }
                      ]}
                    />

                    <FormInput
                      label="Slug"
                      name="slug"
                      value={formData.slug || ''}
                      onChange={handleInputChange}
                      required
                      placeholder="unique-space-slug"
                    />
                    <br />
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { name: 'has_window', label: 'Has Window' },
                        { name: 'has_ventilation', label: 'Has Ventilation' },
                        { name: 'has_plumbing', label: 'Has Plumbing' },
                        { name: 'has_electricity', label: 'Has Electricity' }
                      ].map(item => (
                        <label key={item.name} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            name={item.name}
                            checked={formData[item.name] || false}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput
                      label="Monthly Rent"
                      name="monthly_rent"
                      type="number"
                      value={formData.monthly_rent || ''}
                      onChange={handleInputChange}
                      error={errors.monthly_rent}
                      required
                      placeholder="1200.00"
                    />

                    <FormInput
                      label="Currency"
                      name="rent_currency"
                      value={formData.rent_currency || 'ETB'}
                      onChange={handleInputChange}
                      placeholder="ETB"
                    />

                    <div className="flex items-end">
                      <label className="flex items-center gap-2 cursor-pointer pb-2">
                        <input
                          type="checkbox"
                          name="negotiable"
                          checked={formData.negotiable || false}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700 font-medium">Negotiable</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
                  <div className="space-y-4">
                    <FormInput
                      label="Short Description"
                      name="short_description"
                      type="textarea"
                      value={formData.short_description || ''}
                      onChange={handleInputChange}
                      placeholder="Brief description..."
                      rows={2}
                    />

                    <FormInput
                      label="Full Description"
                      name="full_description"
                      type="textarea"
                      value={formData.full_description || ''}
                      onChange={handleInputChange}
                      placeholder="Detailed description..."
                      rows={4}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormInput
                      label="Contact Person"
                      name="contact_person"
                      value={formData.contact_person || ''}
                      onChange={handleInputChange}
                      placeholder="Jane Doe"
                    />

                    <FormInput
                      label="Contact Phone"
                      name="contact_phone"
                      type="tel"
                      value={formData.contact_phone || ''}
                      onChange={handleInputChange}
                      error={errors.contact_phone}
                      required
                      placeholder="+1 (555) 123-4567"
                    />

                    <FormInput
                      label="Contact Email"
                      name="contact_email"
                      type="email"
                      value={formData.contact_email || ''}
                      onChange={handleInputChange}
                      error={errors.contact_email}
                      required
                      placeholder="contact@example.com"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Media</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                      <div
                        onDrop={onLogoDrop}
                        onDragOver={onLogoDragOver}
                        onDragEnter={onLogoDragOver}
                        onDragLeave={onLogoDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={`w-full px-4 py-8 border-2 rounded-lg text-center cursor-pointer transition-colors ${isDragging
                            ? 'border-green-400 bg-green-50 ring-2 ring-green-300'
                            : 'border-dashed border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo preview" className="mx-auto h-20 w-20 object-cover rounded" />
                        ) : typeof formData.thumbnail === "string" && formData.thumbnail ? (
                          <img src={`/${formData.thumbnail}`} alt="Current thumbnail" className="mx-auto h-20 w-20 object-cover rounded" />
                        ) : (
                          <div className="text-gray-500">
                            Drag & drop image here, or click to select
                          </div>
                        )}
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        name="thumbnail"
                        accept="image/*"
                        onChange={onLogoInputChange}
                        className="hidden"
                      />
                    </div>

                    <FormInput
                      label="Virtual Tour URL"
                      name="virtual_tour_url"
                      value={formData.virtual_tour_url || ''}
                      onChange={handleInputChange}
                      placeholder="https://virtualtour.example.com"
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
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {selectedSpace ? 'Update Space' : 'Create Space'}
                </button>
              </div>
            </form>
          </Modal>
          //   </div>
          // </div>
        )}

        {isViewModalOpen && selectedSpace && (
          <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Space Details">
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4 pb-4 border-b">
                <img
                  src={`/${selectedSpace.thumbnail}`}
                  alt={selectedSpace.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedSpace.name}</h3>
                  <p className="text-gray-600 mt-1">{selectedSpace.short_description}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusBadge(selectedSpace.availability_status)}`}>
                      {selectedSpace.availability_status}
                    </span>
                    {selectedSpace.negotiable && (
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                        Negotiable
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Floor</p>
                  <p className="text-gray-800 font-medium">{selectedSpace.floor?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Wing/Zone</p>
                  <p className="text-gray-800 font-medium">{selectedSpace.wing_or_zone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Area</p>
                  <p className="text-gray-800 font-medium">{selectedSpace.area_sqm} m²</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Dimensions</p>
                  <p className="text-gray-800 font-medium">{selectedSpace.dimensions || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Monthly Rent</p>
                  <p className="text-gray-800 font-medium">${selectedSpace.monthly_rent} {selectedSpace.rent_currency}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-3">Amenities</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { key: 'has_window', label: 'Window' },
                    { key: 'has_ventilation', label: 'Ventilation' },
                    { key: 'has_plumbing', label: 'Plumbing' },
                    { key: 'has_electricity', label: 'Electricity' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center gap-2">
                      {selectedSpace[item.key] ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-300" />
                      )}
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedSpace.full_description && (
                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-500 mb-2">Full Description</p>
                  <p className="text-gray-800">{selectedSpace.full_description}</p>
                </div>
              )}

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-500 mb-2">Contact Information</p>
                <div className="space-y-1">
                  {selectedSpace.contact_person && (
                    <p className="text-gray-800"><strong>Person:</strong> {selectedSpace.contact_person}</p>
                  )}
                  <p className="text-gray-800"><strong>Phone:</strong> {selectedSpace.contact_phone}</p>
                  <p className="text-gray-800"><strong>Email:</strong> {selectedSpace.contact_email}</p>
                </div>
              </div>
            </div>
          </Modal>
        )}

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemName={selectedSpace?.name || ''}
        />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div></AdminLayout>
  );
};

export default FreeSpacesCRUD;
