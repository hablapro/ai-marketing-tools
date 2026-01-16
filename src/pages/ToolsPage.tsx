import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTools } from '@/features/tools/hooks';
import { Tool } from '../types/tool';
import { ToolGrid } from '../components/tools/ToolGrid';
import { Spinner } from '@/shared/components';
import { updateDocumentMeta } from '../utils/meta';

export function ToolsPage() {
  const navigate = useNavigate();
  const { data: tools = [], isLoading, error } = useTools();

  // Update page metadata on mount
  useEffect(() => {
    updateDocumentMeta(
      'AI Marketing Tools - Supercharge Your Marketing',
      'Boost engagement, streamline workflows, and maximize conversions with our suite of AI-powered marketing tools for small businesses.'
    );
  }, []);

  const handleToolClick = (tool: Tool) => {
    if (tool.url && tool.status !== 'coming_soon') {
      navigate(tool.url);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" label="Loading tools..." />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Tools</h2>
          <p className="text-gray-600">
            {error instanceof Error ? error.message : 'Failed to load tools'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Supercharge Your Marketing with AI-Powered Tools
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Boost engagement, streamline workflows, and maximize conversions with cutting-edge AI marketing solutions tailored for small business owners.
          </p>
        </div>

        <ToolGrid tools={tools} onClick={handleToolClick} />
      </div>
    </div>
  );
}

export default ToolsPage;