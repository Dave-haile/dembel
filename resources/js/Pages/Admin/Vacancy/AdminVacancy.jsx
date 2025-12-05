import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import Toast from "../components/Toast";
import DeleteConfirmation from "../components/DeleteConfirmation";
import RecentActivities from "../components/RecentActivities";
import Modal from "../components/Modal";
import { usePage, router, Head } from "@inertiajs/react";

import VacancyStats from "./components/VacancyStats";
import VacancyFilters from "./components/VacancyFilters";
import VacancyList from "./components/VacancyList";
import VacancyForm from "./components/VacancyForm";
import VacancyView from "./components/VacancyView";
import AdminLayout from "../Shared/AdminLayout";

const VacanciesCRUD = () => {
  const { vacancies: vacancy, activities, counts } = usePage().props;
  const [items, setItems] = useState(vacancy);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [perPageCount, setPerPageCount] = useState(10);

  // Lock body scroll when the form modal is open
  useEffect(() => {
    if (isModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isModalOpen]);

  const departments = [
    "Retail",
    "Security",
    "Operations",
    "Customer Service",
    "Maintenance",
    "Administration",
  ];
  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
  ];

  const itemsPerPage =
    perPageCount === "all" ? items?.length || 0 : perPageCount;

  const filteredVacancies = items.filter((vacancy) => {
    const matchesSearch =
      vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacancy.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || vacancy.employment_type === filterType;
    const matchesDepartment =
      !filterDepartment || vacancy.department === filterDepartment;
    return matchesSearch && matchesType && matchesDepartment;
  });

  const visibleVacancies = filteredVacancies.slice(
    0,
    itemsPerPage || filteredVacancies.length
  );

  const fetchVacancies = async (size) => {
    try {
      setLoading(true);
      setPerPageCount(size);
      const url = window.route("admin.vacancies.list", {
        per_page: size === "all" ? "all" : String(size),
      });
      const res = await fetch(url, { headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || data;
      setItems(list);
    } catch (e) {
      console.error("Failed to load vacancies:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies(10);
  }, []);

  useEffect(() => {
    setItems(vacancy);
  }, [vacancy]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title?.trim()) newErrors.title = "Title is required";
    if (!formData.employment_type)
      newErrors.employment_type = "Employment type is required";
    if (!formData.work_location?.trim())
      newErrors.work_location = "Work location is required";
    if (
      formData.salary_min &&
      formData.salary_max &&
      formData.salary_min > formData.salary_max
    ) {
      newErrors.salary_max = "Maximum salary must be greater than minimum";
    }
    if (!formData.job_description?.trim())
      newErrors.job_description = "Job description is required";
    if (!formData.posted_date) newErrors.posted_date = "Posted date is required";
    if (!formData.closing_date)
      newErrors.closing_date = "Closing date is required";
    if (!formData.number_of_positions || formData.number_of_positions < 1) {
      newErrors.number_of_positions = "Number of positions must be at least 1";
    }
    if (!/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCreate = () => {
    setFormData({
      title: "",
      department: "",
      employment_type: "",
      work_location: "",
      salary_min: 0,
      salary_max: 0,
      currency: "ETB",
      job_description: "",
      requirements: "",
      benefits: "",
      how_to_apply: "",
      posted_date: new Date().toISOString().split("T")[0],
      closing_date: "",
      number_of_positions: 1,
      contact_email: "",
      contact_phone: "",
      address: "",
      is_approved: 1,
      slug: "",
      thumbnail: "",
    });
    setSelectedVacancy(null);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleLogoFile = (file) => {
    if (!file) return;
    // Frontend validation: only images and max 5MB
    const MAX_SIZE = 5 * 1024 * 1024;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        logo: "Please select a valid image file.",
      }));
      setToast({
        message: "Invalid file type. Please select an image.",
        type: "error",
      });
      return;
    }
    if (file.size > MAX_SIZE) {
      setErrors((prev) => ({ ...prev, logo: "Image must be 5MB or smaller." }));
      setToast({ message: "Image is too large (max 5MB).", type: "error" });
      return;
    }
    setFormData((prev) => ({ ...prev, thumbnail: file }));
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
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
      setToast({ message: "Please fix the errors in the form", type: "error" });
      return;
    }

    const fd = new FormData();
    if (formData.title !== undefined) fd.append("title", formData.title ?? "");
    if (formData.department !== undefined)
      fd.append("department", formData.department ?? "");
    if (formData.employment_type !== undefined)
      fd.append("employment_type", formData.employment_type ?? "");
    if (formData.work_location !== undefined)
      fd.append("work_location", formData.work_location ?? "");
    if (formData.salary_min !== undefined && formData.salary_min !== "")
      fd.append("salary_min", String(formData.salary_min));
    if (formData.salary_max !== undefined && formData.salary_max !== "")
      fd.append("salary_max", String(formData.salary_max));
    if (formData.currency !== undefined)
      fd.append("currency", formData.currency ?? "");
    if (formData.job_description !== undefined)
      fd.append("job_description", formData.job_description ?? "");
    if (formData.requirements !== undefined)
      fd.append("requirements", formData.requirements ?? "");
    if (formData.benefits !== undefined)
      fd.append("benefits", formData.benefits ?? "");
    if (formData.how_to_apply !== undefined)
      fd.append("how_to_apply", formData.how_to_apply ?? "");
    if (formData.posted_date !== undefined)
      fd.append("posted_date", formData.posted_date ?? "");
    if (formData.closing_date !== undefined)
      fd.append("closing_date", formData.closing_date ?? "");
    if (
      formData.number_of_positions !== undefined &&
      formData.number_of_positions !== ""
    )
      fd.append("number_of_positions", String(formData.number_of_positions));
    if (formData.contact_email !== undefined)
      fd.append("contact_email", formData.contact_email ?? "");
    if (formData.contact_phone !== undefined)
      fd.append("contact_phone", formData.contact_phone ?? "");
    if (formData.address !== undefined)
      fd.append("address", formData.address ?? "");
    if (formData.is_approved !== undefined)
      fd.append("is_approved", String(formData.is_approved ? 1 : 0));
    if (formData.slug !== undefined) fd.append("slug", formData.slug ?? "");
    if (formData.thumbnail instanceof File) {
      fd.append("thumbnail", formData.thumbnail);
    }

    if (selectedVacancy) {
      fd.append("_method", "put");
      router.post(
        window.route("admin.vacancies.update", selectedVacancy.id),
        fd,
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setSelectedVacancy(null);
            setToast({
              message: "Vacancy updated successfully",
              type: "success",
            });
            router.reload({ only: ["vacancies", "counts"] });
          },
          onError: (errs) => {
            setErrors(errs || {});
            setToast({ message: "Failed to update vacancy", type: "error" });
            setToast({ message: Object.values(errs)[0], type: "error" });
          },
        }
      );
    } else {
      router.post(window.route("admin.vacancies.store"), fd, {
        onSuccess: () => {
          setIsModalOpen(false);
          setSelectedVacancy(null);
          setToast({
            message: "Vacancy created successfully",
            type: "success",
          });
          router.reload({ only: ["vacancies", "counts"] });
        },
        onError: (errs) => {
          setErrors(errs || {});
          setToast({ message: "Failed to create vacancy", type: "error" });
          setToast({ message: Object.values(errs)[0], type: "error" });
        },
      });
    }
  };

  const confirmDelete = () => {
    if (selectedVacancy) {
      router.post(
        window.route("admin.vacancies.destroy", selectedVacancy.id),
        { _method: "delete" },
        {
          onSuccess: () => {
            setIsDeleteModalOpen(false);
            setSelectedVacancy(null);
            setToast({
              message: "Vacancy deleted successfully",
              type: "success",
            });
            router.reload({ only: ["vacancies", "counts"] });
          },
          onError: (errs) => {
            setErrors(errs || {});
            setToast({ message: "Failed to delete vacancy", type: "error" });
            setToast({ message: Object.values(errs)[0], type: "error" });
          },
        }
      );
    }
  };

  const isClosingSoon = (closingDate) => {
    const closing = new Date(closingDate);
    const today = new Date();
    const diffDays = Math.ceil(
      (closing.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays <= 7 && diffDays >= 0;
  };

  return (
    <AdminLayout>
      <Head title="Admin Vacancy" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Vacancies Management
            </h1>
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

        <VacancyStats counts={counts} items={items} />

        <div className="grid grid-cols-1 gap-6">
          <div className="lg:col-span-2 space-y-6 shadow-2xl rounded-xl min-h-[calc(100vh-16rem)] hover:shadow-none transition-all">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <VacancyFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterType={filterType}
                setFilterType={setFilterType}
                filterDepartment={filterDepartment}
                setFilterDepartment={setFilterDepartment}
                departments={departments}
                employmentTypes={employmentTypes}
                fetchVacancies={fetchVacancies}
                items={items}
                perPageCount={perPageCount}
                loading={loading}
                setPerPageCount={setPerPageCount}
              />

              <div className="space-y-4">
                <VacancyList
                  vacancies={visibleVacancies}
                  isClosingSoon={isClosingSoon}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <p className="text-sm text-gray-600">
                  Showing {visibleVacancies.length} of {filteredVacancies.length}{" "}
                  vacancies
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      fetchVacancies(
                        (perPageCount === "all" ? items.length : perPageCount || 0) +
                          10
                      )
                    }
                    disabled={loading}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load 10 more
                  </button>
                  <button
                    type="button"
                    onClick={() => fetchVacancies("all")}
                    disabled={loading}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  >
                    Load all
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 shadow-[9px_9px_15px_5px_#c8bfbf] rounded-xl p-6 hover:shadow-none transition-all">
            <RecentActivities
              activities={activities}
              onViewMore={() => {
                router.visit(
                  window.route("admin.activity.index", { subject: "vacancy" })
                );
              }}
              subjectType={"vacancy"}
            />
          </div>
        </div>

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedVacancy ? "Edit Vacancy" : "Add New Vacancy"}
          >
            <VacancyForm
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onClose={() => setIsModalOpen(false)}
              departments={departments}
              employmentTypes={employmentTypes}
              fileInputRef={fileInputRef}
              logoPreview={logoPreview}
              onLogoInputChange={onLogoInputChange}
              onLogoDrop={onLogoDrop}
              onLogoDragOver={onLogoDragOver}
              onLogoDragLeave={onLogoDragLeave}
              isDragging={isDragging}
            />
          </Modal>
        )}

        {isViewModalOpen && selectedVacancy && (
          <VacancyView
            selectedVacancy={selectedVacancy}
            onClose={() => setIsViewModalOpen(false)}
            isClosingSoon={isClosingSoon}
          />
        )}

        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          itemName={selectedVacancy?.title || ""}
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
