import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { Login } from '@src/pages/Login'
import { Register } from '@src/pages/Register'
import { ConfirmAccount } from '@src/pages/ConfirmAccount'
import Table from '@src/pages/Table'
import { AuthGuard } from '@src/components/AuthGuard'
import { MainLayout } from '@src/layouts/MainLayout'
import { useAuth } from '@src/hooks/useAuth'

function HomeRedirect() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/table" replace />;
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/confirm-account" element={<ConfirmAccount />} />
        </Route>
        <Route element={<MainLayout />}>
          {/* Protected routes */}
          <Route element={<AuthGuard />}>
            <Route path="/table" element={<Table />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}