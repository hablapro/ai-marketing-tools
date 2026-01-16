/**
 * Backward compatibility wrapper for DynamicForm
 *
 * This file re-exports the refactored DynamicForm from the features/forms module
 * to maintain compatibility with existing imports in ToolPage and other components.
 */

export { DynamicForm } from '@/features/forms/components/DynamicForm';
export type { FormConfigType, FormData, FormResponse } from '@/features/forms/types/form.types';