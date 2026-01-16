import { AdminDashboard } from '@/features/admin/pages/AdminDashboard';

/**
 * Admin page wrapper for routing
 * Delegates to refactored AdminDashboard component
 */
export function AdminPage() {
  return <AdminDashboard />;
}

export default AdminPage;