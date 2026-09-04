import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import Dashboard from '../pages/Dashboard'
import AdminDashboard from '../pages/AdminDashboard'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

export const AppRoutes = ({ user, onLogin, onLogout }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm user={user} onLogin={onLogin} />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <Dashboard user={user} onLogout={onLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminDashboard user={user} onLogout={onLogout} />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}