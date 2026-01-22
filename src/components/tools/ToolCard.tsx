import React from 'react';
import { Tool } from '../../types/tool';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const statusColors = {
    active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    coming_soon: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    beta: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  };

  const isDisabled = tool.status === 'coming_soon';

  return (
    <div
      className={`group relative p-6 rounded-2xl border bg-gradient-to-br from-[#1a2847]/40 to-[#0F1B3C]/20 backdrop-blur-md transition-all duration-300 ${
        !isDisabled ? 'border-gray-700 cursor-pointer hover:border-[#6B5BFF]/50' : 'opacity-60 border-gray-700'
      }`}
    >
      {/* Glow effect on hover */}
      {!isDisabled && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-lg pointer-events-none -z-10 bg-gradient-to-br from-[#6B5BFF] to-[#8B7BFF]" />
      )}

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="text-4xl">{tool.icon}</div>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[tool.status]}`}>
            {tool.status === 'coming_soon' ? 'Coming Soon' : tool.status.replace('_', ' ')}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#6B5BFF] transition-colors duration-200">
            {tool.name}
          </h3>
          <p className="mt-2 text-sm text-gray-300 line-clamp-2">
            {tool.description}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-200">
            {tool.category}
          </span>
          {tool.url && tool.status === 'active' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(tool);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-[#6B5BFF] rounded-lg hover:bg-[#8B7BFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6B5BFF] transition-all duration-200 hover:shadow-lg hover:shadow-[#6B5BFF]/50"
            >
              TRY IT NOW
            </button>
          )}
          {tool.status === 'coming_soon' && (
            <span className="text-sm font-medium text-amber-400">
              COMING SOON
            </span>
          )}
          {tool.status === 'beta' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(tool);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              TRY BETA
            </button>
          )}
        </div>
      </div>
    </div>
  );
}