export default function ProtectedRoute({ children, user }) {
  if (!user) {
    return <p>Cargando...</p>
  }
  return children
}