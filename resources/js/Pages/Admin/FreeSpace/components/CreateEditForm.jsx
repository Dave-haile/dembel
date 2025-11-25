import FormInput from '../../components/FormInput';
import ThumbnailUploader from './ThumbnailUploader';

const CreateEditForm = ({
  formData,
  errors,
  handleInputChange,
  floors,
  fileInputRef,
  isDragging,
  logoPreview,
  onLogoInputChange,
  onLogoDrop,
  onLogoDragOver,
  onLogoDragLeave,
}) => {
  return (
    <form className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Space Name"
              name="name"
              value={formData.name || ''}
              onChange={handleInputChange}
              error={errors.name}
              placeholder="e.g., Office Space A1"
            />

            <FormInput
              label="Floor"
              name="floor_id"
              type="select"
              value={formData.floor_id || ''}
              onChange={handleInputChange}
              error={errors.floor_id}
              options={floors.map(f => ({ value: f.id, label: f.name }))}
            />

            <FormInput
              label="Wing/Zone"
              name="wing_or_zone"
              value={formData.wing_or_zone || ''}
              onChange={handleInputChange}
              error={errors.wing_or_zone}
              placeholder="e.g., North Wing"
            />

            <FormInput
              label="Area (sq m)"
              name="area_sqm"
              type="number"
              value={formData.area_sqm || ''}
              onChange={handleInputChange}
              error={errors.area_sqm}
              placeholder="50.00"
            />

            <FormInput
              label="Dimensions"
              name="dimensions"
              value={formData.dimensions || ''}
              onChange={handleInputChange}
              placeholder="5m x 10m"
            />

            <FormInput
              label="Availability Status"
              name="availability_status"
              type="select"
              value={formData.availability_status || 'available'}
              onChange={handleInputChange}
              options={[
                { value: 'available', label: 'Available' },
                { value: 'reserved', label: 'Reserved' },
                { value: 'occupied', label: 'Occupied' }
              ]}
            />

            <FormInput
              label="Slug"
              name="slug"
              value={formData.slug || ''}
              onChange={handleInputChange}
              placeholder="unique-space-slug"
            />
            <br />
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'has_window', label: 'Has Window' },
                { name: 'has_ventilation', label: 'Has Ventilation' },
                { name: 'has_plumbing', label: 'Has Plumbing' },
                { name: 'has_electricity', label: 'Has Electricity' }
              ].map(item => (
                <label key={item.name} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name={item.name}
                    checked={formData[item.name] || false}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Monthly Rent"
              name="monthly_rent"
              type="number"
              value={formData.monthly_rent || ''}
              onChange={handleInputChange}
              error={errors.monthly_rent}
              placeholder="1200.00"
            />

            <FormInput
              label="Currency"
              name="rent_currency"
              value={formData.rent_currency || 'ETB'}
              onChange={handleInputChange}
              placeholder="ETB"
            />

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer pb-2">
                <input
                  type="checkbox"
                  name="negotiable"
                  checked={formData.negotiable || false}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700 font-medium">Negotiable</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Description</h3>
          <div className="space-y-4">
            <FormInput
              label="Short Description"
              name="short_description"
              type="textarea"
              value={formData.short_description || ''}
              onChange={handleInputChange}
              placeholder="Brief description..."
              rows={2}
            />

            <FormInput
              label="Full Description"
              name="full_description"
              type="textarea"
              value={formData.full_description || ''}
              onChange={handleInputChange}
              placeholder="Detailed description..."
              rows={4}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Contact Person"
              name="contact_person"
              value={formData.contact_person || ''}
              onChange={handleInputChange}
              placeholder="Jane Doe"
            />

            <FormInput
              label="Contact Phone"
              name="contact_phone"
              type="tel"
              value={formData.contact_phone || ''}
              onChange={handleInputChange}
              error={errors.contact_phone}
              placeholder="+1 (555) 123-4567"
            />

            <FormInput
              label="Contact Email"
              name="contact_email"
              type="email"
              value={formData.contact_email || ''}
              onChange={handleInputChange}
              error={errors.contact_email}
              placeholder="contact@example.com"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>

              <ThumbnailUploader
                fileInputRef={fileInputRef}
                isDragging={isDragging}
                onLogoDrop={onLogoDrop}
                onLogoDragOver={onLogoDragOver}
                onLogoDragLeave={onLogoDragLeave}
                onClick={() => fileInputRef.current?.click()}
                logoPreview={logoPreview}
                formDataThumbnail={formData.thumbnail}
                onLogoInputChange={onLogoInputChange}
              />

              <input
                ref={fileInputRef}
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={onLogoInputChange}
                className="hidden"
              />
            </div>

            <FormInput
              label="Virtual Tour URL"
              name="virtual_tour_url"
              value={formData.virtual_tour_url || ''}
              onChange={handleInputChange}
              placeholder="https://virtualtour.example.com"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CreateEditForm;