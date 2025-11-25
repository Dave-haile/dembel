import React from "react";

const VacancyThumbnailUpload = ({
  fileInputRef,
  logoPreview,
  formData,
  onLogoInputChange,
  onLogoDrop,
  onLogoDragOver,
  onLogoDragLeave,
  isDragging,
}) => {
  return (
    <>
      <div
        onDrop={onLogoDrop}
        onDragOver={onLogoDragOver}
        onDragEnter={onLogoDragOver}
        onDragLeave={onLogoDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`w-full px-4 py-8 border-2 rounded-lg text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-orange-400 bg-orange-50 ring-2 ring-orange-300"
            : "border-dashed border-gray-300 hover:bg-gray-50"
        }`}
      >
        {logoPreview ? (
          <img
            src={logoPreview}
            alt="Logo preview"
            className="mx-auto h-20 w-20 object-cover rounded"
          />
        ) : typeof formData.thumbnail === "string" && formData.thumbnail ? (
          <img
            src={`/${formData.thumbnail}`}
            alt="Current thumbnail"
            className="mx-auto h-20 w-20 object-cover rounded"
          />
        ) : (
          <div className="text-gray-500">Drag & drop image here, or click to select</div>
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
    </>
  );
};

export default VacancyThumbnailUpload;
