import React, { useState } from 'react';
import { Copy, Trash2, CheckCircle } from 'lucide-react';
import { ToolSubmission } from '../types/submission.types';

interface ResultCardProps {
  submission: ToolSubmission;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function ResultCard({ submission, onDelete, isDeleting = false }: ResultCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  // Format the result for display
  const formatResult = (result: any): string => {
    if (!result) return 'No result';
    if (typeof result === 'string') return result;
    if (Array.isArray(result)) return result.join('\n');
    if (typeof result === 'object' && result.result) return formatResult(result.result);
    return JSON.stringify(result, null, 2);
  };

  // Format timestamp
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    const textToCopy = formatResult(submission.result);
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Get preview text (truncated)
  const resultText = formatResult(submission.result);
  const previewText = resultText.length > 150 ? resultText.substring(0, 150) + '...' : resultText;

  return (
    <div className="group relative p-6 rounded-2xl border bg-gradient-to-br from-[#1a2847]/40 to-[#0F1B3C]/20 backdrop-blur-md border-gray-700 hover:border-[#6B5BFF]/50 transition-all duration-300">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-lg pointer-events-none -z-10 bg-gradient-to-br from-[#6B5BFF] to-[#8B7BFF]" />

      <div className="space-y-4">
        {/* Header with tool name and date */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white group-hover:text-[#6B5BFF] transition-colors duration-200">
              {submission.tool_name}
            </h3>
            <p className="mt-1 text-xs text-gray-400">
              {formatDate(submission.created_at)}
            </p>
          </div>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold border ${
            submission.status === 'success'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : submission.status === 'pending'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              : 'bg-red-500/20 text-red-300 border-red-500/30'
          }`}>
            {submission.status === 'success' ? 'Completed' : submission.status}
          </span>
        </div>

        {/* Result Preview */}
        <div className="bg-black/30 rounded-lg p-4 border border-gray-700/50">
          <p className="text-sm text-gray-300 whitespace-pre-wrap break-words font-mono leading-relaxed">
            {previewText}
          </p>
        </div>

        {/* Form Data Summary */}
        <div className="text-xs text-gray-400">
          <span className="inline-block bg-gray-700/50 px-2 py-1 rounded">
            {Object.keys(submission.form_data).length} input{Object.keys(submission.form_data).length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={handleCopy}
            disabled={isDeleting}
            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-[#6B5BFF] rounded-lg hover:bg-[#8B7BFF] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B5BFF] transition-all duration-200"
          >
            {isCopied ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            )}
          </button>
          <button
            onClick={() => onDelete(submission.id)}
            disabled={isDeleting}
            className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-red-300 bg-red-500/10 rounded-lg hover:bg-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/30 hover:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
