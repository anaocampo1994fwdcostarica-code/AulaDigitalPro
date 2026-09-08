import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import LoginForm from '../components/LoginForm'
import Dashboard from '../pages/Dashboard'
import AdminDashboard from '../pages/AdminDashboard'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

export const AppRoutes = ({ user, onLogin, onLogout }) => {
  const [goToLogin, setGoToLogin] = useState(false)

  const handleLogin = (userData) => {
    setGoToLogin(false)
    onLogin(userData)
  }

  const handleLogout = () => {
    setGoToLogin(true)
    onLogout()
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginForm onLogin={handleLogin} />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user} goToLogin={goToLogin}>
            <Dashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <AdminRoute user={user} goToLogin={goToLogin}>
            <AdminDashboard user={user} onLogout={handleLogout} />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}