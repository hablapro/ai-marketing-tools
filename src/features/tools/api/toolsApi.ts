import { supabase } from '@/lib/supabase';
import { Tool } from '@/types/tool';
import { ToolWithRelations, PaginatedResponse } from '../types/tool.types';

/**
 * Tools API layer
 *
 * Abstracts all Supabase calls for tools data
 * Provides proper error handling and typing
 * Used by custom hooks (useTools, useToolBySlug, etc.)
 */
export const toolsApi = {
  /**
   * Fetch all tools (public listing)
   * Returns tools ordered by sort_order
   */
  async getAll(): Promise<Tool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw new Error(`Failed to fetch tools: ${error.message}`);
    return data || [];
  },

  /**
   * Fetch paginated tools (admin listing)
   * Used for admin dashboard with pagination
   */
  async getPaginated(page: number, pageSize: number): Promise<PaginatedResponse<Tool>> {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from('tools')
      .select('*', { count: 'exact' })
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw new Error(`Failed to fetch tools: ${error.message}`);

    const total = count || 0;
    const totalPages = Math.ceil(total / pageSize);

    return {
      data: data || [],
      total,
      page,
      pageSize,
      totalPages,
    };
  },

  /**
   * Fetch single tool by URL slug with all relations
   *
   * FIX for N+1 Query Issue:
   * - Only fetches ONE hero_section (primary one)
   * - Fetches all FAQs (needed for display)
   * - Uses limit() to prevent over-fetching
   *
   * Old behavior: Fetched ALL hero_sections and all FAQs, then used only first hero
   * New behavior: Fetches only what's needed
   */
  async getBySlug(slug: string): Promise<ToolWithRelations> {
    const { data, error } = await supabase
      .from('tools')
      .select(
        `
        *,
        hero_sections!inner(
          id,
          tool_id,
          title,
          description,
          primary_cta,
          created_at
        ),
        faqs(
          id,
          tool_id,
          question,
          answer,
          sort_order,
          created_at
        )
      `
      )
      .eq('url', `/tools/${slug}`)
      .limit(1, { foreignTable: 'hero_sections' }) // FIX: Limit hero_sections to 1
      .order('sort_order', { ascendingForeignTable: 'faqs' })
      .single();

    if (error) throw new Error(`Failed to fetch tool: ${error.message}`);
    if (!data) throw new Error('Tool not found');

    return data as ToolWithRelations;
  },

  /**
   * Fetch single tool by ID
   */
  async getById(id: string): Promise<Tool> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(`Failed to fetch tool: ${error.message}`);
    if (!data) throw new Error('Tool not found');

    return data;
  },

  /**
   * Create new tool (admin only)
   */
  async create(tool: Omit<Tool, 'id' | 'created_at' | 'updated_at'>): Promise<Tool> {
    const { data, error } = await supabase
      .from('tools')
      .insert([tool])
      .select()
      .single();

    if (error) throw new Error(`Failed to create tool: ${error.message}`);
    return data;
  },

  /**
   * Update existing tool (admin only)
   */
  async update(id: string, updates: Partial<Tool>): Promise<Tool> {
    const { data, error } = await supabase
      .from('tools')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update tool: ${error.message}`);
    return data;
  },

  /**
   * Delete tool (admin only)
   */
  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('tools').delete().eq('id', id);

    if (error) throw new Error(`Failed to delete tool: ${error.message}`);
  },

  /**
   * Update tool fields (form configuration)
   */
  async updateFields(
    id: string,
    fields: Tool['fields']
  ): Promise<Tool> {
    const { data, error } = await supabase
      .from('tools')
      .update({ fields })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update tool fields: ${error.message}`);
    return data;
  },
};
