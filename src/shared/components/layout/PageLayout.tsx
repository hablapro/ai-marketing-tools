import { ReactNode } from 'react';
import { cn } from '@/shared/utils/cn';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  /** Show the navbar at the top of the page */
  showNavbar?: boolean;
  /** Show the footer at the bottom of the page */
  showFooter?: boolean;
}

/**
 * Standard page layout wrapper with navbar and footer
 *
 * Provides consistent layout structure for all pages
 *
 * @example
 * <PageLayout showNavbar showFooter>
 *   <div className="max-w-3xl mx-auto px-4 py-8">
 *     Page content here
 *   </div>
 * </PageLayout>
 */
export function PageLayout({
  children,
  className,
  containerClassName,
  showNavbar = true,
  showFooter = true,
}: PageLayoutProps) {
  return (
    <div className={cn('min-h-screen flex flex-col', className)}>
      {showNavbar && (
        <header className="border-b border-gray-200 bg-white">
          {/* Navbar will be placed here by parent component */}
        </header>
      )}

      <main className={cn('flex-1', containerClassName)}>
        {children}
      </main>

      {showFooter && (
        <footer className="border-t border-gray-200 bg-gray-50">
          {/* Footer will be placed here by parent component */}
        </footer>
      )}
    </div>
  );
}
