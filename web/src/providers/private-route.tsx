import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/hooks/use-auth';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
