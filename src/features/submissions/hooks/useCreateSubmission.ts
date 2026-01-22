/**
 * Hook for creating a new tool submission
 *
 * Features:
 * - Automatic cache invalidation
 * - Loading, error, and success states
 * - Integration with React Query mutations
 *
 * @returns Mutation state with submit function
 *
 * @example
 * const { mutate: createSubmission, isPending, error } = useCreateSubmission();
 *
 * const handleSubmit = () => {
 *   createSubmission({
 *     tool_id: '123',
 *     tool_name: 'Business Idea Evaluator',
 *     form_data: { idea: '...' },
 *     result: { analysis: '...' }
 *   });
 * };
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { submissionsApi } from '../api/submissionsApi';
import { CreateSubmissionInput } from '../types/submission.types';
import { SUBMISSIONS_QUERY_KEY } from './useSubmissions';

export function useCreateSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submission: CreateSubmissionInput) =>
      submissionsApi.create(submission),

    onSuccess: () => {
      // Invalidate submissions list to refetch updated data
      queryClient.invalidateQueries({
        queryKey: SUBMISSIONS_QUERY_KEY,
      });
    },

    onError: (error) => {
      console.error('Failed to create submission:', error);
    },
  });
}
