import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, user, goToLogin }) {
  if (!user) {
    return <Navigate to={goToLogin ? '/login' : '/'} replace />
  }
  return children
}