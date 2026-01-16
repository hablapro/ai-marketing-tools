import { useEffect, useRef } from 'react';

/**
 * Custom hook to manage focus trap in modal dialogs
 * Keeps focus within the modal and restores it when modal closes
 *
 * @param isActive - Whether the focus trap should be active
 * @param options - Configuration options
 */
export function useFocusTrap(
  isActive: boolean = true,
  options?: {
    initialFocusSelector?: string;
    restoreFocus?: boolean;
  }
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // Store the currently focused element to restore later
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // Get all focusable elements within the container
    const getFocusableElements = () => {
      if (!containerRef.current) return [];

      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      return Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors)
      );
    };

    // Set initial focus
    const focusableElements = getFocusableElements();
    if (focusableElements.length > 0) {
      // Try to focus initial focus selector if provided
      if (options?.initialFocusSelector) {
        const initialElement = containerRef.current?.querySelector<HTMLElement>(
          options.initialFocusSelector
        );
        if (initialElement) {
          initialElement.focus();
          return;
        }
      }

      // Default: focus first focusable element
      focusableElements[0].focus();
    }

    // Handle Tab key to create focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (e.shiftKey) {
        // Shift+Tab: move backwards
        if (activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: move forwards
        if (activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    containerRef.current?.addEventListener('keydown', handleKeyDown);

    // Cleanup: restore focus
     
    return () => {
      containerRef.current?.removeEventListener('keydown', handleKeyDown);

      if (options?.restoreFocus !== false && previousActiveElementRef.current) {
        previousActiveElementRef.current.focus();
      }
    };
  }, [isActive, options?.initialFocusSelector, options?.restoreFocus]);

  return containerRef;
}
