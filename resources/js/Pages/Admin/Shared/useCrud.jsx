import { useState } from "react";

export const useCrud = (initialData, entityName) => {
  const [items, setItems] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [activityLog, setActivityLog] = useState([]);

  // Filter & paginate
  const filteredItems = items.filter((item) =>
    Object.values(item).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Log activity
  const logActivity = (action, item) => {
    const log = {
      id: Date.now(),
      action,
      entity: entityName,
      item: item.name || item.title || `ID: ${item.id}`,
      timestamp: new Date().toISOString(),
      user: "Admin",
    };
    setActivityLog((prev) => [log, ...prev.slice(0, 9)]); // Keep last 10
    console.log(`[ACTIVITY] ${action} ${entityName}:`, item);
  };

  // CRUD Functions
  const createItem = (newItem) => {
    const item = { ...newItem, id: Date.now() };
    setItems((prev) => [...prev, item]);
    logActivity("Created", item);
    console.log(`[CREATE] ${entityName}:`, item);
    return item;
  };

  const updateItem = (id, updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
    );
    const item = { id, ...updatedItem };
    logActivity("Updated", item);
    console.log(`[UPDATE] ${entityName} ID ${id}:`, updatedItem);
    return item;
  };

  const deleteItem = (id) => {
    const deleted = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((item) => item.id !== id));
    if (deleted) logActivity("Deleted", deleted);
    console.log(`[DELETE] ${entityName} ID ${id}`);
  };

  return {
    items,
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
  };
};
