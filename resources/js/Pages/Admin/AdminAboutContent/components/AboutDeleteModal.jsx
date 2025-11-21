import React from "react";
import DeleteConfirmation from "../../components/DeleteConfirmation";
import { router } from "@inertiajs/react";

const AboutDeleteModal = ({ isOpen, onClose, selected, onDeleted, setToast }) => {
  const handleConfirm = () => {
    if (!selected) return;
    router.delete(`/admin/about-contents/${selected.id}`, {
      onSuccess: () => {
        if (onDeleted) onDeleted(selected.id);
        setToast({ message: 'Content deleted successfully', type: 'success' });
      },
      onError: (errors) => {
        if (onClose) onClose();
        setToast({ message: Object.values(errors)[0], type: 'error' });
      },
    });
  };

  return (
    <DeleteConfirmation isOpen={isOpen} onClose={onClose} onConfirm={handleConfirm} title="Delete Content" message="Are you sure you want to delete this content?" confirmText="Delete" />
  );
};

export default AboutDeleteModal;
