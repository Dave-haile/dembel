import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminContact = () => {
  const { contacts: initialContacts, activities, counts, flash } = usePage().props;
  const [contacts, setContacts] = useState(initialContacts || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);

  useEffect(() => {
    setContacts(Array.isArray(initialContacts) ? initialContacts : (initialContacts?.data || []));
  }, [initialContacts]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  const itemsPerPage = perPageCount === "all" ? contacts?.length || 0 : perPageCount;

  const filtered = (contacts || []).filter((c) => {
    const t = searchTerm.toLowerCase();
    return (
      (c.address || "").toLowerCase().includes(t) ||
      (c.phone || "").toLowerCase().includes(t) ||
      (c.fax || "").toLowerCase().includes(t) ||
      (c.email || "").toLowerCase().includes(t)
    );
  });
  const visible = filtered.slice(0, itemsPerPage || filtered.length);

  const fetchContacts = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.contacts.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setContacts(list);
    } catch (e) {
      console.error("Failed to load contacts:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.address?.trim()) newErrors.address = "Address is required";
    if (!formData.phone?.trim()) newErrors.phone = "Phone is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCreate = () => {
    setFormData({ address: "", phone: "", fax: "", email: "" });
    setSelectedContact(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (contact) => {
    setFormData({ ...contact });
    setSelectedContact(contact);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsViewModalOpen(true);
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    const fd = new FormData();
    fd.append("address", formData.address ?? "");
    fd.append("phone", formData.phone ?? "");
    if (typeof formData.fax === "string") fd.append("fax", formData.fax);
    fd.append("email", formData.email ?? "");

    if (selectedContact) {
      fd.append("_method", "put");
      router.post(window.route("admin.contacts.update", selectedContact.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update contact", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedContact(null);
          router.reload({ only: ["contacts", "counts"] });
        },
      });
    } else {
      router.post(window.route("admin.contacts.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create contact", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedContact(null);
          router.reload({ only: ["contacts", "counts"] });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selectedContact) return;
    router.post(
      window.route("admin.contacts.destroy", selectedContact.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedContact(null);
          router.reload({ only: ["contacts", "counts"] });
        },
      }
    );
  };

  const computedCounts = {
    total: counts?.total ?? contacts.length,
    with_email: counts?.with_email ?? contacts.filter((c) => !!c.email).length,
  };

  return (
    <AdminLayout>
      <Head title="Admin Contacts" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Contacts Management</h1>
            <p className="text-gray-600 mt-1">Manage company contact points</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Contact
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Contacts</p>
            <p className="text-3xl font-bold text-gray-800">{computedCounts.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">With Email</p>
            <p className="text-3xl font-bold text-blue-600">{computedCounts.with_email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-6 shadow-2xl rounded-xl p-6 min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Add more:</span>
                  {[5, 10, 20].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() =>
                        fetchContacts(
                          (perPageCount === "all" ? contacts.length : perPageCount || 0) + n
                        )
                      }
                      disabled={loading}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => fetchContacts("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visible.length > 0 ? (
                  visible.map((c) => (
                    <div key={c.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{c.address}</h3>
                              <div className="text-sm text-gray-600 break-words">
                                <div>Phone: {c.phone || '—'}</div>
                                <div>Fax: {c.fax || '—'}</div>
                                <div>Email: {c.email || '—'}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(c)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(c)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(c)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No contacts found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities activities={activities} subjectType="contact" onViewMore={() => router.visit(window.route('admin.activity.index', { subject: 'contact' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedContact ? "Edit Contact" : "Add Contact"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Address" name="address" value={formData.address || ""} onChange={handleInputChange} error={errors.address} required />
              <FormInput label="Phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} error={errors.phone} required />
              <FormInput label="Fax" name="fax" value={formData.fax || ""} onChange={handleInputChange} />
              <FormInput label="Email" name="email" type="email" value={formData.email || ""} onChange={handleInputChange} error={errors.email} required />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedContact ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Contact Details">
          {selectedContact && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-gray-800 font-medium break-words">{selectedContact.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800 font-medium break-words">{selectedContact.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fax</p>
                  <p className="text-gray-800 font-medium break-words">{selectedContact.fax || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800 font-medium break-words">{selectedContact.email || '—'}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Contact"
          message={`Are you sure you want to delete "${selectedContact?.address || "this contact"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminContact;

