import { describe, it, expect } from 'vitest';
import { generateZodSchema, validateFormData } from '../utils/validation';
import { FormField } from '../types/form.types';

describe('Form Validation Utilities', () => {
  describe('generateZodSchema', () => {
    it('should generate schema for text field with required validation', () => {
      const fields: FormField[] = [
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          required: true,
          validation: { required: true },
        },
      ];

      const schema = generateZodSchema(fields);
      const result = schema.safeParse({ email: '' });
      expect(result.success).toBe(false);
    });

    it('should accept valid text input', () => {
      const fields: FormField[] = [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          validation: { required: true },
        },
      ];

      const schema = generateZodSchema(fields);
      const result = schema.safeParse({ name: 'John' });
      expect(result.success).toBe(true);
    });

    it('should validate minLength constraint', () => {
      const fields: FormField[] = [
        {
          name: 'password',
          label: 'Password',
          type: 'text',
          validation: { minLength: 8 },
        },
      ];

      const schema = generateZodSchema(fields);
      const shortResult = schema.safeParse({ password: 'short' });
      expect(shortResult.success).toBe(false);

      const longResult = schema.safeParse({ password: 'verylongpassword' });
      expect(longResult.success).toBe(true);
    });

    it('should validate maxLength constraint', () => {
      const fields: FormField[] = [
        {
          name: 'username',
          label: 'Username',
          type: 'text',
          validation: { maxLength: 20 },
        },
      ];

      const schema = generateZodSchema(fields);
      const result = schema.safeParse({
        username: 'a'.repeat(21),
      });
      expect(result.success).toBe(false);
    });

    it('should validate number field with min/max', () => {
      const fields: FormField[] = [
        {
          name: 'age',
          label: 'Age',
          type: 'number',
          validation: { min: 18, max: 100 },
        },
      ];

      const schema = generateZodSchema(fields);

      const tooLow = schema.safeParse({ age: 10 });
      expect(tooLow.success).toBe(false);

      const tooHigh = schema.safeParse({ age: 150 });
      expect(tooHigh.success).toBe(false);

      const valid = schema.safeParse({ age: 25 });
      expect(valid.success).toBe(true);
    });

    it('should validate select field with options', () => {
      const fields: FormField[] = [
        {
          name: 'category',
          label: 'Category',
          type: 'select',
          options: [
            { label: 'Content', value: 'content' },
            { label: 'Social', value: 'social' },
          ],
          validation: { required: true },
        },
      ];

      const schema = generateZodSchema(fields);

      const invalid = schema.safeParse({ category: 'invalid' });
      expect(invalid.success).toBe(false);

      const valid = schema.safeParse({ category: 'content' });
      expect(valid.success).toBe(true);
    });

    it('should handle checkbox fields', () => {
      const fields: FormField[] = [
        {
          name: 'agree',
          label: 'I agree',
          type: 'checkbox',
        },
      ];

      const schema = generateZodSchema(fields);

      const result1 = schema.safeParse({ agree: true });
      expect(result1.success).toBe(true);

      const result2 = schema.safeParse({ agree: false });
      expect(result2.success).toBe(true);
    });

    it('should handle textarea fields', () => {
      const fields: FormField[] = [
        {
          name: 'description',
          label: 'Description',
          type: 'textarea',
          validation: { minLength: 10 },
        },
      ];

      const schema = generateZodSchema(fields);

      const short = schema.safeParse({ description: 'short' });
      expect(short.success).toBe(false);

      const long = schema.safeParse({
        description: 'This is a longer description',
      });
      expect(long.success).toBe(true);
    });

    it('should validate pattern (regex)', () => {
      const fields: FormField[] = [
        {
          name: 'code',
          label: 'Code',
          type: 'text',
          validation: { pattern: '^[A-Z]{3}[0-9]{3}$' },
        },
      ];

      const schema = generateZodSchema(fields);

      const invalid = schema.safeParse({ code: 'abc123' });
      expect(invalid.success).toBe(false);

      const valid = schema.safeParse({ code: 'ABC123' });
      expect(valid.success).toBe(true);
    });
  });

  describe('validateFormData', () => {
    it('should return valid when data passes validation', () => {
      const fields: FormField[] = [
        {
          name: 'name',
          label: 'Name',
          type: 'text',
          validation: { required: true },
        },
      ];

      const schema = generateZodSchema(fields);
      const result = validateFormData({ name: 'John' }, schema);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    it('should return errors when validation fails', () => {
      const fields: FormField[] = [
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          validation: { required: true },
        },
      ];

      const schema = generateZodSchema(fields);
      const result = validateFormData({ email: '' }, schema);

      expect(result.valid).toBe(false);
      expect(result.errors).toHaveProperty('email');
    });

    it('should handle multiple field errors', () => {
      const fields: FormField[] = [
        {
          name: 'email',
          label: 'Email',
          type: 'text',
          validation: { required: true },
        },
        {
          name: 'password',
          label: 'Password',
          type: 'text',
          validation: { required: true, minLength: 8 },
        },
      ];

      const schema = generateZodSchema(fields);
      const result = validateFormData(
        { email: '', password: 'short' },
        schema
      );

      expect(result.valid).toBe(false);
      expect(Object.keys(result.errors).length).toBe(2);
    });

    it('should provide clear error messages', () => {
      const fields: FormField[] = [
        {
          name: 'age',
          label: 'Age',
          type: 'number',
          validation: { min: 18 },
        },
      ];

      const schema = generateZodSchema(fields);
      const result = validateFormData({ age: 10 }, schema);

      expect(result.valid).toBe(false);
      expect(result.errors.age).toContain('18');
    });
  });
});
