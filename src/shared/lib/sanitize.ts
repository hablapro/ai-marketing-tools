import DOMPurify from 'dompurify';

/**
 * Configuration for DOMPurify sanitization
 * Only allows safe HTML tags commonly used in content
 */
const ALLOWED_TAGS = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const ALLOWED_ATTR = ['href', 'target', 'rel'];

/**
 * Sanitizes HTML to prevent XSS attacks
 * Only allows a safe subset of HTML tags and attributes
 *
 * @param dirty - The HTML string to sanitize
 * @returns Safe HTML string that can be used with dangerouslySetInnerHTML
 *
 * @example
 * const safeHtml = sanitizeHtml('<img src=x onerror="alert(1)">');
 * // Returns: '<img src="x">' (img tag removed)
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    KEEP_CONTENT: true, // Keep the text content of blocked elements
  });
}

/**
 * Sanitizes plain text input that might contain user-generated content
 * Removes all HTML tags
 *
 * @param text - The text to sanitize
 * @returns Plain text without HTML
 */
export function sanitizeText(text: string): string {
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
}

/**
 * Sanitizes JSON data before sending to external APIs
 * Ensures strings don't contain malicious content
 *
 * @param data - The data object to sanitize
 * @returns Sanitized data object
 */
export function sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      // Sanitize string values to prevent injection attacks
      sanitized[key] = sanitizeText(value);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively sanitize nested objects
      sanitized[key] = sanitizeData(value as Record<string, unknown>);
    } else if (Array.isArray(value)) {
      // Sanitize array elements
      sanitized[key] = value.map(item =>
        typeof item === 'string' ? sanitizeText(item) : item
      );
    } else {
      // Keep other types as-is (numbers, booleans, null, etc.)
      sanitized[key] = value;
    }
  }

  return sanitized;
}
