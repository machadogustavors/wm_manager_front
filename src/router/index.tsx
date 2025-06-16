import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { Login } from '@src/pages/Login'
import { Register } from '@src/pages/Register'
import { AuthGuard } from '@src/components/AuthGuard'
import { AuthLayout } from '@src/components/AuthLayout'

export function Router() {  
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
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