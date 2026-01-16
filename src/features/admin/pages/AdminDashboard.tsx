import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Tool } from '@/types/tool';
import { useToolMutations, useToolsPaginated } from '@/features/tools/hooks';
import { Spinner } from '@/shared/components';
import { ToolList } from '../components/ToolList';
import { ToolEditorModal } from '../components/ToolEditor/ToolEditorModal';
import { ConfirmDialog } from '../components/ConfirmDialog';

/**
 * Admin dashboard for managing tools
 * Simplified main page using component breakdown
 */
export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTool, setEditingTool] = useState<Partial<Tool> | null>(null);
  const [deletingTool, setDeletingTool] = useState<Tool | null>(null);

  // Use tools pagination for admin (Phase 4+)
  const { data: toolsData, isLoading: toolsLoading } = useToolsPaginated(1, 100);
  const tools = toolsData?.data || [];

  // Use tool mutations for create/update/delete
  const { createTool, updateTool, deleteTool } = useToolMutations();

  const handleAddTool = () => {
    setEditingTool({
      id: '',
      name: '',
      description: '',
      icon: '',
      category: 'content',
      status: 'coming_soon',
      webhook_url: '',
      fields: [],
    });
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
  };

  const handleSaveTool = async (tool: Partial<Tool>) => {
    try {
      if (tool.id) {
        updateTool.mutate({ ...tool, id: tool.id });
      } else {
        createTool.mutate(
          tool as Omit<Tool, 'id' | 'created_at' | 'updated_at'>
        );
      }
      setEditingTool(null);
    } catch (error) {
      console.error('Failed to save tool:', error);
    }
  };

  const handleDeleteTool = async () => {
    if (!deletingTool) return;
    try {
      deleteTool.mutate(deletingTool.id);
      setDeletingTool(null);
    } catch (error) {
      console.error('Failed to delete tool:', error);
    }
  };

  if (toolsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner size="lg" label="Loading tools..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tool Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your AI marketing tools and their configurations
              </p>
            </div>
            <button
              onClick={handleAddTool}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 shadow-sm whitespace-nowrap"
            >
              <PlusCircle className="h-5 w-5" />
              Add New Tool
            </button>
          </div>
        </div>

        {/* Tools List */}
        <ToolList
          tools={tools}
          isLoading={toolsLoading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onEdit={handleEditTool}
          onDelete={(tool) => setDeletingTool(tool)}
        />
      </div>

      {/* Edit Modal */}
      <ToolEditorModal
        tool={editingTool}
        isLoading={
          createTool.isPending ||
          updateTool.isPending
        }
        onSave={handleSaveTool}
        onClose={() => setEditingTool(null)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingTool}
        title="Delete Tool"
        description={`Are you sure you want to delete "${deletingTool?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        isDangerous={true}
        isLoading={deleteTool.isPending}
        onConfirm={handleDeleteTool}
        onCancel={() => setDeletingTool(null)}
      />
    </div>
  );
}
