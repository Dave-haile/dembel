import { useEffect, useRef, useState } from "react";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";
import FormInput from "../components/FormInput";
import Toast from "../components/Toast";

const AdminSettings = () => {
  const { user: initialUser, flash } = usePage().props;
  const [form, setForm] = useState({
    name: initialUser?.name || "",
    email: initialUser?.email || "",
    phone: initialUser?.phone || "",
    current_password: "",
    password: "",
    password_confirmation: "",
    avatar: null,
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileRef = useRef(null);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const onChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") {
      const file = files?.[0] || null;
      setForm((p) => ({ ...p, [name]: file }));
      if (file) {
        const url = URL.createObjectURL(file);
        setAvatarPreview(url);
      } else {
        setAvatarPreview(null);
      }
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
      return;
    }
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name ?? "");
    fd.append("email", form.email ?? "");
    fd.append("phone", form.phone ?? "");
    if (form.avatar instanceof File) fd.append("avatar", form.avatar);
    if (form.password) {
      fd.append("current_password", form.current_password || "");
      fd.append("password", form.password);
      fd.append("password_confirmation", form.password_confirmation || "");
    }

    router.post(window.route("admin.settings.update"), fd, {
      forceFormData: true,
      onError: (errs) => {
        setErrors(errs || {});
        setToast({ message: errs?.message || "Failed to update profile", type: "error" });
        setToast({ message: Object.values(errs)[0], type: 'error' });
      },
      onSuccess: () => {
        setToast({ message: "Profile updated successfully", type: "success" });
        setForm((p) => ({ ...p, current_password: "", password: "", password_confirmation: "" }));
        router.reload({ only: ["user"] });
      },
    });
  };

  const currentAvatarSrc = avatarPreview
    ? avatarPreview
    : initialUser?.avatar
    ? `/${initialUser.avatar}`
    : "/users/default.png";

  return (
    <AdminLayout>
      <Head title="Admin Settings" />
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600 mt-1">Update your personal information</p>
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Personal Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Name" name="name" value={form.name} onChange={onChange} error={errors.name} required />
                <FormInput label="Email" name="email" type="email" value={form.email} onChange={onChange} error={errors.email} required />
                <FormInput label="Phone" name="phone" value={form.phone || ""} onChange={onChange} error={errors.phone} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Current password" type="password" name="current_password" value={form.current_password} onChange={onChange} error={errors.current_password} />
                <FormInput label="New password" type="password" name="password" value={form.password} onChange={onChange} error={errors.password} />
                <FormInput label="Confirm password" type="password" name="password_confirmation" value={form.password_confirmation} onChange={onChange} error={errors.password_confirmation} />
              </div>
              <p className="text-xs text-gray-500">Provide current password to set a new password.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-800">Profile Image</h2>
              <div className="flex items-center gap-4">
                <img src={currentAvatarSrc} alt="Avatar" className="w-20 h-20 rounded-full object-cover border" />
                <div className="flex-1">
                  <input ref={fileRef} type="file" name="avatar" accept="image/*" onChange={onChange} className="block w-full text-sm" />
                  {errors.avatar && <p className="text-sm text-red-600 mt-1">{errors.avatar}</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button type="button" onClick={() => router.visit(window.route("admin.dashboard"))} className="px-4 py-2 border rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Save Changes</button>
            </div>
          </div>
        </form>

        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;

