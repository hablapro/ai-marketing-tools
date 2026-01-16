import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '@/features/auth/hooks';
import { isUserAdmin } from '@/shared/utils/userRole';

export function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log('LoginPage: No user, waiting for login');
      return;
    }

    console.log('LoginPage: User logged in:', user.email, 'ID:', user.id);

    // Check if user is admin and redirect accordingly
    const checkAndRedirect = async () => {
      const isAdmin = await isUserAdmin(user.id);
      console.log('LoginPage: isAdmin check result:', isAdmin);
      const destination = isAdmin ? '/admin' : '/';
      console.log('LoginPage: Redirecting to:', destination);
      navigate(destination);
    };

    checkAndRedirect();
  }, [user, navigate]);

  return <LoginForm />;
}

export default LoginPage;