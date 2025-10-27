const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  options,
  rows,
  disabled = false,
}) => {
  
  const baseClasses = `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
    error
      ? 'border-red-300 focus:ring-red-500'
      : 'border-gray-300 focus:ring-blue-500'
  } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`;

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 4}
          disabled={disabled}
          className={baseClasses}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={baseClasses}
        >
          <option value="">Select {label}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'file' ? (
        <input
          type="file"
          name={name}
          onChange={(e) =>
            onChange({ target: { name, value: e.target.files?.[0] || null } })
          }
          disabled={disabled}
          className={baseClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
        />
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;
