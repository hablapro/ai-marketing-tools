import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '../ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    // Suppress error logging during tests
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    return () => {
      spy.mockRestore();
    };
  });

  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('should catch errors thrown by children', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should show error fallback
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('should display error message in fallback', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for fallback UI with error message
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/inconvenience/i)).toBeInTheDocument();
  });

  it('should not catch errors thrown in event handlers', () => {
    const ThrowOnClick = () => {
      return (
        <button
          onClick={() => {
            throw new Error('Click error');
          }}
        >
          Click
        </button>
      );
    };

    render(
      <ErrorBoundary>
        <ThrowOnClick />
      </ErrorBoundary>
    );

    // Button should render normally (error boundaries don't catch event handler errors)
    expect(screen.getByText('Click')).toBeInTheDocument();
  });

  it('should support custom fallback prop', () => {
    const customFallback = (error: Error, reset: () => void) => (
      <div>
        <div>Custom error message</div>
        <button onClick={reset}>Reset</button>
      </div>
    );

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('should reset error state when reset button is clicked', async () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Should show error
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Click reset button
    const resetButton = screen.getByRole('button', { name: /try again/i });
    resetButton.click();

    // After reset, rerender with non-throwing component
    rerender(
      <ErrorBoundary key="reset">
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    // Should show content instead of error
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('should handle multiple nested errors', () => {
    render(
      <ErrorBoundary>
        <div>
          <ThrowError shouldThrow={true} />
        </div>
      </ErrorBoundary>
    );

    // Should catch the error despite nesting
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it('should provide error handling and logging', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Error should be logged to console
    expect(consoleSpy).toHaveBeenCalledWith('Error caught by boundary:', expect.any(Error), expect.any(Object));

    // Error UI should be displayed
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('should catch all types of errors from child components', () => {
    const customError = new Error('Custom error message');

    const ThrowCustomError = () => {
      throw customError;
    };

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowCustomError />
      </ErrorBoundary>
    );

    // Should catch the custom error
    expect(consoleSpy).toHaveBeenCalled();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
