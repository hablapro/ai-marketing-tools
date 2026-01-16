import { useMutation } from '@tanstack/react-query';

interface WebhookPayload {
  url: string;
  data: Record<string, unknown>;
}

interface WebhookResponse {
  result?: unknown;
  [key: string]: unknown;
}

const WEBHOOK_TIMEOUT = 30000; // 30 seconds
const WEBHOOK_RETRIES = 3;

/**
 * Custom error class for webhook-specific errors
 */
class WebhookError extends Error {
  constructor(
    public status?: number,
    public statusText?: string,
    message?: string
  ) {
    super(message || `Webhook error: ${status} ${statusText}`);
    this.name = 'WebhookError';
  }
}

/**
 * Create abort controller with timeout
 */
function createAbortControllerWithTimeout(timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeoutId };
}

/**
 * Calculate exponential backoff delay
 */
function getRetryDelay(attemptIndex: number): number {
  return Math.min(1000 * Math.pow(2, attemptIndex), 10000);
}

/**
 * Make a single webhook request with timeout
 */
async function makeWebhookRequest(
  url: string,
  data: Record<string, unknown>,
  timeoutMs: number = WEBHOOK_TIMEOUT
): Promise<WebhookResponse> {
  const { controller, timeoutId } = createAbortControllerWithTimeout(timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new WebhookError(
        response.status,
        response.statusText,
        `Webhook request failed with status ${response.status}`
      );
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new WebhookError(0, 'Network Error', 'Failed to reach webhook endpoint');
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new WebhookError(0, 'Timeout', `Request timed out after ${timeoutMs}ms`);
    }

    throw error;
  }
}

/**
 * Hook for submitting data to webhooks with retry logic
 *
 * Features:
 * - 30 second timeout per request
 * - 3 automatic retries with exponential backoff
 * - Proper error handling and typing
 * - Integrates with TanStack Query for state management
 *
 * @example
 * const { mutate, isPending, error } = useWebhookSubmit();
 *
 * const handleSubmit = () => {
 *   mutate({
 *     url: 'https://webhook.example.com/api',
 *     data: { name: 'John', email: 'john@example.com' }
 *   });
 * };
 */
export function useWebhookSubmit() {
  return useMutation({
    mutationFn: async ({ url, data }: WebhookPayload) => {
      let lastError: Error | null = null;

      // Retry up to WEBHOOK_RETRIES times
      for (let attempt = 0; attempt < WEBHOOK_RETRIES; attempt++) {
        try {
          return await makeWebhookRequest(url, data, WEBHOOK_TIMEOUT);
        } catch (error) {
          lastError = error instanceof Error ? error : new Error(String(error));

          // Don't retry on client errors (4xx)
          if (
            error instanceof WebhookError &&
            error.status &&
            error.status >= 400 &&
            error.status < 500
          ) {
            throw error;
          }

          // If this was the last attempt, throw the error
          if (attempt === WEBHOOK_RETRIES - 1) {
            throw error;
          }

          // Wait before retrying with exponential backoff
          const delay = getRetryDelay(attempt);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }

      // This should not happen, but just in case
      throw lastError || new Error('Webhook submission failed');
    },

    retry: false, // We handle retries manually in mutationFn
  });
}

export type { WebhookPayload, WebhookResponse, WebhookError };
