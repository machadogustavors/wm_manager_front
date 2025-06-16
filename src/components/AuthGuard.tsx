import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@src/contexts/AuthContext';

interface AuthGuardProps {
  isPrivate?: boolean;
}

export function AuthGuard({ isPrivate = true }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isPrivate && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
