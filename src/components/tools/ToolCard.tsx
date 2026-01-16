import React from 'react';
import { Tool } from '../../types/tool';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
}

export function ToolCard({ tool, onClick }: ToolCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-800',
    coming_soon: 'bg-yellow-100 text-yellow-800',
    beta: 'bg-blue-100 text-blue-800',
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 group"
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div className="text-2xl">{tool.icon}</div>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[tool.status]}`}>
            {tool.status.replace('_', ' ')}
          </span>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {tool.name}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {tool.description}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {tool.category}
          </span>
          {tool.url && tool.status === 'active' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(tool);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              TRY IT NOW
            </button>
          )}
          {tool.status === 'coming_soon' && (
            <button
              disabled
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-gray-100 rounded-md cursor-not-allowed"
            >
              COMING SOON
            </button>
          )}
          {tool.status === 'beta' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick(tool);
              }}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
            >
              TRY BETA
            </button>
          )}
        </div>
      </div>
    </div>
  );
}