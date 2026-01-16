import { z } from 'zod';
import { FormConfigType } from '../types/form.types';

/**
 * Generate a Zod schema from form field configuration
 * Supports all field types and validation rules
 */
export function generateZodSchema(fields: FormConfigType['fields']): z.ZodSchema {
  const shape: Record<string, z.ZodTypeAny> = {};

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'text':
      case 'textarea': {
        let stringSchema = z.string();

        // Apply validation rules in order
        if (field.validation?.minLength) {
          stringSchema = stringSchema.min(
            field.validation.minLength,
            `${field.label} must be at least ${field.validation.minLength} characters`
          );
        } else if (field.validation?.required) {
          stringSchema = stringSchema.min(1, `${field.label} is required`);
        }

        if (field.validation?.maxLength) {
          stringSchema = stringSchema.max(
            field.validation.maxLength,
            `${field.label} must be no more than ${field.validation.maxLength} characters`
          );
        }

        if (field.validation?.pattern) {
          stringSchema = stringSchema.regex(
            new RegExp(field.validation.pattern),
            `${field.label} format is invalid`
          );
        }

        // Apply optional at the end
        fieldSchema = field.validation?.required ? stringSchema : stringSchema.optional();
        break;
      }

      case 'number': {
        let numberSchema = z.coerce.number();

        // Apply validation rules
        if (field.validation?.min !== undefined) {
          numberSchema = numberSchema.min(
            field.validation.min,
            `${field.label} must be at least ${field.validation.min}`
          );
        }

        if (field.validation?.max !== undefined) {
          numberSchema = numberSchema.max(
            field.validation.max,
            `${field.label} must be no more than ${field.validation.max}`
          );
        }

        // Apply optional at the end
        fieldSchema = field.validation?.required ? numberSchema : numberSchema.optional();
        break;
      }

      case 'select': {
        const selectOptions = field.options?.map((opt) => opt.value) || [];
        const selectSchema = z.enum(selectOptions as [string, ...string[]]);
        fieldSchema = field.validation?.required ? selectSchema : selectSchema.optional();
        break;
      }

      case 'checkbox':
        fieldSchema = z.boolean().default(false);
        break;

      default:
        fieldSchema = z.string().optional();
    }

    shape[field.name] = fieldSchema;
  });

  return z.object(shape);
}

/**
 * Validate form data against generated schema
 */
 
export function validateFormData(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  schema: z.ZodSchema
): { valid: boolean; errors: Record<string, string> } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { valid: true, errors: {} };
  }

  const errors: Record<string, string> = {};
  result.error.errors.forEach((err) => {
    const path = err.path.join('.');
    errors[path] = err.message;
  });

  return { valid: false, errors };
}
