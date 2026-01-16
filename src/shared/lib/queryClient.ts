import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query client configuration
 *
 * Configures default behavior for all queries and mutations:
 * - Caching: 5 minutes (data is considered fresh for 5 minutes)
 * - Stale time: 5 minutes (background refetch after 5 minutes)
 * - Retry: 1 retry for failed requests
 * - Retry delay: 1 second
 * - Network error handling: Automatic recovery
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - data is fresh for this long
      gcTime: 10 * 60 * 1000, // 10 minutes - cache time (garbage collection)
      retry: 1, // Retry once on failure
      refetchOnWindowFocus: true, // Refetch when window regains focus
      refetchOnReconnect: true, // Refetch when reconnecting after offline
    },
    mutations: {
      retry: 1,
      gcTime: 10 * 60 * 1000,
    },
  },
});

/**
 * Query Key Factory
 *
 * Centralized query key definitions for type-safe cache management
 * Follows TanStack Query best practices
 *
 * @example
 * // Use in queries
 * useQuery({
 *   queryKey: toolsQueryKeys.all,
 *   queryFn: () => toolsApi.getAll(),
 * })
 */
export const toolsQueryKeys = {
  all: ['tools'] as const,
  lists: () => [...toolsQueryKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) =>
    [...toolsQueryKeys.lists(), { filters }] as const,
  details: () => [...toolsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...toolsQueryKeys.details(), id] as const,
  bySlug: (slug: string) => [...toolsQueryKeys.details(), { slug }] as const,
};

/**
 * Query Key Factory for admin endpoints with pagination
 */
export const adminQueryKeys = {
  all: ['admin', 'tools'] as const,
  lists: () => [...adminQueryKeys.all, 'list'] as const,
  list: (page: number, pageSize: number) =>
    [...adminQueryKeys.lists(), { page, pageSize }] as const,
};
