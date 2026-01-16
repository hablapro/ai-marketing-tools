import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTools, useToolsPaginated } from '../hooks/useTools';
import { toolsApi } from '../api/toolsApi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

// Mock the tools API
vi.mock('../api/toolsApi', () => ({
  toolsApi: {
    getAll: vi.fn(),
    getPaginated: vi.fn(),
  },
}));

describe('Tools Query Hooks', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  const createWrapper = () => {
    return ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  describe('useTools', () => {
    it('should fetch all tools successfully', async () => {
      const mockTools = [
        { id: '1', name: 'Tool 1', url: '/tools/tool-1', sort_order: 0 },
        { id: '2', name: 'Tool 2', url: '/tools/tool-2', sort_order: 1 },
      ];

      vi.mocked(toolsApi.getAll).mockResolvedValueOnce(mockTools);

      const { result } = renderHook(() => useTools(), { wrapper: createWrapper() });

      // Initially should be loading
      expect(result.current.isLoading).toBe(true);

      // Wait for data to be fetched
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockTools);
      expect(toolsApi.getAll).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from API', async () => {
      const error = new Error('Failed to fetch tools');
      vi.mocked(toolsApi.getAll).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTools(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
    });

    it('should return empty array when no tools exist', async () => {
      vi.mocked(toolsApi.getAll).mockResolvedValueOnce([]);

      const { result } = renderHook(() => useTools(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual([]);
      expect(result.current.error).toBeNull();
    });

    it('should cache data correctly', async () => {
      const mockTools = [{ id: '1', name: 'Tool 1', url: '/tools/tool-1', sort_order: 0 }];
      vi.mocked(toolsApi.getAll).mockResolvedValue(mockTools);

      // Use the same wrapper (queryClient instance) for both renders
      const wrapper = createWrapper();
      const { result: result1 } = renderHook(() => useTools(), { wrapper });

      await waitFor(() => {
        expect(result1.current.isLoading).toBe(false);
      });

      // Second call with same wrapper should receive the cached data
      const { result: result2 } = renderHook(() => useTools(), { wrapper });

      expect(result2.current.data).toEqual(mockTools);
      // Both hooks should have the same data (caching works)
      expect(result1.current.data).toEqual(result2.current.data);
    });

    it('should have proper loading state', async () => {
      const mockTools = [{ id: '1', name: 'Tool 1', url: '/tools/tool-1', sort_order: 0 }];
      vi.mocked(toolsApi.getAll).mockImplementationOnce(() => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(mockTools), 50);
        });
      });

      const { result } = renderHook(() => useTools(), { wrapper: createWrapper() });

      // Should start loading
      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockTools);
    });

    it('should have proper isSuccess state', async () => {
      const mockTools = [{ id: '1', name: 'Tool 1', url: '/tools/tool-1', sort_order: 0 }];
      vi.mocked(toolsApi.getAll).mockResolvedValueOnce(mockTools);

      const { result } = renderHook(() => useTools(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockTools);
    });

    it('should provide proper error state on failure', async () => {
      const error = new Error('Network error');
      vi.mocked(toolsApi.getAll).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useTools(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });

  describe('useToolsPaginated', () => {
    it('should fetch paginated tools with correct parameters', async () => {
      const mockResponse = {
        data: [
          { id: '1', name: 'Tool 1', url: '/tools/tool-1', sort_order: 0 },
          { id: '2', name: 'Tool 2', url: '/tools/tool-2', sort_order: 1 },
        ],
        total: 25,
        page: 1,
        pageSize: 2,
        totalPages: 13,
      };

      vi.mocked(toolsApi.getPaginated).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useToolsPaginated(1, 2), { wrapper: createWrapper() });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(toolsApi.getPaginated).toHaveBeenCalledWith(1, 2);
    });

    it('should handle different page numbers', async () => {
      const mockResponse = {
        data: [{ id: '3', name: 'Tool 3', url: '/tools/tool-3', sort_order: 2 }],
        total: 25,
        page: 2,
        pageSize: 1,
        totalPages: 25,
      };

      vi.mocked(toolsApi.getPaginated).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useToolsPaginated(2, 1), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockResponse);
      expect(toolsApi.getPaginated).toHaveBeenCalledWith(2, 1);
    });

    it('should disable query when page is invalid (0 or negative)', async () => {
      const { result } = renderHook(() => useToolsPaginated(0, 10), { wrapper: createWrapper() });

      // Query should be disabled (no fetch)
      expect(result.current.isLoading).toBe(false);
      expect(toolsApi.getPaginated).not.toHaveBeenCalled();
    });

    it('should disable query when pageSize is invalid (0 or negative)', async () => {
      const { result } = renderHook(() => useToolsPaginated(1, 0), { wrapper: createWrapper() });

      // Query should be disabled (no fetch)
      expect(result.current.isLoading).toBe(false);
      expect(toolsApi.getPaginated).not.toHaveBeenCalled();
    });

    it('should enable query when parameters become valid', async () => {
      const mockResponse = {
        data: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
      };

      vi.mocked(toolsApi.getPaginated).mockResolvedValueOnce(mockResponse);

      const { result, rerender } = renderHook(
        ({ page, pageSize }: { page: number; pageSize: number }) =>
          useToolsPaginated(page, pageSize),
        {
          initialProps: { page: 0, pageSize: 0 },
          wrapper: createWrapper(),
        }
      );

      // Initially disabled
      expect(toolsApi.getPaginated).not.toHaveBeenCalled();

      // Rerender with valid parameters
      rerender({ page: 1, pageSize: 10 });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(toolsApi.getPaginated).toHaveBeenCalledWith(1, 10);
    });

    it('should include pagination metadata in response', async () => {
      const mockResponse = {
        data: [],
        total: 100,
        page: 3,
        pageSize: 10,
        totalPages: 10,
      };

      vi.mocked(toolsApi.getPaginated).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useToolsPaginated(3, 10), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      const { data } = result.current;
      expect(data?.total).toBe(100);
      expect(data?.page).toBe(3);
      expect(data?.pageSize).toBe(10);
      expect(data?.totalPages).toBe(10);
    });

    it('should update cache key when pagination parameters change', async () => {
      const mockResponse1 = {
        data: [{ id: '1', name: 'Tool 1', url: '/tools/tool-1', sort_order: 0 }],
        total: 25,
        page: 1,
        pageSize: 10,
        totalPages: 3,
      };

      const mockResponse2 = {
        data: [{ id: '11', name: 'Tool 11', url: '/tools/tool-11', sort_order: 10 }],
        total: 25,
        page: 2,
        pageSize: 10,
        totalPages: 3,
      };

      vi.mocked(toolsApi.getPaginated)
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const { result, rerender } = renderHook(
        ({ page, pageSize }: { page: number; pageSize: number }) =>
          useToolsPaginated(page, pageSize),
        {
          initialProps: { page: 1, pageSize: 10 },
          wrapper: createWrapper(),
        }
      );

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockResponse1);

      // Change to page 2
      rerender({ page: 2, pageSize: 10 });

      await waitFor(() => {
        expect(result.current.data).toEqual(mockResponse2);
      });

      expect(toolsApi.getPaginated).toHaveBeenCalledTimes(2);
    });

    it('should handle API errors gracefully', async () => {
      const error = new Error('Failed to fetch paginated tools');
      vi.mocked(toolsApi.getPaginated).mockRejectedValueOnce(error);

      const { result } = renderHook(() => useToolsPaginated(1, 10), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeUndefined();
    });
  });
});
