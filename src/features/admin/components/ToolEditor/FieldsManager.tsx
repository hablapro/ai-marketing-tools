import React, { useCallback } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Tool } from '@/types/tool';

interface FieldsManagerProps {
  fields: NonNullable<Tool['fields']>;
  onChange: (fields: NonNullable<Tool['fields']>) => void;
}

/**
 * Manages dynamic form fields for tools
 * Allows adding, editing, and removing fields with proper validation
 */
export function FieldsManager({ fields, onChange }: FieldsManagerProps) {
  const addField = useCallback(() => {
    onChange([
      ...fields,
      {
        name: '',
        label: '',
        type: 'text',
        placeholder: '',
        required: false,
      },
    ]);
  }, [fields, onChange]);

  const updateField = useCallback(
    (index: number, field: Partial<Tool['fields']>[0]) => {
      const newFields = [...fields];
      newFields[index] = { ...newFields[index], ...field };
      onChange(newFields);
    },
    [fields, onChange]
  );

  const removeField = useCallback(
    (index: number) => {
      onChange(fields.filter((_, i) => i !== index));
    },
    [fields, onChange]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Form Fields
        </label>
        <button
          type="button"
          onClick={addField}
          className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        >
          <Plus className="h-4 w-4" />
          Add Field
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900">
                Field {index + 1}
              </h4>
              <button
                type="button"
                onClick={() => removeField(index)}
                className="p-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Remove field"
                aria-label={`Remove field ${index + 1}`}
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`field-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id={`field-name-${index}`}
                  type="text"
                  value={field.name}
                  onChange={(e) =>
                    updateField(index, { name: e.target.value })
                  }
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="field_name"
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor={`field-label-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  id={`field-label-${index}`}
                  type="text"
                  value={field.label}
                  onChange={(e) =>
                    updateField(index, { label: e.target.value })
                  }
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Field Label"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`field-type-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  id={`field-type-${index}`}
                  value={field.type}
                  onChange={(e) =>
                    updateField(index, { type: e.target.value as 'text' | 'textarea' | 'number' | 'select' | 'checkbox' })
                  }
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                  aria-required="true"
                >
                  <option value="text">Text</option>
                  <option value="textarea">Textarea</option>
                  <option value="number">Number</option>
                  <option value="select">Select</option>
                  <option value="checkbox">Checkbox</option>
                </select>
              </div>

              <div>
                <label htmlFor={`field-placeholder-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Placeholder
                </label>
                <input
                  id={`field-placeholder-${index}`}
                  type="text"
                  value={field.placeholder || ''}
                  onChange={(e) =>
                    updateField(index, { placeholder: e.target.value })
                  }
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter placeholder text"
                  aria-label="Placeholder text for this field"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`required-${index}`}
                checked={field.required || false}
                onChange={(e) =>
                  updateField(index, { required: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`required-${index}`}
                className="text-sm text-gray-700"
              >
                Required field
              </label>
            </div>

            {field.type === 'select' && (
              <div className="col-span-full">
                <label htmlFor={`field-options-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Options (one per line, format: label=value)
                </label>
                <textarea
                  id={`field-options-${index}`}
                  value={
                    field.options?.map((opt) => `${opt.label}=${opt.value}`).join('\n') || ''
                  }
                  onChange={(e) => {
                    const options = e.target.value
                      .split('\n')
                      .filter((line) => line.includes('='))
                      .map((line) => {
                        const [label, value] = line.split('=');
                        return { label: label.trim(), value: value.trim() };
                      });
                    updateField(index, { options });
                  }}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Option 1=value1&#10;Option 2=value2"
                  aria-describedby={`field-options-help-${index}`}
                />
                <p id={`field-options-help-${index}`} className="mt-1 text-xs text-gray-500">
                  Enter each option on a new line in the format: Display Label=stored_value
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
