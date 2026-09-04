import { Link, NavLink } from 'react-router-dom'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

function BrandMark() {
  return (
    <svg width="40" height="36" viewBox="0 0 40 36" role="img" aria-label="Logo AulaDigitalPro">
      <path d="M5 28V14C5 9 9 5 14 5h12c5 0 9 4 9 9v14" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
      <path d="M10 23c5-3 10-3 15 0V30c-5-3-10-3-15 0Z" fill="#9333EA" stroke="#1E293B" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 11v5M21 8v8M26 5v11" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}

export default function Navbar({ user, onLogout }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(59, 130, 246, 0.12)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        fontFamily: udemyFont,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '12px 24px',
        }}
      >
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <BrandMark />
          <span style={{ fontSize: '20px', fontWeight: 700 }}>
            <span style={{ color: '#3B82F6' }}>AulaDigital</span>
            <span style={{ color: '#10B981' }}>Pro</span>
          </span>
        </Link>

        <div style={{ flex: 1, maxWidth: '560px', margin: '0 auto' }}>
          <input
            type="search"
            placeholder="Buscar cursos..."
            style={{
              width: '100%',
              padding: '10px 16px',
              borderRadius: '9999px',
              border: '1px solid #CBD5E1',
              fontSize: '15px',
              outline: 'none',
            }}
          />
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user && user.role === 'admin' && (
            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                fontSize: '14px',
                fontWeight: 700,
                color: '#1E293B',
                textDecoration: 'none',
                paddingBottom: '2px',
                borderBottom: isActive ? '2px solid #3B82F6' : '2px solid transparent',
              })}
            >
              Administrar
            </NavLink>
          )}

          {user ? (
            <>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1E293B',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '160px',
                }}
              >
                Hola, {user.name}
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  background: user.role === 'admin' ? '#9333EA' : '#D1FAE5',
                  color: user.role === 'admin' ? '#FFFFFF' : '#1E293B',
                  whiteSpace: 'nowrap',
                }}
              >
                {user.role === 'admin' ? 'Admin' : 'Usuario'}
              </span>
              <button
                onClick={onLogout}
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  background: '#FFFFFF',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  color: '#7C3AED',
                  padding: '8px 14px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1E293B',
                  textDecoration: 'none',
                }}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/"
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1E293B',
                  border: '1px solid #CBD5E1',
                  padding: '8px 14px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                }}
              >
                Regístrate
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}