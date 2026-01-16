import { cn } from '@/shared/utils/cn';

interface SpinnerProps {
  /**
   * Size of the spinner
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Color of the spinner
   * @default 'blue'
   */
  color?: 'blue' | 'gray' | 'white';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Loading text to display below spinner
   */
  label?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
};

const colorClasses = {
  blue: 'border-t-blue-500 border-b-blue-500',
  gray: 'border-t-gray-400 border-b-gray-400',
  white: 'border-t-white border-b-white',
};

/**
 * Animated loading spinner component
 *
 * Replaces inline spinner HTML scattered throughout the app
 * with a single, reusable component.
 *
 * @example
 * // Simple usage
 * <Spinner />
 *
 * // With size and label
 * <Spinner size="lg" label="Loading..." />
 */
export function Spinner({ size = 'md', color = 'blue', className, label }: SpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-4 border-gray-200',
          sizeClasses[size],
          colorClasses[color]
        )}
        role="status"
        aria-label={label || 'Loading...'}
      />
      {label && <p className="text-sm font-medium text-gray-600">{label}</p>}
    </div>
  );
}
