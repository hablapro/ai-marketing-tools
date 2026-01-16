import { Tool } from '@/types/tool';

export type { Tool };

/**
 * Extended tool type with related data
 * Used when fetching tools with their hero sections and FAQs
 */
export interface ToolWithRelations extends Tool {
  hero_sections?: Array<{
    id: string;
    tool_id: string;
    title: string;
    description: string;
    primary_cta: string;
    created_at?: string;
  }>;
  faqs?: Array<{
    id: string;
    tool_id: string;
    question: string;
    answer: string;
    sort_order: number;
    created_at?: string;
  }>;
}

/**
 * Response for paginated queries
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}
