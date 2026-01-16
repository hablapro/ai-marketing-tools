import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with proper conflict resolution
 * Uses clsx for conditional classes and twMerge for Tailwind conflicts
 *
 * @example
 * cn('px-2 py-1', 'px-4') // 'py-1 px-4'
 * cn('text-lg', condition && 'text-2xl') // conditionally applies text-2xl
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
