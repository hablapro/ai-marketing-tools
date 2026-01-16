import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks';
import { isUserAdmin } from '@/shared/utils/userRole';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  console.log('ProtectedRoute: Rendering, user:', user?.email, 'loading:', loading, 'isAdmin:', isAdmin, 'checking:', checkingAdmin);

  useEffect(() => {
    if (!user) {
      console.log('ProtectedRoute: No user, denying access');
      setCheckingAdmin(false);
      return;
    }

    console.log('ProtectedRoute: Checking if user is admin:', user.email);
    const checkRole = async () => {
      const admin = await isUserAdmin(user.id);
      console.log('ProtectedRoute: Admin check complete for', user.email, '- isAdmin:', admin);
      setIsAdmin(admin);
      setCheckingAdmin(false);
    };

    checkRole();
  }, [user]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    console.log('ProtectedRoute: User is not admin, redirecting to home');
    alert(`ACCESS DENIED\n\nUser: ${user.email}\nRole: user\n\nRedirecting to home page...`);
    return <Navigate to="/" replace />;
  }

  console.log('ProtectedRoute: User is admin, granting access');
  alert(`ACCESS GRANTED\n\nUser: ${user.email}\nRole: admin`);
  return <>{children}</>;
}