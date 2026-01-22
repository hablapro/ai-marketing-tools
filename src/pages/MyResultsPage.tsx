import React, { useMemo, useState } from 'react';
import { ArrowLeft, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSubmissions, useDeleteSubmission } from '@/features/submissions/hooks';
import { ResultsGrid } from '@/features/submissions/components';
import { Spinner } from '@/shared/components';

export function MyResultsPage() {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Fetch submissions
  const { data: submissions = [], isLoading } = useSubmissions();
  const { mutate: deleteSubmission, isPending: isDeleting } = useDeleteSubmission();

  // Get unique tools from submissions for filtering
  const uniqueTools = useMemo(() => {
    const tools = new Map<string, string>();
    submissions.forEach((sub) => {
      if (!tools.has(sub.tool_id)) {
        tools.set(sub.tool_id, sub.tool_name);
      }
    });
    return Array.from(tools.entries()).map(([id, name]) => ({ id, name }));
  }, [submissions]);

  // Filter and sort submissions
  const filteredSubmissions = useMemo(() => {
    let filtered = submissions;

    // Filter by tool
    if (selectedTool) {
      filtered = filtered.filter((sub) => sub.tool_id === selectedTool);
    }

    // Sort
    const sorted = [...filtered];
    if (sortOrder === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else {
      sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }

    return sorted;
  }, [submissions, selectedTool, sortOrder]);

  const handleDelete = (id: string) => {
    deleteSubmission(id);
  };

  return (
    <div className="min-h-screen bg-[#0F1B3C]">
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-28 left-4 z-50 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-black/80 rounded-md hover:bg-black backdrop-blur-sm transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            My Results
          </h1>
          <p className="text-gray-400">
            {filteredSubmissions.length} {filteredSubmissions.length === 1 ? 'result' : 'results'} from your tools
          </p>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Tool Filter */}
          {uniqueTools.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedTool || ''}
                onChange={(e) => setSelectedTool(e.target.value || null)}
                className="px-4 py-2 bg-[#1a2847] border border-gray-700 rounded-lg text-white text-sm font-medium hover:border-[#6B5BFF]/50 focus:outline-none focus:border-[#6B5BFF] focus:ring-2 focus:ring-[#6B5BFF]/20 transition-colors"
              >
                <option value="">All Tools</option>
                {uniqueTools.map((tool) => (
                  <option key={tool.id} value={tool.id}>
                    {tool.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort */}
          <div className="flex items-center gap-2">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
              className="px-4 py-2 bg-[#1a2847] border border-gray-700 rounded-lg text-white text-sm font-medium hover:border-[#6B5BFF]/50 focus:outline-none focus:border-[#6B5BFF] focus:ring-2 focus:ring-[#6B5BFF]/20 transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
            <Spinner size="lg" label="Loading your results..." />
          </div>
        ) : (
          <ResultsGrid
            submissions={filteredSubmissions}
            onDelete={handleDelete}
            isDeleting={isDeleting}
            emptyMessage={
              selectedTool
                ? 'No results for this tool. Try running it to see results here!'
                : 'No results yet. Try running a tool to see your results here!'
            }
          />
        )}
      </div>
    </div>
  );
}

export default MyResultsPage;
