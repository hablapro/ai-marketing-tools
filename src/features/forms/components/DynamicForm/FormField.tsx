import React, { useCallback } from 'react';
import { FormField, FieldValue } from '../../types/form.types';

interface FormFieldProps {
  field: FormField;
  value: FieldValue;
  onChange: (value: FieldValue) => void;
  onBlur: () => void;
  error?: string;
}

/**
 * Individual form field renderer compatible with React Hook Form Controller
 * Handles all field types: text, textarea, number, select, checkbox
 */
export function FormField({
  field,
  value,
  onChange,
  onBlur,
  error,
}: FormFieldProps) {
  // Handle input changes
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const newValue =
        field.type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : field.type === 'number'
          ? parseFloat(e.target.value)
          : e.target.value;

      onChange(newValue);
    },
    [field.type, onChange]
  );

  // Common CSS classes
  const baseInputClasses =
    'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200';
  const errorInputClasses = error ? 'border-red-300' : 'border-gray-300';
  const inputClasses = `${baseInputClasses} ${errorInputClasses}`;

  // Render field based on type
  switch (field.type) {
    case 'textarea':
      return (
        <div>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <textarea
            id={field.name}
            name={field.name}
            value={value as string}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={field.placeholder}
            className={inputClasses}
            rows={4}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          {error && (
            <p
              id={`${field.name}-error`}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          )}
        </div>
      );

    case 'select':
      return (
        <div>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            id={field.name}
            name={field.name}
            value={value as string}
            onChange={handleChange}
            onBlur={onBlur}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          >
            <option value="">
              {field.placeholder || 'Select an option'}
            </option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {error && (
            <p
              id={`${field.name}-error`}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          )}
        </div>
      );

    case 'checkbox':
      return (
        <div className="flex items-center gap-3">
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            checked={value as boolean}
            onChange={handleChange}
            onBlur={onBlur}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          <label
            htmlFor={field.name}
            className="text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>
          {error && (
            <p
              id={`${field.name}-error`}
              className="text-sm text-red-600"
            >
              {error}
            </p>
          )}
        </div>
      );

    default:
      // text, number, and other input types
      return (
        <div>
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            id={field.name}
            name={field.name}
            type={field.type === 'number' ? 'number' : 'text'}
            value={value as string | number}
            onChange={handleChange}
            onBlur={onBlur}
            placeholder={field.placeholder}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? `${field.name}-error` : undefined}
          />
          {error && (
            <p
              id={`${field.name}-error`}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </p>
          )}
        </div>
      );
  }
}
