import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import Toast from "../components/Toast";
import AdminLayout from "../Shared/AdminLayout";
import { usePage, Head, router } from "@inertiajs/react";
import AboutStats from "./components/AboutStats";
import AboutFilters from "./components/AboutFilters";
import AboutTable from "./components/AboutTable";
import AboutForm from "./components/AboutForm";
import AboutViewModal from "./components/AboutViewModal";
import AboutDeleteModal from "./components/AboutDeleteModal";
import ActivityFeed from "../components/RecentActivities";

export const COMPONENT_CONFIGS = {
  AboutHero: {
    name: "Hero Section",
    description: "Main banner with slideshow",
    extraDataFields: [
      {
        key: "slides",
        label: "Slideshow Images",
        type: "array",
        fields: [
          {
            key: "image",
            label: "Slide Image",
            type: "file",
            required: true,
            accept: "image/*",
          },
        ],
      },
    ],
  },
  MallStory: {
    name: "Mall Story Timeline",
    description: "Timeline of mall history",
    extraDataFields: [
      {
        key: "timeline",
        label: "Timeline Items",
        type: "array",
        fields: [
          { key: "year", label: "Year", type: "text", required: true },
          { key: "title", label: "Title", type: "text", required: true },
          {
            key: "desc",
            label: "Description",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
  },
  MissionValues: {
    name: "Mission & Values",
    description: "Company values with icons",
    extraDataFields: [
      {
        key: "values",
        label: "Values",
        type: "array",
        fields: [
          { key: "icon", label: "Icon Name", type: "text", required: true },
          { key: "title", label: "Title", type: "text", required: true },
          {
            key: "desc",
            label: "Description",
            type: "textarea",
            required: true,
          },
          { key: "color", label: "Color Gradient", type: "text" },
        ],
      },
    ],
  },
  Facilities: {
    name: "Facilities",
    description: "Mall facilities and amenities",
    extraDataFields: [
      {
        key: "facilities",
        label: "Facilities",
        type: "array",
        fields: [
          { key: "icon", label: "Icon Name", type: "text", required: true },
          { key: "title", label: "Title", type: "text", required: true },
          {
            key: "desc",
            label: "Description",
            type: "textarea",
            required: true,
          },
          {
            key: "image",
            label: "Facility Image",
            type: "file",
            accept: "image/*",
          },
        ],
      },
    ],
  },
  Stats: {
    name: "Statistics",
    description: "Achievement statistics",
    extraDataFields: [
      {
        key: "stats",
        label: "Statistics",
        type: "array",
        fields: [
          { key: "icon", label: "Icon Name", type: "text", required: true },
          { key: "value", label: "Value", type: "number", required: true },
          { key: "suffix", label: "Suffix", type: "text" },
          { key: "label", label: "Label", type: "text", required: true },
          { key: "desc", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  Team: {
    name: "Team Members",
    description: "Leadership team",
    extraDataFields: [
      {
        key: "team",
        label: "Team Members",
        type: "array",
        fields: [
          { key: "name", label: "Full Name", type: "text", required: true },
          { key: "role", label: "Role/Position", type: "text", required: true },
          {
            key: "image",
            label: "Profile Photo",
            type: "file",
            accept: "image/*",
          },
          { key: "bio", label: "Bio", type: "textarea" },
          { key: "linkedin", label: "LinkedIn URL", type: "text" },
          { key: "email", label: "Email", type: "text" },
        ],
      },
    ],
  },
  Location: {
    name: "Location Info",
    description: "Contact and location details",
    extraDataFields: [
      {
        key: "info",
        label: "Information Items",
        type: "array",
        fields: [
          { key: "icon", label: "Icon Name", type: "text", required: true },
          { key: "title", label: "Title", type: "text", required: true },
          {
            key: "content",
            label: "Content",
            type: "textarea",
            required: true,
          },
          { key: "subContent", label: "Sub Content", type: "text" },
        ],
      },
    ],
  },
  MissionVisionValues: {
    name: "Mission Vision Values",
    description: "Company mission, vision and values",
    extraDataFields: [
      {
        key: "sections",
        label: "Sections",
        type: "array",
        fields: [
          {
            key: "title",
            label: "Section Title",
            type: "text",
            required: true,
          },
          {
            key: "content",
            label: "Content",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
  },
  ManagementTeam: {
    name: "Management Team",
    description: "Management team members",
    extraDataFields: [
      {
        key: "management",
        label: "Management Team",
        type: "array",
        fields: [
          { key: "name", label: "Full Name", type: "text", required: true },
          { key: "role", label: "Role/Position", type: "text", required: true },
          { key: "email", label: "Email", type: "text" },
          { key: "phone", label: "Phone", type: "text" },
          {
            key: "image",
            label: "Profile Photo",
            type: "file",
            accept: "image/*",
          },
        ],
      },
    ],
  },
  WhoWeAre: {
    name: "Who We Are",
    description: "Basic information about the company",
    extraDataFields: [],
  },
  OrganizationalStructure: {
    name: "Organizational Structure",
    description: "Company organizational chart",
    extraDataFields: [],
  },
  MallHighlights: {
    name: "Mall Highlights",
    description: "Key statistics and features of the mall",
    extraDataFields: [
      {
        key: "highlights",
        label: "Highlights",
        type: "array",
        fields: [
          { key: "icon", label: "Icon Name", type: "text", required: true },
          {
            key: "number",
            label: "Number/Value",
            type: "text",
            required: true,
          },
          { key: "label", label: "Label", type: "text", required: true },
          {
            key: "description",
            label: "Description",
            type: "textarea",
            required: true,
          },
        ],
      },
    ],
  },
  VideoSection: {
    name: "Cinematic Tour",
    description:
      "Immerse yourself in the vibrant atmosphere of Addis Ababa's premier lifestyle destination. From luxury shopping to fine dining, experience it all before you arrive.",
    extraDataFields: [
      { key: "video_url", label: "Video URL", type: "text", required: true },
      { key: "video_file", label: "Upload Video File", type: "file", accept: "video/*" },
    ],
  },
};
const AdminAboutContent = () => {
  const {
    aboutContents: initialContents,
    activities,
    counts,
    flash,
    filters,
  } = usePage().props;
  const [items, setItems] = useState(initialContents.data || []);
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [perPage, setPerPage] = useState(filters.per_page || 10);

  useEffect(() => {
    setItems(
      Array.isArray(initialContents)
        ? initialContents
        : initialContents?.data || []
    );
  }, [initialContents]);

  useEffect(() => {
    if (flash?.success) setToast({ message: flash.success, type: "success" });
    else if (flash?.error) setToast({ message: flash.error, type: "error" });
  }, [flash]);

  const handlePerPageChange = (newPerPage) => {
    setPerPage(newPerPage);
    router.get(
      window.route("admin.about-contents.index"),
      { per_page: newPerPage, search: searchTerm },
      { preserveState: true, replace: true }
    );
  };

  const openCreate = () => {
    setSelected(null);
    setIsFormOpen(true);
  };

  const openEdit = (item) => {
    setSelected(item);
    setIsFormOpen(true);
  };

  const openView = (item) => {
    setSelected(item);
    setIsViewOpen(true);
  };

  const openDelete = (item) => {
    setSelected(item);
    setIsDeleteOpen(true);
  };

  const handleDeleteSuccess = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setIsDeleteOpen(false);
    setToast({ message: "Content deleted successfully", type: "success" });
  };

  return (
    <AdminLayout>
      <Head title="Manage About Content" />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex flex-col gap-6">
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">About Content</h2>
            <button
              onClick={openCreate}
              className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" /> Add New Content
            </button>
          </div>

          <AboutStats counts={counts} />

          <div className="flex flex-col md:flex-row gap-4 mb-6 mt-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search content..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => {
                  const newSearchTerm = e.target.value;
                  setSearchTerm(newSearchTerm);
                  router.get(
                    window.route("admin.about-contents.index"),
                    { search: newSearchTerm, per_page: perPage },
                    { preserveState: true, replace: true }
                  );
                }}
              />
            </div>

            <AboutFilters
              perPageCount={perPage}
              onPerPageChange={handlePerPageChange}
            />
          </div>

          <AboutTable
            items={items}
            searchTerm={searchTerm}
            onView={openView}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        </div>

        <ActivityFeed
          activities={activities}
          subjectType={"about_content"}
          onViewMore={() =>
            router.visit(
              window.route("admin.activity.index", { subject: "about_content" })
            )
          }
        />
      </div>

      <AboutForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selected={selected}
        onSaved={() => {
          router.reload({
            data: { per_page: perPage, search: searchTerm },
            preserveState: true,
            replace: true,
          });
        }}
        COMPONENT_CONFIGS={COMPONENT_CONFIGS}
        setToast={setToast}
      />

      <AboutViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        selected={selected}
      />

      <AboutDeleteModal
        setToast={setToast}
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        selected={selected}
        onDeleted={handleDeleteSuccess}
      />
    </AdminLayout>
  );
};

export default AdminAboutContent;
