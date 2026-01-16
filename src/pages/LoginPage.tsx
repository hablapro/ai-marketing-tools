import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '@/features/auth/hooks';
import { isUserAdmin } from '@/shared/utils/userRole';

export function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Check if user is admin and redirect accordingly
    const checkAndRedirect = async () => {
      const isAdmin = await isUserAdmin(user.id);
      navigate(isAdmin ? '/admin' : '/');
    };

    checkAndRedirect();
  }, [user, navigate]);

  return <LoginForm />;
}

export default LoginPage;