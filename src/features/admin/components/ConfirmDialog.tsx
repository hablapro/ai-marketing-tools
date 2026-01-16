import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useFocusTrap } from '@/shared/hooks/useFocusTrap';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDangerous?: boolean;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * Reusable confirmation dialog component
 * Replaces native confirm() with accessible modal
 *
 * Accessibility:
 * - Focus trap keeps focus within dialog
 * - Escape key to cancel
 * - ARIA attributes for screen readers
 * - Clear role and labeling for dialog
 */
export function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDangerous = false,
  isLoading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const dialogRef = useFocusTrap(isOpen, { restoreFocus: true });
  const dialogTitleId = `confirm-dialog-title-${Date.now()}`;
  const dialogDescriptionId = `confirm-dialog-description-${Date.now()}`;

  if (!isOpen) return null;

  const confirmButtonColor = isDangerous
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-blue-600 hover:bg-blue-700';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Close dialog on Escape key
    if (e.key === 'Escape') {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      aria-hidden="true"
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        className="bg-white rounded-xl shadow-lg max-w-sm w-full"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescriptionId}
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            {isDangerous && (
              <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            )}
            <div className="flex-1">
              <h3 id={dialogTitleId} className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
              <p id={dialogDescriptionId} className="mt-2 text-sm text-gray-600">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={cancelLabel}
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${confirmButtonColor}`}
              aria-label={isLoading ? `${confirmLabel} (processing)` : confirmLabel}
              aria-busy={isLoading}
            >
              {isLoading ? 'Processing...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
