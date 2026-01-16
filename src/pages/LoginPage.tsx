import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuth } from '@/features/auth/hooks';
import { isUserAdmin } from '@/shared/utils/userRole';

export function LoginPage() {
  console.log('LoginPage: Component mounted');
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log('LoginPage: Current user state:', user?.email || 'No user');

  useEffect(() => {
    console.log('LoginPage: useEffect running, user:', user?.email || 'No user');
    if (!user) {
      console.log('LoginPage: No user, waiting for login');
      return;
    }

    console.log('LoginPage: User logged in:', user.email, 'ID:', user.id);
    alert(`User logged in: ${user.email}\nChecking role...`);

    // Check if user is admin and redirect accordingly
    const checkAndRedirect = async () => {
      const isAdmin = await isUserAdmin(user.id);
      console.log('LoginPage: isAdmin check result:', isAdmin);
      const destination = isAdmin ? '/admin' : '/';
      console.log('LoginPage: Redirecting to:', destination);
      alert(`Role check: isAdmin=${isAdmin}\nRedirecting to: ${destination}`);

      // Add small delay so user can see console logs
      setTimeout(() => {
        navigate(destination);
      }, 500);
    };

    checkAndRedirect();
  }, [user, navigate]);

  return <LoginForm />;
}

export default LoginPage;