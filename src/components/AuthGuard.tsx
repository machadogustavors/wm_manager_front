import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@src/hooks/useAuth';

interface AuthGuardProps {
  isPrivate?: boolean;
}

export function AuthGuard({ isPrivate = true }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/table" replace />;
  }

  return <Outlet />;
}
