import { useEffect, useRef, useState } from "react";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import FormInput from "../components/FormInput";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";

const AdminUsers = () => {
  const { users: initialUsers, activities, counts, flash } = usePage().props;
  const [users, setUsers] = useState(initialUsers || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setUsers(Array.isArray(initialUsers) ? initialUsers : (initialUsers?.data || []));
  }, [initialUsers]);

  useEffect(() => {
    if (flash?.success) {
      setToast({ message: flash.success, type: "success" });
    } else if (flash?.error) {
      setToast({ message: flash.error, type: "error" });
    }
  }, [flash]);

  const itemsPerPage = perPageCount === "all" ? users?.length || 0 : perPageCount;

  const filteredUsers = users.filter((u) => {
    const t = searchTerm.toLowerCase();
    return (
      (u.name || "").toLowerCase().includes(t) ||
      (u.email || "").toLowerCase().includes(t) ||
      (u.phone || "").toLowerCase().includes(t) ||
      (u.role || "").toLowerCase().includes(t)
    );
  });

  const visibleUsers = filteredUsers.slice(0, itemsPerPage || filteredUsers.length);

  const fetchUsers = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.users.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setUsers(list);
    } catch (e) {
      console.error("Failed to load users:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(10);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = "Name is required";
    if (!formData.email?.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!selectedUser && !formData.password?.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "file") {
      const file = files?.[0];
      if (file) {
        const MAX_SIZE = 5 * 1024 * 1024;
        if (!file.type.startsWith("image/")) {
          setErrors((prev) => ({ ...prev, [name]: "Please select a valid image file." }));
          setToast({ message: "Invalid file type. Please select an image.", type: "error" });
          return;
        }
        if (file.size > MAX_SIZE) {
          setErrors((prev) => ({ ...prev, [name]: "Image must be 5MB or smaller." }));
          setToast({ message: "Image is too large (max 5MB).", type: "error" });
          return;
        }
        setFormData((prev) => ({ ...prev, [name]: file }));
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
      } else {
        setFormData((prev) => ({ ...prev, [name]: null }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  useEffect(() => () => { if (avatarPreview) URL.revokeObjectURL(avatarPreview); }, [avatarPreview]);

  const handleCreate = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "admin",
      check: false,
      password: "",
      avatar: "",
    });
    setSelectedUser(null);
    setErrors({});
    setAvatarPreview(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setFormData({ ...user, password: "" });
    setSelectedUser(user);
    setErrors({});
    setAvatarPreview(null);
    setIsModalOpen(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsViewModalOpen(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    const fd = new FormData();
    fd.append("name", formData.name ?? "");
    fd.append("email", formData.email ?? "");
    if (formData.phone) fd.append("phone", formData.phone);
    if (formData.role) fd.append("role", formData.role);
    fd.append("check", formData.check ? "1" : "0");
    if (formData.password) fd.append("password", formData.password);
    if (formData.avatar instanceof File) fd.append("avatar", formData.avatar);

    if (selectedUser) {
      fd.append("_method", "put");
      router.post(window.route("admin.users.update", selectedUser.id), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to update user", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedUser(null);
          setAvatarPreview(null);
        },
      });
    } else {
      router.post(window.route("admin.users.store"), fd, {
        forceFormData: true,
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: errs?.message || "Failed to create user", type: "error" });
        },
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedUser(null);
          setAvatarPreview(null);
        },
      });
    }
  };

  const confirmDelete = () => {
    if (!selectedUser) return;
    router.post(
      window.route("admin.users.destroy", selectedUser.id),
      { _method: "delete" },
      {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedUser(null);
          // Flash message will be handled by the useEffect listening to props.flash
        },
      }
    );
  };

  const computedCounts = {
    total: counts?.total ?? users.length,
    admins: counts?.admins ?? users.filter((u) => String(u.role).toLowerCase() === "admin").length,
    verified:
      counts?.verified ?? users.filter((u) => !!u.email_verified_at).length,
  };

  return (
    <AdminLayout>
      <Head title="Admin Users" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
            <p className="text-gray-600 mt-1">Manage application users</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New User
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Total Users</p>
            <p className="text-3xl font-bold text-gray-800">{computedCounts.total}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Admins</p>
            <p className="text-3xl font-bold text-blue-600">{computedCounts.admins}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-600 mb-1">Verified</p>
            <p className="text-3xl font-bold text-green-600">{computedCounts.verified}</p>
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
                    placeholder="Search users..."
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
                        fetchUsers(
                          (perPageCount === "all" ? users.length : perPageCount || 0) + n
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
                    onClick={() => fetchUsers("all")}
                    disabled={loading}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {visibleUsers.length > 0 ? (
                  visibleUsers.map((u) => (
                    <div key={u.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={u.avatar ? `/${u.avatar}` : "https://via.placeholder.com/80?text=User"}
                          alt={u.name}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-gray-800">{u.name}</h3>
                              <p className="text-sm text-gray-600 break-words">{u.email}</p>
                              <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">{u.role || 'user'}</span>
                                <span className={`px-2 py-1 rounded ${u.email_verified_at ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                  {u.email_verified_at ? "Verified" : "Unverified"}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                              <button onClick={() => handleView(u)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleEdit(u)} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button onClick={() => handleDelete(u)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-500 py-8">No users found</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <RecentActivities activities={activities} subjectType="user" onViewMore={()=>router.visit(window.route('admin.activity.index', { subject: 'user' }))} />
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedUser ? "Edit User" : "Add User"}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="Full Name" name="name" value={formData.name || ""} onChange={handleInputChange} error={errors.name} required />
              <FormInput label="Email" name="email" type="email" value={formData.email || ""} onChange={handleInputChange} error={errors.email} required />
              <FormInput label="Phone" name="phone" value={formData.phone || ""} onChange={handleInputChange} />
              <FormInput
                label="Role"
                name="role"
                type="select"
                value={formData.role || "admin"}
                onChange={handleInputChange}
                options={[
                  { value: "admin", label: "Admin" },
                  { value: "editor", label: "Editor" },
                  { value: "viewer", label: "Viewer" },
                ]}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avatar</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:bg-gray-50"
                >
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Avatar preview" className="mx-auto h-20 w-20 object-cover rounded-full" />
                  ) : typeof formData.avatar === "string" && formData.avatar ? (
                    <img src={`/${formData.avatar}`} alt="Current avatar" className="mx-auto h-20 w-20 object-cover rounded-full" />
                  ) : (
                    <div className="text-gray-500">Click to upload avatar</div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                />
              </div>
              <div className="flex items-center gap-3 mt-6">
                <input id="check" type="checkbox" name="check" checked={!!formData.check} onChange={handleInputChange} className="w-4 h-4" />
                <label htmlFor="check" className="text-sm text-gray-700">Active</label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label={selectedUser ? "Password (optional)" : "Password"} name="password" type="password" value={formData.password || ""} onChange={handleInputChange} error={errors.password} required={!selectedUser} />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">{selectedUser ? "Update" : "Create"}</button>
            </div>
          </form>
        </Modal>

        <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="User Details">
          {selectedUser && (
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <img src={selectedUser.avatar ? `/${selectedUser.avatar}` : "https://via.placeholder.com/120x120?text=User"} alt={selectedUser.name} className="w-24 h-24 rounded-full object-cover" />
                <div>
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                  <div className="mt-2 text-xs flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-1 rounded bg-blue-100 text-blue-700">{selectedUser.role || 'user'}</span>
                    <span className={`px-2 py-1 rounded ${selectedUser.email_verified_at ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {selectedUser.email_verified_at ? "Verified" : "Unverified"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800 font-medium">{selectedUser.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active</p>
                  <p className="text-gray-800 font-medium">{selectedUser.check ? 'Yes' : 'No'}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete User"
          message={`Are you sure you want to delete "${selectedUser?.name || "this user"}"? This action cannot be undone.`}
        />

        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;

