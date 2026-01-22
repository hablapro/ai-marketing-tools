/**
 * Hook for deleting a user submission
 *
 * Features:
 * - Automatic cache invalidation
 * - Loading, error, and success states
 * - Integration with React Query mutations
 *
 * @returns Mutation state with delete function
 *
 * @example
 * const { mutate: deleteSubmission, isPending } = useDeleteSubmission();
 *
 * const handleDelete = (submissionId) => {
 *   deleteSubmission(submissionId);
 * };
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionsApi } from '../api/submissionsApi';
import { SUBMISSIONS_QUERY_KEY } from './useSubmissions';

export function useDeleteSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => submissionsApi.delete(id),

    onSuccess: () => {
      // Invalidate submissions list to refetch updated data
      queryClient.invalidateQueries({
        queryKey: SUBMISSIONS_QUERY_KEY,
      });
    },

    onError: (error) => {
      console.error('Failed to delete submission:', error);
    },
  });
}
