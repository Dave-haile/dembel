import React from "react";
import Modal from "../../components/Modal";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AboutViewModal = ({ isOpen, onClose, selected }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="About Content Details" maxWidth="2xl">
      {selected && (
        <div className="space-y-4">
          <div className="bg-white overflow-hidden">
            {selected.image_url && (
              <div className="mb-4">
                <img src={selected.image_url} alt={selected.title || "Content Image"} className="w-full h-64 object-cover rounded-lg" />
              </div>
            )}

            <div className="px-1">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selected.title || "No Title"}</h3>
              {selected.subtitle && <p className="mt-1 text-sm text-gray-500">{selected.subtitle}</p>}

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500">Component</h4>
                <p className="mt-1 text-sm text-gray-900">{selected.component}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500">Position</h4>
                <p className="mt-1 text-sm text-gray-900">{selected.position || "N/A"}</p>
              </div>

              {selected.description && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500">Description</h4>
                  <div className="mt-1 text-sm text-gray-900 whitespace-pre-line">{selected.description}</div>
                </div>
              )}

              {selected.extra_data && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
                    {(() => {
                      try {
                        const data = typeof selected.extra_data === "string" ? JSON.parse(selected.extra_data) : selected.extra_data;

                        if (data.slides && Array.isArray(data.slides)) {
                          return (
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {data.slides.map((img, idx) => (
                                  <div key={idx} className="relative group">
                                    <img src={img.startsWith("http") ? img : `/${img}`} alt={`Slide ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        if (Array.isArray(data)) {
                          return (
                            <div className="space-y-3">
                              {data.map((item, index) => (
                                <div key={index} className="p-3 bg-white rounded border border-gray-100">
                                  {Object.entries(item).map(([key, value]) => (
                                    <div key={key} className="mb-1 last:mb-0">
                                      <span className="font-medium text-gray-700">{key.replace(/^\w/, (c) => c.toUpperCase())}:</span>{" "}
                                      <span className="text-gray-600">{Array.isArray(value) ? value.join(", ") : String(value)}</span>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-2">
                            {Object.entries(data).map(([key, value]) => (
                              <div key={key} className="flex flex-col sm:flex-row py-1">
                                <span className="font-medium text-gray-700 w-32 flex-shrink-0">{key.replace(/^\w/, (c) => c.toUpperCase())}:</span>
                                <div className="text-gray-600 break-words flex-1">{Array.isArray(value) ? value.join(", ") : String(value)}</div>
                              </div>
                            ))}
                          </div>
                        );
                      } catch (e) {
                        console.log(e);
                        return (
                          <div className="text-sm text-red-600">
                            <p>Error parsing JSON data:</p>
                            <pre className="mt-1 p-2 bg-red-50 rounded text-xs overflow-auto">{selected.extra_data}</pre>
                          </div>
                        );
                      }
                    })()}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-500">Last updated on {formatDate(selected.updated_at)}</div>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-6">
            <button type="button" className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-blue-600 text-white" onClick={() => onClose()}>
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AboutViewModal;
