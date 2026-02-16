import React from 'react';

const FormField = ({ field, value, onChange, error }) => {
  const commonProps = {
    id: field.name,
    name: field.name,
    value: value ?? '',
    onChange: (e) => onChange(field.name, e.target.value),
    className:
      'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
  };

  switch (field.type) {
    case 'textarea':
      return <textarea {...commonProps} rows={3} />;

    case 'select':
      return (
        <select {...commonProps}>
          <option value="">Select</option>
          {field.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );

    default:
      return <input {...commonProps} type={field.type} />;
  }
};

export default FormField;
