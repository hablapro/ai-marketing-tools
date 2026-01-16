import { useQuery } from '@tanstack/react-query';
import { toolsApi } from '../api/toolsApi';
import { toolsQueryKeys } from '@/shared/lib/queryClient';
import { ToolWithRelations } from '../types/tool.types';

/**
 * Hook for fetching a single tool by URL slug with relations
 *
 * Fetches:
 * - Tool details
 * - Hero section (primary one only - N+1 fix)
 * - FAQs (all, sorted by sort_order)
 *
 * Features:
 * - Automatic caching
 * - Only enabled when slug is provided
 * - Loading and error states
 * - Retry on network failure
 *
 * @param slug - The tool URL slug (e.g., 'content-writer')
 *
 * @example
 * const { data: tool, isLoading, error } = useToolBySlug('content-writer');
 *
 * if (isLoading) return <Spinner />;
 * if (error) return <div>Tool not found</div>;
 *
 * return (
 *   <>
 *     <h1>{tool.name}</h1>
 *     <Hero section={tool.hero_sections?.[0]} />
 *     <FAQs items={tool.faqs} />
 *   </>
 * );
 */
export function useToolBySlug(slug?: string) {
  return useQuery<ToolWithRelations>({
    queryKey: toolsQueryKeys.bySlug(slug || ''),
    queryFn: () => {
      if (!slug) throw new Error('Slug is required');
      return toolsApi.getBySlug(slug);
    },
    enabled: !!slug, // Only run query if slug is provided
    retry: 2, // Retry twice for not-found errors
  });
}
