import { Tool } from '@/types/tool';

/**
 * Form configuration and related types
 */

export type FieldType = 'text' | 'textarea' | 'number' | 'select' | 'checkbox';

export interface FieldOption {
  label: string;
  value: string;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customValidation?: (value: any) => boolean;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRules;
  options?: FieldOption[];
}

export interface FormConfigType {
  fields: FormField[];
  webhookUrl: string;
  resultTitle?: string;
  toolId?: string;
  toolName?: string;
  className?: {
    form?: string;
    submitButton?: string;
  };
  messages?: {
    success?: string;
    error?: string;
  };
}

export interface FormData {
  [key: string]: string | number | boolean;
}

export type FieldValue = string | number | boolean;

export interface FormResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  result?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Transform Tool fields to FormField
 */
export function toolFieldsToFormFields(
  toolFields: Tool['fields'] = []
): FormField[] {
  return toolFields.map((field) => ({
    name: field.name,
    label: field.label,
    type: (field.type || 'text') as FieldType,
    placeholder: field.placeholder,
    required: field.required,
    options: field.options,
    validation: {
      required: field.required,
    },
  }));
}
