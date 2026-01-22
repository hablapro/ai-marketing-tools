import React from 'react';
import { ToolSubmission } from '../types/submission.types';
import { ResultCard } from './ResultCard';
import { Inbox } from 'lucide-react';

interface ResultsGridProps {
  submissions: ToolSubmission[];
  isLoading?: boolean;
  isDeleting?: boolean;
  onDelete: (id: string) => void;
  emptyMessage?: string;
}

export function ResultsGrid({
  submissions,
  isLoading = false,
  isDeleting = false,
  onDelete,
  emptyMessage = 'No results yet. Try running a tool to see your results here!'
}: ResultsGridProps) {
  // Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border bg-gradient-to-br from-[#1a2847]/40 to-[#0F1B3C]/20 backdrop-blur-md border-gray-700 animate-pulse"
          >
            <div className="space-y-4">
              <div className="h-6 bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-700 rounded w-1/2"></div>
              <div className="h-24 bg-black/30 rounded"></div>
              <div className="flex gap-2">
                <div className="h-10 bg-gray-700 rounded flex-1"></div>
                <div className="h-10 bg-gray-700 rounded w-10"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="rounded-full bg-gradient-to-br from-[#6B5BFF]/20 to-[#8B7BFF]/10 p-4 mb-4">
          <Inbox className="h-12 w-12 text-[#6B5BFF]" />
        </div>
        <h3 className="text-lg font-bold text-white mb-2">No Results Yet</h3>
        <p className="text-gray-400 text-center max-w-md">
          {emptyMessage}
        </p>
      </div>
    );
  }

  // Results grid
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {submissions.map((submission) => (
        <ResultCard
          key={submission.id}
          submission={submission}
          onDelete={onDelete}
          isDeleting={isDeleting}
        />
      ))}
    </div>
  );
}
