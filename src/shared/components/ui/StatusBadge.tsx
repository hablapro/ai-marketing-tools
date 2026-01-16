import { cn } from '@/shared/utils/cn';

type ToolStatus = 'active' | 'inactive' | 'coming_soon' | 'archived';

interface StatusBadgeProps {
  status: ToolStatus;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusConfig: Record<
  ToolStatus,
  { bg: string; text: string; label: string }
> = {
  active: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: 'Active',
  },
  inactive: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    label: 'Inactive',
  },
  coming_soon: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'Coming Soon',
  },
  archived: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'Archived',
  },
};

const sizeClasses = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

/**
 * Status badge component
 *
 * Centralizes the duplicate status badge styling logic that was
 * scattered across ToolCard and AdminPage
 *
 * @example
 * <StatusBadge status="active" />
 * <StatusBadge status="coming_soon" size="lg" />
 */
export function StatusBadge({ status, size = 'md', className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        config.bg,
        config.text,
        sizeClasses[size],
        className
      )}
    >
      {config.label}
    </span>
  );
}
