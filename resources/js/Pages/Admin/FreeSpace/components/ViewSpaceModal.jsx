import Modal from '../../components/Modal';
import { CheckCircle, XCircle } from 'lucide-react';

const ViewSpaceModal = ({ isOpen, onClose, selectedSpace, getStatusBadge }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Space Details">
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4 pb-4 border-b">
          <img
            src={`/${selectedSpace.thumbnail}`}
            alt={selectedSpace.name}
            className="w-32 h-32 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800">{selectedSpace.name}</h3>
            <p className="text-gray-600 mt-1">{selectedSpace.short_description}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className={`px-3 py-1 rounded text-sm font-medium ${getStatusBadge(selectedSpace.availability_status)}`}>
                {selectedSpace.availability_status}
              </span>
              {selectedSpace.negotiable && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
                  Negotiable
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Floor</p>
            <p className="text-gray-800 font-medium">{selectedSpace.floor?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Wing/Zone</p>
            <p className="text-gray-800 font-medium">{selectedSpace.wing_or_zone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Area</p>
            <p className="text-gray-800 font-medium">{selectedSpace.area_sqm} m²</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dimensions</p>
            <p className="text-gray-800 font-medium">{selectedSpace.dimensions || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Monthly Rent</p>
            <p className="text-gray-800 font-medium">${selectedSpace.monthly_rent} {selectedSpace.rent_currency}</p>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 mb-3">Amenities</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: 'has_window', label: 'Window' },
              { key: 'has_ventilation', label: 'Ventilation' },
              { key: 'has_plumbing', label: 'Plumbing' },
              { key: 'has_electricity', label: 'Electricity' }
            ].map(item => (
              <div key={item.key} className="flex items-center gap-2">
                {selectedSpace[item.key] ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-gray-300" />
                )}
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {selectedSpace.full_description && (
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 mb-2">Full Description</p>
            <p className="text-gray-800">{selectedSpace.full_description}</p>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 mb-2">Contact Information</p>
          <div className="space-y-1">
            {selectedSpace.contact_person && (
              <p className="text-gray-800"><strong>Person:</strong> {selectedSpace.contact_person}</p>
            )}
            <p className="text-gray-800"><strong>Phone:</strong> {selectedSpace.contact_phone}</p>
            <p className="text-gray-800"><strong>Email:</strong> {selectedSpace.contact_email}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewSpaceModal;