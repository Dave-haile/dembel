import React, { useState } from "react";
import { useCrud } from "../Shared/useCrud";
import { initialTenants } from "../Shared/moke";
import DataTable from "../Shared/DataTable";
import ActivityLog from "../Shared/ActivityLog";
import ModalForm from "../Shared/ModalForm";
import DeleteConfirmModal from "../Shared/DeleteConfirmModal";
import AdminLayout from "../Shared/AdminLayout";

const TenantsPage = () => {
  const {
    currentItems,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
    createItem,
    updateItem,
    deleteItem,
    activityLog,
  } = useCrud(initialTenants, "Tenant");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (editingItem) {
      updateItem(editingItem.id, data);
    } else {
      createItem(data);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleDelete = () => {
    deleteItem(itemToDelete);
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Category", render: (row) => row.category?.name || "—" },
    { header: "Location", accessor: "location" },
    { header: "Phone", accessor: "phone" },
    { header: "Email", accessor: "email" },
  ];

  return (
    <AdminLayout
      currentPage={"tenants"}
      setCurrentPage={setCurrentPage}
      setSidebarOpen={setSidebarOpen}
      sidebarOpen={sidebarOpen}
    >
      <div className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Tenants</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add New Tenant
          </button>
        </div>

        <input
          type="text"
          placeholder="Search tenants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 p-2 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600"
        />

        <DataTable
          columns={columns}
          data={currentItems}
          onEdit={(item) => {
            setEditingItem(item);
            setIsModalOpen(true);
          }}
          onDelete={(id) => {
            setItemToDelete(id);
            setIsDeleteModalOpen(true);
          }}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

        <ActivityLog activities={activityLog} />

        {/* Form Modal */}
        <ModalForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? "Edit Tenant" : "Add New Tenant"}
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="name"
              defaultValue={editingItem?.name || ""}
              placeholder="Name *"
              required
              className="p-2 border rounded dark:bg-gray-700"
            />
            <input
              name="location"
              defaultValue={editingItem?.location || ""}
              placeholder="Location"
              className="p-2 border rounded dark:bg-gray-700"
            />
            <input
              name="phone"
              defaultValue={editingItem?.phone || ""}
              placeholder="Phone"
              className="p-2 border rounded dark:bg-gray-700"
            />
            <input
              name="email"
              defaultValue={editingItem?.email || ""}
              placeholder="Email"
              className="p-2 border rounded dark:bg-gray-700"
            />
            <input
              name="website"
              defaultValue={editingItem?.website || ""}
              placeholder="Website"
              className="p-2 border rounded dark:bg-gray-700"
            />
            <input
              name="floor"
              defaultValue={editingItem?.floor || ""}
              placeholder="Floor"
              className="p-2 border rounded dark:bg-gray-700"
            />
            <textarea
              name="description"
              defaultValue={editingItem?.description || ""}
              placeholder="Description"
              className="p-2 border rounded dark:bg-gray-700"
              rows="2"
            />
          </div>
        </ModalForm>

        {/* Delete Modal */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          itemName={
            currentItems.find((i) => i.id === itemToDelete)?.name ||
            "this tenant"
          }
        />
      </div>
    </AdminLayout>
  );
};

export default TenantsPage;
