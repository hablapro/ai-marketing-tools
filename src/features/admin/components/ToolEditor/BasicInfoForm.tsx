import React from 'react';
import { Tool } from '@/types/tool';

interface BasicInfoFormProps {
  tool: Partial<Tool>;
  onChange: (tool: Partial<Tool>) => void;
}

/**
 * Form for basic tool information
 * Handles: name, description, icon, category, status, url, webhook_url
 *
 * Accessibility:
 * - All inputs properly associated with labels via htmlFor/id
 * - Helper text linked via aria-describedby
 * - Required fields marked with HTML required attribute
 */
export function BasicInfoForm({ tool, onChange }: BasicInfoFormProps) {
  const handleChange = (field: string, value: string | boolean | null) => {
    onChange({ ...tool, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="tool-name" className="block text-sm font-medium text-gray-700 mb-1">
          Name <span className="text-red-600" aria-label="required">*</span>
        </label>
        <input
          id="tool-name"
          type="text"
          value={tool.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="Enter tool name"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="tool-description" className="block text-sm font-medium text-gray-700 mb-1">
          Description <span className="text-red-600" aria-label="required">*</span>
        </label>
        <textarea
          id="tool-description"
          value={tool.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          rows={3}
          placeholder="Describe your tool"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="tool-icon" className="block text-sm font-medium text-gray-700 mb-1">
          Icon (emoji or character)
        </label>
        <input
          id="tool-icon"
          type="text"
          value={tool.icon || ''}
          onChange={(e) => handleChange('icon', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="🚀"
          maxLength={2}
          aria-label="Tool icon (emoji or single character)"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="tool-category" className="block text-sm font-medium text-gray-700 mb-1">
            Category <span className="text-red-600" aria-label="required">*</span>
          </label>
          <select
            id="tool-category"
            value={tool.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
            aria-required="true"
          >
            <option value="">Select category</option>
            <option value="content">Content</option>
            <option value="social">Social</option>
            <option value="analytics">Analytics</option>
            <option value="automation">Automation</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div>
          <label htmlFor="tool-status" className="block text-sm font-medium text-gray-700 mb-1">
            Status <span className="text-red-600" aria-label="required">*</span>
          </label>
          <select
            id="tool-status"
            value={tool.status || ''}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            required
            aria-required="true"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="coming_soon">Coming Soon</option>
            <option value="beta">Beta</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="tool-url" className="block text-sm font-medium text-gray-700 mb-1">
          Tool URL Path
        </label>
        <input
          id="tool-url"
          type="text"
          value={tool.url || ''}
          onChange={(e) => handleChange('url', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="/tools/your-tool-name"
          aria-label="Tool URL path (e.g., /tools/my-tool)"
        />
      </div>

      <div>
        <label htmlFor="tool-webhook" className="block text-sm font-medium text-gray-700 mb-1">
          Webhook URL
        </label>
        <input
          id="tool-webhook"
          type="url"
          value={tool.webhook_url || ''}
          onChange={(e) => handleChange('webhook_url', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
          placeholder="https://your-webhook-endpoint.com"
          aria-describedby="webhook-help-text"
        />
        <p id="webhook-help-text" className="mt-1 text-xs text-gray-500">
          Where form submissions will be sent
        </p>
      </div>
    </div>
  );
}
