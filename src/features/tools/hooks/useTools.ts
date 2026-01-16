import { useQuery } from '@tanstack/react-query';
import { toolsApi } from '../api/toolsApi';
import { toolsQueryKeys } from '@/shared/lib/queryClient';

/**
 * Hook for fetching all tools (public listing)
 *
 * Features:
 * - Automatic caching (5 minutes)
 * - Background refetching
 * - Automatic retry on error
 * - Loading and error states
 *
 * @example
 * const { data: tools, isLoading, error } = useTools();
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <ErrorMessage error={error} />;
 *
 * return <ToolsList tools={tools} />;
 */
export function useTools() {
  return useQuery({
    queryKey: toolsQueryKeys.all,
    queryFn: () => toolsApi.getAll(),
  });
}

/**
 * Hook for fetching tools with pagination (admin)
 *
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of items per page
 *
 * @example
 * const { data, isLoading } = useToolsPaginated(1, 10);
 */
export function useToolsPaginated(page: number, pageSize: number) {
  return useQuery({
    queryKey: toolsQueryKeys.list({ page, pageSize }),
    queryFn: () => toolsApi.getPaginated(page, pageSize),
    enabled: page > 0 && pageSize > 0,
  });
}
