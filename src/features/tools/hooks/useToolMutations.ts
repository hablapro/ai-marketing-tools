import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toolsApi } from '../api/toolsApi';
import { toolsQueryKeys, adminQueryKeys } from '@/shared/lib/queryClient';
import { Tool } from '@/types/tool';

/**
 * Hook for all tool mutations (create, update, delete)
 *
 * Features:
 * - Automatic cache invalidation
 * - Optimistic updates (optional)
 * - Error handling
 * - Loading states
 *
 * @example
 * const { createTool, updateTool, deleteTool } = useToolMutations();
 *
 * const { mutate, isPending } = createTool;
 * mutate({
 *   name: 'My Tool',
 *   description: 'A great tool',
 *   // ...other fields
 * });
 */
export function useToolMutations() {
  const queryClient = useQueryClient();

  /**
   * Create a new tool
   * Invalidates tools list after creation
   */
  const createTool = useMutation({
    mutationFn: (data: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) =>
      toolsApi.create(data),
    onSuccess: () => {
      // Invalidate all tools queries to force refetch
      queryClient.invalidateQueries({ queryKey: toolsQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all });
    },
  });

  /**
   * Update an existing tool
   * Invalidates tools list and specific tool after update
   */
  const updateTool = useMutation({
    mutationFn: ({ id, ...updates }: Partial<Tool> & { id: string }) =>
      toolsApi.update(id, updates),
    onSuccess: (updatedTool) => {
      // Update specific tool in cache
      queryClient.setQueryData(
        toolsQueryKeys.detail(updatedTool.id),
        updatedTool
      );
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: toolsQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all });
    },
  });

  /**
   * Delete a tool
   * Removes from cache after deletion
   */
  const deleteTool = useMutation({
    mutationFn: (id: string) => toolsApi.delete(id),
    onSuccess: () => {
      // Invalidate all tools queries
      queryClient.invalidateQueries({ queryKey: toolsQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all });
    },
  });

  /**
   * Update tool fields (form configuration)
   * Used by admin to configure dynamic form fields
   */
  const updateFields = useMutation({
    mutationFn: ({ id, fields }: { id: string; fields: Tool['fields'] }) =>
      toolsApi.updateFields(id, fields),
    onSuccess: (updatedTool) => {
      // Update cache
      queryClient.setQueryData(
        toolsQueryKeys.detail(updatedTool.id),
        updatedTool
      );
      queryClient.invalidateQueries({ queryKey: toolsQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.all });
    },
  });

  return {
    createTool,
    updateTool,
    deleteTool,
    updateFields,
  };
}
