import React from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import { sanitizeHtml } from '@/shared/lib/sanitize';
import { FormResponse } from '../../types/form.types';

interface FormResponseProps {
  response: FormResponse | null;
  resultTitle: string;
  isRegenerating?: boolean;
  onRegenerate?: () => void;
  onCopy?: () => void;
  isCopied?: boolean;
}

/**
 * Component for displaying webhook responses
 * Supports both string and array responses with proper sanitization
 */
export function FormResponseDisplay({
  response,
  resultTitle,
  isRegenerating = false,
  onRegenerate,
  onCopy,
  isCopied = false,
}: FormResponseProps) {
  if (!response) return null;

  const responseContent = response.result || response;

  return (
    <div className="rounded-lg p-6 bg-green-50 border border-green-200">
      <div className="relative">
        {/* Result Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {resultTitle}
        </h2>

        {/* Action Buttons */}
        <div className="flex justify-end mb-4 gap-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              disabled={isRegenerating}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Regenerate content"
              aria-label="Regenerate"
            >
              <RefreshCw
                className={`h-5 w-5 text-gray-700 ${
                  isRegenerating ? 'animate-spin' : ''
                }`}
              />
            </button>
          )}
          {onCopy && (
            <button
              onClick={onCopy}
              className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors"
              title="Copy to clipboard"
              aria-label="Copy"
            >
              {isCopied ? (
                <Check className="h-5 w-5 text-green-700" />
              ) : (
                <Copy className="h-5 w-5 text-gray-700" />
              )}
            </button>
          )}
        </div>

        {/* Response Content */}
        <div className="prose prose-sm max-w-none bg-white rounded-lg p-4 border border-gray-200">
          {Array.isArray(responseContent) ? (
            <div className="space-y-4">
              {responseContent.map((item, index) => (
                <div
                  key={index}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(String(item)),
                  }}
                  className="[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-3 [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:underline [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto"
                />
              ))}
            </div>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(String(responseContent)),
              }}
              className="[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-3 [&_a]:text-blue-600 [&_a]:hover:text-blue-800 [&_a]:underline [&_ul]:ml-4 [&_ul]:list-disc [&_ol]:ml-4 [&_ol]:list-decimal [&_li]:mb-1 [&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_code]:bg-gray-100 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_pre]:bg-gray-900 [&_pre]:text-white [&_pre]:p-4 [&_pre]:rounded [&_pre]:overflow-x-auto"
            />
          )}
        </div>
      </div>
    </div>
  );
}
