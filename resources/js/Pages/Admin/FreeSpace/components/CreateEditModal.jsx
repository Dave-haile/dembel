import Modal from '../../components/Modal';
import CreateEditForm from './CreateEditForm';

const CreateEditModal = ({
  isOpen,
  onClose,
  title,
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  fileInputRef,
  isDragging,
  setIsDragging,
  logoPreview,
  onLogoInputChange,
  onLogoDrop,
  onLogoDragOver,
  onLogoDragLeave,
  floors,
  selectedSpace,
}) => {
  // We intentionally render the form inside the modal and wire submission from parent.
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="p-6">
        <CreateEditForm
          formData={formData}
          errors={errors}
          handleInputChange={handleInputChange}
          floors={floors}
          fileInputRef={fileInputRef}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          logoPreview={logoPreview}
          onLogoInputChange={onLogoInputChange}
          onLogoDrop={onLogoDrop}
          onLogoDragOver={onLogoDragOver}
          onLogoDragLeave={onLogoDragLeave}
        />

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
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
  );
};

export default CreateEditModal;
