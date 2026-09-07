import { Navigate, Link } from 'react-router-dom'
import { FONT, gradients } from '../theme'

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
          background: gradients.app,
          fontFamily: FONT,
          padding: '24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: '520px',
            height: '520px',
            borderRadius: '50%',
            position: 'absolute',
            top: '-120px',
            left: '-110px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            background: 'rgba(12,14,38,0.55)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '24px',
            padding: '42px 40px',
            maxWidth: '470px',
            width: '100%',
            textAlign: 'center',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 32px 80px rgba(20,5,45,0.5)',
            position: 'relative',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              background: gradients.btn,
              border: '2px solid rgba(255,255,255,0.4)',
              color: '#FFFFFF',
              fontSize: '32px',
              fontWeight: 900,
              lineHeight: 1,
              marginBottom: '18px',
              boxShadow: '0 10px 26px rgba(109,40,217,0.4)',
            }}
          >
            !
          </span>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#FFFFFF', margin: '0 0 10px', letterSpacing: '-0.02em' }}>
            Acceso denegado
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', margin: '0 0 26px', lineHeight: 1.6 }}>
            Solo los administradores pueden ingresar a esta página. Tu rol actual es "{user.role}".
          </p>
          <Link
            to="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: gradients.btn,
              color: '#fff',
              padding: '13px 26px',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.3)',
              fontSize: '15px',
              fontWeight: 800,
              textDecoration: 'none',
              boxShadow: '0 12px 26px rgba(20,5,45,0.4)',
              cursor: 'pointer',
              fontFamily: FONT,
            }}
          >
            ← Ir al Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return children
}