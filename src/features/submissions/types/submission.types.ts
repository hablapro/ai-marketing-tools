/**
 * Tool Submission Types
 *
 * Defines TypeScript interfaces for user tool submissions
 * and query responses
 */

export interface ToolSubmission {
  id: string;
  user_id: string;
  tool_id: string;
  tool_name: string;
  form_data: Record<string, any>;
  result: any;
  status: 'success' | 'pending' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface CreateSubmissionInput {
  tool_id: string;
  tool_name: string;
  form_data: Record<string, any>;
  result: any;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export type PaginatedSubmissions = PaginatedResponse<ToolSubmission>;
