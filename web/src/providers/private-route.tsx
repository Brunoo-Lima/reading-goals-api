import { useAuth } from '@/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};
