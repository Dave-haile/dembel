const ThumbnailUploader = ({ isDragging, onLogoDrop, onLogoDragOver, onLogoDragLeave, onClick, logoPreview, formDataThumbnail }) => {
  return (
    <div
      onDrop={onLogoDrop}
      onDragOver={onLogoDragOver}
      onDragEnter={onLogoDragOver}
      onDragLeave={onLogoDragLeave}
      onClick={onClick}
      className={`w-full px-4 py-8 border-2 rounded-lg text-center cursor-pointer transition-colors ${isDragging
        ? 'border-green-400 bg-green-50 ring-2 ring-green-300'
        : 'border-dashed border-gray-300 hover:bg-gray-50'
        }`}
    >
      {logoPreview ? (
        <img src={logoPreview} alt="Logo preview" className="mx-auto h-20 w-20 object-cover rounded" />
      ) : typeof formDataThumbnail === "string" && formDataThumbnail ? (
        <img src={`/${formDataThumbnail}`} alt="Current thumbnail" className="mx-auto h-20 w-20 object-cover rounded" />
      ) : (
        <div className="text-gray-500">
          Drag & drop image here, or click to select
        </div>
      )}
    </div>
  );
};

export default ThumbnailUploader;