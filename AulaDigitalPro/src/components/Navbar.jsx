import { Link, NavLink } from 'react-router-dom'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

export default function Navbar({ user, onLogout }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: '#fff',
        borderBottom: '1px solid #d1d7dc',
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
          <span
            style={{
              width: '34px',
              height: '34px',
              background: '#a435f0',
              borderRadius: '4px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 800,
            }}
          >
            A
          </span>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#1c1d1f' }}>
            AulaDigitalPro
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
              border: '1px solid #1c1d1f',
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
                color: '#1c1d1f',
                textDecoration: 'none',
                paddingBottom: '2px',
                borderBottom: isActive ? '2px solid #a435f0' : '2px solid transparent',
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
                  color: '#1c1d1f',
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
                  background: user.role === 'admin' ? '#a435f0' : '#eceb98',
                  color: user.role === 'admin' ? '#fff' : '#3d3c0a',
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
                  color: '#1c1d1f',
                  background: '#fff',
                  border: '1px solid #1c1d1f',
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
                  color: '#1c1d1f',
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
                  color: '#1c1d1f',
                  border: '1px solid #1c1d1f',
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