import React from 'react';
import { FieldDefinitionType, FieldValue } from '../../types/form';

interface FormFieldProps {
  field: FieldDefinitionType;
  value: FieldValue;
  onChange: (name: string, value: FieldValue) => void;
  error?: string;
}

export function FormField({ field, value, onChange, error }: FormFieldProps) {
  // Handle changes for different field types
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const newValue = field.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked  // For checkboxes, use checked property
      : field.type === 'number'
      ? parseFloat(e.target.value)  // For numbers, parse the string value
      : e.target.value;  // For all other types, use value as is
    onChange(field.name, newValue);
  };

  // Use custom render function if provided
  if (field.renderCustomField) {
    return field.renderCustomField({ field, value, onChange, error });
  }

  // Common class names for form elements
  const baseClassName = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";
  const errorClassName = error ? "border-red-300" : "";
  const className = `${baseClassName} ${errorClassName} ${field.className || ''}`;

  // Render different field types
  switch (field.type) {
    case 'select':
      return (
        <div>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <select
            id={field.name}
            name={field.name}
            value={value as string}
            onChange={handleChange}
            className={className}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              id={field.name}
              name={field.name}
              checked={value as boolean}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              aria-invalid={!!error}
              aria-describedby={error ? `${field.name}-error` : undefined}
            />
          </div>
          <div className="ml-3">
            <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
              {field.label}
            </label>
            {error && (
              <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>
      );

    case 'textarea':
      return (
        <div>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <textarea
            id={field.name}
            name={field.name}
            value={value as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={className}
            rows={4}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          {error && (
            <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      );

    default:
      return (
        <div>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={value as string | number}
            onChange={handleChange}
            placeholder={field.placeholder}
            className={className}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          {error && (
            <p id={`${field.name}-error`} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      );
  }
}