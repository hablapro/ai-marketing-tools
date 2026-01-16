import React, { useMemo, useState } from 'react';
import { Edit, Trash2, LayoutGrid, Settings, Search } from 'lucide-react';
import { Tool } from '@/types/tool';
import { StatusBadge } from '@/shared/components';

interface ToolListProps {
  tools: Tool[];
  isLoading?: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onEdit: (tool: Tool) => void;
  onDelete: (tool: Tool) => void;
}

const ITEMS_PER_PAGE = 10;

/**
 * Displays tools in grid or list view with search and pagination
 */
export function ToolList({
  tools,
  isLoading = false,
  searchQuery,
  onSearchChange,
  onEdit,
  onDelete,
}: ToolListProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    return tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tools, searchQuery]);

  // Paginate filtered tools
  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const paginatedTools = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTools.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTools, currentPage]);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {/* Search and View Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools by name or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            />
          </div>
          <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setView('grid')}
              className={`p-2 rounded transition-all duration-200 ${
                view === 'grid'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-white/50'
              }`}
              title="Grid view"
              aria-label="Switch to grid view"
              aria-pressed={view === 'grid'}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded transition-all duration-200 ${
                view === 'list'
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-white/50'
              }`}
              title="List view"
              aria-label="Switch to list view"
              aria-pressed={view === 'list'}
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid/List */}
      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {isLoading ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            Loading tools...
          </div>
        ) : paginatedTools.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            {filteredTools.length === 0 && tools.length > 0
              ? 'No tools match your search'
              : 'No tools yet'}
          </div>
        ) : (
          paginatedTools.map((tool) => (
            <div
              key={tool.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md ${
                view === 'grid' ? '' : 'flex items-center'
              }`}
            >
              <div className={`p-6 ${view === 'grid' ? '' : 'flex-1'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {tool.name}
                      </h3>
                      <StatusBadge status={tool.status} size="sm" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(tool)}
                      className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                      title="Edit tool"
                      aria-label={`Edit ${tool.name} tool`}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(tool)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      title="Delete tool"
                      aria-label={`Delete ${tool.name} tool`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {view === 'grid' && (
                  <>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                      {tool.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {tool.category}
                      </span>
                      <span className="text-sm text-gray-600">
                        {tool.fields?.length || 0} fields
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, filteredTools.length)} to{' '}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredTools.length)} of{' '}
            {filteredTools.length} tools
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 text-sm rounded-lg transition-colors duration-200 ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
