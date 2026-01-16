import React, { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Tool } from '@/types/tool';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';
import { BasicInfoForm } from './BasicInfoForm';
import { FieldsManager } from './FieldsManager';

interface ToolEditorModalProps {
  tool: Partial<Tool> | null;
  isLoading?: boolean;
  onSave: (tool: Partial<Tool>) => void;
  onClose: () => void;
}

/**
 * Modal dialog for editing tool information
 * Includes tabs for basic info and form fields management
 *
 * Accessibility:
 * - Focus trap keeps focus within modal
 * - Escape key closes modal
 * - ARIA attributes for screen readers
 */
export function ToolEditorModal({
  tool,
  isLoading = false,
  onSave,
  onClose,
}: ToolEditorModalProps) {
  const [editingTool, setEditingTool] = useState<Partial<Tool>>(
    tool || {}
  );
  const [activeTab, setActiveTab] = useState<'basic' | 'fields'>('basic');
  const modalRef = useFocusTrap(tool !== null, { restoreFocus: true });

  if (!tool) return null;

  const handleSave = () => {
    onSave(editingTool);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Close modal on Escape key
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const isNewTool = !editingTool.id;
  const modalTitleId = `tool-editor-modal-title-${tool.id || 'new'}`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      aria-hidden="true"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h3 id={modalTitleId} className="text-xl font-semibold text-gray-900">
            {isNewTool ? 'Add New Tool' : 'Edit Tool'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Close modal"
            title="Close (Escape key)"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6 flex gap-8" role="tablist">
          <button
            onClick={() => setActiveTab('basic')}
            className={`py-3 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === 'basic'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            role="tab"
            aria-selected={activeTab === 'basic'}
            aria-controls="tab-basic-content"
            id="tab-basic"
          >
            Basic Information
          </button>
          <button
            onClick={() => setActiveTab('fields')}
            className={`py-3 font-medium transition-colors duration-200 border-b-2 ${
              activeTab === 'fields'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
            role="tab"
            aria-selected={activeTab === 'fields'}
            aria-controls="tab-fields-content"
            id="tab-fields"
          >
            Form Fields
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div id="tab-basic-content" role="tabpanel" aria-labelledby="tab-basic" hidden={activeTab !== 'basic'}>
            {activeTab === 'basic' && (
              <BasicInfoForm
                tool={editingTool}
                onChange={setEditingTool}
              />
            )}
          </div>
          <div id="tab-fields-content" role="tabpanel" aria-labelledby="tab-fields" hidden={activeTab !== 'fields'}>
            {activeTab === 'fields' && (
              <FieldsManager
                fields={editingTool.fields || []}
                onChange={(fields) => setEditingTool({ ...editingTool, fields })}
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Cancel editing"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isLoading ? 'Saving changes' : 'Save tool changes'}
            aria-busy={isLoading}
          >
            <Save className="h-5 w-5" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
