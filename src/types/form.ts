import { z } from 'zod';

// Field validation rules
export const ValidationRules = z.object({
  required: z.boolean().optional(),
  minLength: z.number().optional(),
  maxLength: z.number().optional(),
  pattern: z.string().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  customValidation: z.function().args(z.any()).returns(z.boolean()).optional(),
});

export type ValidationRulesType = z.infer<typeof ValidationRules>;

// Field option for select inputs
export interface FieldOption {
  label: string;
  value: string | number;
}

// Field definition
export const FieldDefinition = z.object({
  name: z.string(),
  label: z.string(),
  type: z.enum(['text', 'email', 'number', 'select', 'checkbox', 'textarea']),
  placeholder: z.string().optional(),
  validation: ValidationRules.optional(),
  options: z.array(z.object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
  })).optional(),
  className: z.string().optional(),
  renderCustomField: z.function().args(z.any()).returns(z.any()).optional(),
});

export type FieldDefinitionType = z.infer<typeof FieldDefinition>;

// Form configuration
export const FormConfig = z.object({
  fields: z.array(FieldDefinition),
  webhookUrl: z.string().url(),
  resultTitle: z.string(),
  messages: z.object({
    success: z.string().optional(),
    error: z.string().optional(),
  }).optional(),
  className: z.object({
    form: z.string().optional(),
    submitButton: z.string().optional(),
    responseContainer: z.string().optional(),
  }).optional(),
});

export type FormConfigType = z.infer<typeof FormConfig>;

// Form submission response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface FormResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form field value type
export type FieldValue = string | number | boolean;

// Form data type
export type FormData = Record<string, FieldValue>;