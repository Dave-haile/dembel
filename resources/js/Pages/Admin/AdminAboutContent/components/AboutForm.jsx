import React, { useEffect, useRef, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import FormInput from "../../components/FormInput";
import Modal from "../../components/Modal";
import { router } from "@inertiajs/react";

const ExtraDataForm = ({
  componentKey,
  COMPONENT_CONFIGS,
  extraData,
  setExtraData,
  extraDataPreviews,
  setExtraDataPreviews,
  uploadProgress, // Receive uploadProgress prop
}) => {
  if (
    !componentKey ||
    !COMPONENT_CONFIGS[componentKey] ||
    !COMPONENT_CONFIGS[componentKey].extraDataFields.length
  ) {
    return (
      <div className="text-center py-4 text-gray-500">
        No additional data required for this component.
      </div>
    );
  }

  const componentConfig = COMPONENT_CONFIGS[componentKey];
  const isArrayType = componentConfig.extraDataFields[0]?.type === "array";
  const fieldsToRender = isArrayType
    ? componentConfig.extraDataFields[0].fields
    : componentConfig.extraDataFields;
  const label = isArrayType ? componentConfig.extraDataFields[0].label : "";

  const addExtraDataItem = () => {
    const newItem = {};
    fieldsToRender.forEach((field) => {
      newItem[field.key] = field.type === "file" ? null : "";
    });
    setExtraData((prev) => [
      ...prev,
      { id: Date.now().toString(), ...newItem },
    ]);
  };

  const removeExtraDataItem = (itemId) => {
    setExtraData((prev) => prev.filter((item) => item.id !== itemId));
    if (extraDataPreviews[itemId]) {
      URL.revokeObjectURL(extraDataPreviews[itemId]);
      setExtraDataPreviews((prev) => {
        const n = { ...prev };
        delete n[itemId];
        return n;
      });
    }
  };

  const updateExtraDataItem = (itemId, fieldKey, value, file = null) => {
    if (isArrayType) {
      setExtraData((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, [fieldKey]: file || value } : item
        )
      );
    } else {
      // For non-array types, extraData will be a single object or empty array initially.
      // We assume it's an object with the fieldsToRender keys
      setExtraData([{ ...extraData[0], [fieldKey]: file || value }]);
    }

    if (file) {
      if (extraDataPreviews[`${itemId}_${fieldKey}`])
        URL.revokeObjectURL(extraDataPreviews[`${itemId}_${fieldKey}`]);
      const previewUrl = URL.createObjectURL(file);
      setExtraDataPreviews((prev) => ({
        ...prev,
        [`${itemId}_${fieldKey}`]: previewUrl,
      }));
    }
  };

  // Handle initial extraData for non-array types
  useEffect(() => {
    if (!isArrayType && extraData.length === 0) {
      const initialItem = {};
      fieldsToRender.forEach((field) => {
        initialItem[field.key] = "";
      });
      setExtraData([{ id: Date.now().toString(), ...initialItem }]);
    }
  }, [componentKey, isArrayType, extraData.length]);

  const renderFields = (item, itemId) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fieldsToRender.map((field) => (
        <div
          key={field.key}
          className={
            field.type === "textarea" || field.type === "file"
              ? "md:col-span-2"
              : ""
          }
        >
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              value={item[field.key] || ""}
              onChange={(e) =>
                updateExtraDataItem(itemId, field.key, e.target.value)
              }
              rows={3}
              className="block w-full border rounded-md p-2"
            />
          ) : field.type === "file" ? (
            <div className="space-y-2">
              <input
                type="file"
                accept={field.accept || "image/*"}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) updateExtraDataItem(itemId, field.key, "", file);
                }}
                className="block w-full"
              />
              {field.key === "video_file" && uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2 text-sm text-blue-600">
                  Uploading: {uploadProgress}%
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                </div>
              )}
              {(() => {
                const previewKey = `${itemId}_${field.key}`;
                const previewUrl = extraDataPreviews[previewKey];
                const value = item[field.key];
                const isPersistedImageUrl =
                  typeof value === "string" &&
                  (value.startsWith("http") ||
                    value.startsWith("storage/") ||
                    value.startsWith("blob:"));
                if (!previewUrl && !isPersistedImageUrl) return null;
                let imgSrc = previewUrl
                  ? previewUrl
                  : value.startsWith("storage/")
                  ? `/${value}`
                  : value;
                return (
                  <div className="mt-2">
                    <img
                      src={imgSrc}
                      alt="Preview"
                      className="h-32 object-contain rounded-md border"
                      onError={(e) => (e.target.src = "/img/default.jpg")}
                    />
                    {isPersistedImageUrl && (
                      <p className="text-xs text-gray-500 mt-1">
                        Current image: {value.split("/").pop()}
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          ) : (
            <input
              type={field.type}
              value={item[field.key] || ""}
              onChange={(e) =>
                updateExtraDataItem(itemId, field.key, e.target.value)
              }
              className="block w-full border rounded-md p-2"
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-medium text-gray-900">{label}</h4>
          <p className="text-sm text-gray-500">{componentConfig.description}</p>
        </div>
        {isArrayType && (
          <button
            type="button"
            onClick={addExtraDataItem}
            className="inline-flex items-center px-3 py-2 rounded-md bg-blue-100 text-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" /> Add {label.slice(0, -1)}
          </button>
        )}
      </div>

      <div className="space-y-4">
        {extraData.map((item, index) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            {isArrayType && (
              <div className="flex justify-between items-center mb-3">
                <h5 className="font-medium text-gray-900">
                  {label.slice(0, -1)} #{index + 1}
                </h5>
                <button
                  type="button"
                  onClick={() => removeExtraDataItem(item.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            {renderFields(item, item.id)}
          </div>
        ))}
      </div>

      {isArrayType && extraData.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No {label.toLowerCase()} added yet.</p>
          <button
            type="button"
            onClick={addExtraDataItem}
            className="mt-2 inline-flex items-center px-4 py-2 rounded-md bg-blue-100 text-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" /> Add First {label.slice(0, -1)}
          </button>
        </div>
      )}
    </div>
  );
};

const buildFormDataForSubmit = (
  formData,
  extraData,
  componentKey,
  COMPONENT_CONFIGS
) => {
  const fd = new FormData();
  Object.keys(formData).forEach((key) => {
    if (key !== "extra_data") {
      if (formData[key] !== undefined && formData[key] !== null)
        fd.append(key, formData[key]);
    }
  });

  const componentConfig = COMPONENT_CONFIGS[componentKey];
  const isArrayType = componentConfig?.extraDataFields[0]?.type === "array";

  let cleanedExtraData;

  if (isArrayType) {
    cleanedExtraData = extraData.map((item) => {
      const cleanItem = {};
      const allFields = componentConfig.extraDataFields[0].fields;
      allFields.forEach((field) => {
        const fieldKey = field.key;
        if (item[fieldKey] !== undefined) {
          // For file type, if it's a string, keep it (persisted URL); otherwise, null it out for JSON part
          cleanItem[fieldKey] =
            field.type === "file" && typeof item[fieldKey] === "string"
              ? item[fieldKey]
              : field.type === "file"
              ? null
              : item[fieldKey];
        } else {
          cleanItem[fieldKey] = null;
        }
      });
      return cleanItem;
    });
    fd.append("extra_data", JSON.stringify(cleanedExtraData));
  } else {
    // For single object types (like VideoSection)
    const singleItem = extraData[0] || {};
    const cleanItem = {};
    componentConfig.extraDataFields.forEach((field) => {
      const fieldKey = field.key;
      if (singleItem[fieldKey] !== undefined) {
        cleanItem[fieldKey] =
          field.type === "file" && typeof singleItem[fieldKey] === "string"
            ? singleItem[fieldKey]
            : field.type === "file"
            ? null
            : singleItem[fieldKey];
      } else {
        cleanItem[fieldKey] = null;
      }
    });
    const finalExtraData = [cleanItem]; // Always wrap in an array
    console.log("Extra data being sent:", JSON.stringify(finalExtraData)); // Debug log
    fd.append("extra_data", JSON.stringify(finalExtraData));
  }

  // Append files separately
  extraData.forEach((item, idx) => {
    // For non-array types, we only have one item at index 0
    if (!isArrayType && idx > 0) return;

    // Use the component config to identify file fields for the current component
    const currentFields = isArrayType
      ? componentConfig.extraDataFields[0].fields
      : componentConfig.extraDataFields;
    currentFields.forEach((fieldConfig) => {
      if (
        fieldConfig.type === "file" &&
        item[fieldConfig.key] instanceof File
      ) {
        if (isArrayType) {
          fd.append(
            `extra_data_files[${idx}][${fieldConfig.key}]`,
            item[fieldConfig.key]
          );
        } else {
          // For single object types, files are directly in the root of extra_data_files
          fd.append(
            `extra_data_files[${fieldConfig.key}]`,
            item[fieldConfig.key]
          );
        }
      }
    });
  });

  return fd;
};

const parseExistingExtraData = (extraData, componentKey, COMPONENT_CONFIGS) => {
  if (!extraData) return [];
  try {
    const parsed =
      typeof extraData === "string" ? JSON.parse(extraData) : extraData;

    const componentConfig = COMPONENT_CONFIGS[componentKey];
    const isArrayType = componentConfig?.extraDataFields[0]?.type === "array";

    if (isArrayType) {
      if (Array.isArray(parsed)) {
        return parsed.map((item, index) => ({
          id: `existing_${index}_${Date.now()}`,
          ...item,
        }));
      } else if (parsed && typeof parsed === "object") {
        // If it's an object but expected an array (e.g., legacy data), wrap it.
        return [{ id: `existing_0_${Date.now()}`, ...parsed }];
      }
    } else {
      // For single object type
      if (parsed && typeof parsed === "object") {
        return [{ id: `existing_0_${Date.now()}`, ...parsed }];
      } else if (Array.isArray(parsed) && parsed.length > 0) {
        // If it's an array but expected a single object, take the first one.
        return [{ id: `existing_0_${Date.now()}`, ...parsed[0] }];
      }
    }
  } catch (e) {
    console.error("Error parsing extra data:", e);
  }
  return [];
};

const AboutForm = ({
  isOpen,
  onClose,
  selected,
  onSaved,
  COMPONENT_CONFIGS,
  setToast,
}) => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    id: null,
    component: "",
    title: "",
    subtitle: "",
    description: "",
    position: "",
    image: null,
    image_url: "",
    // extra_data: [], // Removed as extraData is managed separately
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [extraData, setExtraData] = useState([]);
  const [extraDataPreviews, setExtraDataPreviews] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0); // New state for upload progress

  useEffect(() => {
    if (selected) {
      // console.log("Selected item in AboutForm:", selected);
      setFormData({
        id: selected.id,
        component: selected.component
          ? selected.component.replace(/\s/g, "")
          : "",
        title: selected.title || "",
        subtitle: selected.subtitle || "",
        description: selected.description || "",
        image_url: selected.image_url || "",
        position: selected.position || "",
      });
      setExtraData(
        parseExistingExtraData(
          selected.extra_data,
          selected.component ? selected.component.replace(/\s/g, "") : "",
          COMPONENT_CONFIGS
        )
      );
      setImagePreview(null);
    } else {
      setFormData({
        id: null,
        component: "",
        title: "",
        subtitle: "",
        description: "",
        image_url: "",
        position: "",
      });
      setExtraData([]);
      setImagePreview(null);
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [selected, isOpen]);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      Object.values(extraDataPreviews).forEach((url) => {
        if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreview, extraDataPreviews]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (file) {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(URL.createObjectURL(file));
        setFormData((prev) => ({ ...prev, [name]: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = buildFormDataForSubmit(
      formData,
      extraData,
      formData.component,
      COMPONENT_CONFIGS
    );
    const url = formData.id
      ? `/admin/about-contents/${formData.id}`
      : "/admin/about-contents";
    if (formData.id) fd.append("_method", "PUT");

    router.post(url, fd, {
      forceFormData: true,
      onSuccess: () => {
        setLoading(false);
        setUploadProgress(0); // Reset progress on success
        onClose();
        if (onSaved) onSaved();
        setToast({ message: "Content saved successfully", type: "success" });
      },
      onError: (errs) => {
        setErrors(errs);
        setLoading(false);
        setUploadProgress(0); // Reset progress on error
        setToast({ message: Object.values(errs)[0], type: "error" });
      },
      onProgress: (event) => {
        if (event.loaded && event.total) {
          setUploadProgress(Math.round((event.loaded / event.total) * 100));
        }
      },
      preserveScroll: true,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${formData.id ? "Edit" : "Create"} About Content`}
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <FormInput
                label="Component Type"
                name="component"
                type="text"
                value={formData.component}
                onChange={handleInputChange}
                error={errors.component}
                required
              />
            </div>
            <div className="md:col-span-1">
              <FormInput
                label="Position"
                name="position"
                type="number"
                value={formData.position}
                onChange={handleInputChange}
                error={errors.position}
                min="1"
              />
            </div>
            <div className="md:col-span-1">
              <FormInput
                label="Image URL"
                name="image_url"
                type="text"
                value={formData.image_url || ""}
                onChange={handleInputChange}
                error={errors.image_url}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          {formData.component && COMPONENT_CONFIGS[formData.component] && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>{COMPONENT_CONFIGS[formData.component].name}:</strong>{" "}
                {COMPONENT_CONFIGS[formData.component].description}
              </p>
            </div>
          )}

          <FormInput
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            error={errors.title}
            required
          />

          <FormInput
            label="Subtitle"
            name="subtitle"
            type="text"
            value={formData.subtitle}
            onChange={handleInputChange}
            error={errors.subtitle}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="block w-full border rounded-md p-2"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
            <p className="text-xs text-gray-500">
              {formData.description ? formData.description.length : 0}{" "}
              characters
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url || ""}
                  onChange={handleInputChange}
                  placeholder="Or enter image URL"
                  className="block w-full border rounded-md p-2"
                />
              </div>
              <span className="text-sm text-gray-500">or</span>
              <div className="flex-1">
                <input
                  type="file"
                  name="image"
                  ref={fileInputRef}
                  onChange={handleInputChange}
                  accept="image/*"
                  className="block w-full"
                />
              </div>
            </div>
            {(imagePreview || formData.image_url) && (
              <div className="mt-2">
                <img
                  src={imagePreview || formData.image_url}
                  alt="Preview"
                  className="h-32 w-auto object-contain rounded-md border"
                  onError={(e) => (e.target.src = "/img/default.jpg")}
                />
              </div>
            )}
            {errors.image && (
              <p className="mt-1 text-sm text-red-600">{errors.image}</p>
            )}
          </div>

          {formData.component && COMPONENT_CONFIGS[formData.component] && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Additional Data
              </h3>
              <ExtraDataForm
                componentKey={formData.component}
                COMPONENT_CONFIGS={COMPONENT_CONFIGS}
                extraData={extraData}
                setExtraData={setExtraData}
                extraDataPreviews={extraDataPreviews}
                setExtraDataPreviews={setExtraDataPreviews}
                uploadProgress={uploadProgress} // Pass uploadProgress to ExtraDataForm
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => onClose()}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {loading
              ? "Saving..."
              : formData.id
              ? "Update Content"
              : "Create Content"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AboutForm;
