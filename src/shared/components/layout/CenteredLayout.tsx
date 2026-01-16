import { cn } from '@/shared/utils/cn';

interface CenteredLayoutProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const maxWidthClasses = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

/**
 * Centered layout component
 *
 * Replaces repeated patterns of:
 * ```
 * <div className="min-h-screen flex items-center justify-center">
 * ```
 *
 * Used for: login pages, loading states, error pages, etc.
 *
 * @example
 * <CenteredLayout>
 *   <LoginForm />
 * </CenteredLayout>
 */
export function CenteredLayout({ children, className, maxWidth = 'md' }: CenteredLayoutProps) {
  return (
    <div
      className={cn(
        'min-h-screen flex items-center justify-center px-4 py-12',
        className
      )}
    >
      <div className={cn('w-full', maxWidthClasses[maxWidth])}>
        {children}
      </div>
    </div>
  );
}
