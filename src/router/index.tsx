import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { Login } from '@src/pages/Login'
import { Register } from '@src/pages/Register'
import { ConfirmAccount } from '@src/pages/ConfirmAccount'
import { AuthGuard } from '@src/components/AuthGuard'
import { AuthLayout } from '@src/components/AuthLayout'
import { useAuth } from '@src/contexts/AuthContext'

function HomeRedirect() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Navigate to="/login" replace />;
}

export function Router() {  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        {/* Public routes */}
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/confirm-account" element={<ConfirmAccount />} />
          </Route>
        </Route>

        {/* Protected routes */}
        <Route element={<AuthGuard />}>
          <Route path="/dashboard" element={<h1>Dashboard (Protected)</h1>} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}