/**
 * Hook for fetching all user submissions
 *
 * Features:
 * - Automatic caching via React Query
 * - Refetch on window focus
 * - Loading and error states
 *
 * @returns Query state with submissions data
 *
 * @example
 * const { data: submissions, isLoading, error } = useSubmissions();
 */

import { useQuery } from '@tanstack/react-query';
import { submissionsApi } from '../api/submissionsApi';
import { ToolSubmission } from '../types/submission.types';

const SUBMISSIONS_QUERY_KEY = ['submissions'];

export function useSubmissions() {
  return useQuery<ToolSubmission[]>({
    queryKey: SUBMISSIONS_QUERY_KEY,
    queryFn: () => submissionsApi.getAll(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
}

export { SUBMISSIONS_QUERY_KEY };
