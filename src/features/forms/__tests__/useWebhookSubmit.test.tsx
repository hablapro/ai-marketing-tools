import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useWebhookSubmit } from '../hooks/useWebhookSubmit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

describe('useWebhookSubmit Hook', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
        mutations: {
          retry: false,
        },
      },
    });
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  const createWrapper = () => {
    return ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  it('should submit data to webhook successfully', async () => {
    const mockResponse = { result: 'Success' };
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useWebhookSubmit(), { wrapper: createWrapper() });

    result.current.mutate(
      {
        url: 'https://webhook.example.com/api',
        data: { test: 'data' },
      },
      {
        onSuccess: (data) => {
          expect(data).toEqual(mockResponse);
        },
      }
    );

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://webhook.example.com/api',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'data' }),
      })
    );
  });

  it('should handle non-ok response status', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    const { result } = renderHook(() => useWebhookSubmit(), { wrapper: createWrapper() });

    result.current.mutate(
      {
        url: 'https://webhook.example.com/api',
        data: { test: 'data' },
      },
      {
        onError: (error) => {
          expect(error).toBeDefined();
        },
      }
    );

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should handle network errors', async () => {
    global.fetch = vi.fn().mockRejectedValueOnce(
      new TypeError('Failed to fetch')
    );

    const { result } = renderHook(() => useWebhookSubmit(), { wrapper: createWrapper() });

    result.current.mutate(
      {
        url: 'https://webhook.example.com/api',
        data: { test: 'data' },
      },
      {
        onError: (error) => {
          expect(error).toBeDefined();
        },
      }
    );

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should retry on failure with exponential backoff', async () => {
    vi.useFakeTimers();

    global.fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error('Network error'))
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: 'Success' }),
      });

    const { result } = renderHook(() => useWebhookSubmit(), { wrapper: createWrapper() });

    result.current.mutate({
      url: 'https://webhook.example.com/api',
      data: { test: 'data' },
    });

    // Fast-forward through retries
    await vi.advanceTimersByTimeAsync(10000);

    expect(global.fetch).toHaveBeenCalledTimes(3);

    vi.useRealTimers();
  });

  it('should not retry on 4xx client errors', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
    });

    const { result } = renderHook(() => useWebhookSubmit(), { wrapper: createWrapper() });

    result.current.mutate({
      url: 'https://webhook.example.com/api',
      data: { test: 'data' },
    });

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    // Should only call fetch once (no retries)
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(result.current.error).toBeDefined();
  });

  it('should handle JSON parsing errors', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error('Invalid JSON');
      },
    });

    const { result } = renderHook(() => useWebhookSubmit(), { wrapper: createWrapper() });

    result.current.mutate({
      url: 'https://webhook.example.com/api',
      data: { test: 'data' },
    });

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(result.current.error).toBeDefined();
  });

  it('should send correct headers and body', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 'Success' }),
    });

    const { result } = renderHook(() => useWebhookSubmit(), { wrapper: createWrapper() });
    const testData = { name: 'test', value: 123 };

    result.current.mutate({
      url: 'https://webhook.example.com/api',
      data: testData,
    });

    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://webhook.example.com/api',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData),
        signal: expect.any(AbortSignal),
      }
    );
  });

  it('should update isPending state during submission', async () => {
    global.fetch = vi.fn().mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            ok: true,
            json: async () => ({ result: 'Success' }),
          });
        }, 50);
      });
    });

    const { result } = renderHook(() => useWebhookSubmit(), { wrapper: createWrapper() });

    expect(result.current.isPending).toBe(false);

    result.current.mutate({
      url: 'https://webhook.example.com/api',
      data: { test: 'data' },
    });

    // Wait for pending state
    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });

    // Wait for completion
    await waitFor(() => {
      expect(result.current.isPending).toBe(false);
    });
  });
});
