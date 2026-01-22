/**
 * Tool Submissions API
 *
 * Abstracts all Supabase calls for user tool submissions
 * Provides proper error handling and typing
 * Used by custom hooks (useSubmissions, useCreateSubmission, etc.)
 */

import { supabase } from '@/lib/supabase';
import { CreateSubmissionInput, PaginatedSubmissions, ToolSubmission } from '../types/submission.types';

export const submissionsApi = {
  /**
   * Create a new tool submission
   * Saves user's form input and webhook result
   */
  async create(submission: CreateSubmissionInput): Promise<ToolSubmission> {
    const { data, error } = await supabase
      .from('tool_submissions')
      .insert([
        {
          tool_id: submission.tool_id,
          tool_name: submission.tool_name,
          form_data: submission.form_data,
          result: submission.result,
          status: 'success',
        },
      ])
      .select()
      .single();

    if (error) throw new Error(`Failed to create submission: ${error.message}`);
    return data;
  },

  /**
   * Fetch all submissions for current user
   * Returns newest first
   */
  async getAll(): Promise<ToolSubmission[]> {
    const { data, error } = await supabase
      .from('tool_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch submissions: ${error.message}`);
    return data || [];
  },

  /**
   * Fetch paginated submissions for current user
   * Optional filter by tool_id
   */
  async getPaginated(params: {
    page: number;
    pageSize: number;
    toolId?: string;
  }): Promise<PaginatedSubmissions> {
    const from = (params.page - 1) * params.pageSize;
    const to = from + params.pageSize - 1;

    let query = supabase
      .from('tool_submissions')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    // Optional filter by tool_id
    if (params.toolId) {
      query = query.eq('tool_id', params.toolId);
    }

    const { data, error, count } = await query;

    if (error) throw new Error(`Failed to fetch submissions: ${error.message}`);

    const total = count || 0;
    const totalPages = Math.ceil(total / params.pageSize);

    return {
      data: data || [],
      total,
      page: params.page,
      pageSize: params.pageSize,
      totalPages,
    };
  },

  /**
   * Fetch single submission by ID
   */
  async getById(id: string): Promise<ToolSubmission> {
    const { data, error } = await supabase
      .from('tool_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to fetch submission: ${error.message}`);
    if (!data) throw new Error('Submission not found');

    return data;
  },

  /**
   * Delete a submission
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('tool_submissions')
      .delete()
      .eq('id', id);

    if (error) throw new Error(`Failed to delete submission: ${error.message}`);
  },

  /**
   * Delete all submissions for a specific tool
   * Useful for cleanup/maintenance
   */
  async deleteByTool(toolId: string): Promise<void> {
    const { error } = await supabase
      .from('tool_submissions')
      .delete()
      .eq('tool_id', toolId);

    if (error) throw new Error(`Failed to delete submissions: ${error.message}`);
  },
};
