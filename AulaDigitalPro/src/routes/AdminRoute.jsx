import { Navigate, Link } from 'react-router-dom'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

export default function AdminRoute({ children, user }) {
  if (!user) {
    return <Navigate to="/" replace />
  }

  if (user.role !== 'admin') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: '#F8FAFC',
          fontFamily: udemyFont,
          padding: '24px',
        }}
      >
        <div
          style={{
            background: '#fff',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '40px',
            maxWidth: '460px',
            width: '100%',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#fbeaea',
              color: '#b42318',
              fontSize: '30px',
              fontWeight: 800,
              lineHeight: '56px',
              marginBottom: '16px',
            }}
          >
            !
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#1E293B', margin: '0 0 8px' }}>
            Acceso denegado
          </h1>
          <p style={{ fontSize: '15px', color: '#475569', margin: '0 0 24px' }}>
            Solo los administradores pueden ingresar a esta página. Tu rol actual es "{user.role}".
          </p>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-block',
              background: '#9333EA',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '2px',
              fontSize: '15px',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            Ir al Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return children
}