import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import BrandLogo from './BrandLogo'
import { FONT, palette, gradients } from '../theme'

export default function Navbar({ user, onLogout }) {
  const [searchFocused, setSearchFocused] = useState(false)
  const [logoutHover, setLogoutHover] = useState(false)

  const firstName = user?.name ? user.name.split(' ')[0] : ''

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(12, 14, 38, 0.55)',
        borderBottom: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        fontFamily: FONT,
        transition: 'background 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          maxWidth: 1280,
          margin: '0 auto',
          padding: '12px 28px',
        }}
      >
        <Link
          to="/dashboard"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
        >
          <BrandLogo compact size="sm" tone="light" />
        </Link>

        {/* Barra de busqueda */}
        <div style={{ flex: 1, maxWidth: 540, position: 'relative' }}>
          <svg
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              color: searchFocused ? palette.goldBright : 'rgba(255,255,255,0.45)',
              transition: 'color 0.2s ease',
              pointerEvents: 'none',
            }}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Buscar cursos..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            style={{
              width: '100%',
              padding: '11px 18px 11px 42px',
              borderRadius: 999,
              border: `1.5px solid ${searchFocused ? palette.goldBright : 'rgba(255,255,255,0.2)'}`,
              background: searchFocused ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.08)',
              fontSize: 14,
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: searchFocused ? '0 0 0 4px rgba(245,179,1,0.15)' : 'none',
              transition: 'all 0.2s ease',
              color: '#FFFFFF',
              fontFamily: FONT,
            }}
          />
        </div>

        {/* Enlaces y sesion */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
          }}
        >
          {user && user.role === 'admin' && (
            <NavLink
              to="/admin"
              style={({ isActive }) => ({
                fontSize: 14,
                fontWeight: 700,
                color: isActive ? palette.goldBright : 'rgba(255,255,255,0.92)',
                textDecoration: 'none',
                padding: '8px 14px',
                borderRadius: 999,
                background: isActive ? 'rgba(245,179,1,0.12)' : 'transparent',
                transition: 'all 0.2s ease',
              })}
            >
              Administrar
            </NavLink>
          )}

          {user ? (
            <>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: 130,
                  padding: '0 4px',
                }}
              >
                Hola, {firstName}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: '11.5px',
                  fontWeight: 800,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: gradients.gold,
                  color: '#4A2F00',
                  boxShadow: '0 6px 16px rgba(212,175,55,0.5)',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: 13 }}>👑</span>
                {user.role === 'admin' ? 'Admin Pro' : 'Usuario Pro'}
              </span>

              <button
                onClick={onLogout}
                onMouseEnter={() => setLogoutHover(true)}
                onMouseLeave={() => setLogoutHover(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: 13.5,
                  fontWeight: 700,
                  padding: '9px 16px',
                  borderRadius: 999,
                  background: logoutHover ? '#FFFFFF' : 'transparent',
                  color: logoutHover ? palette.ink : 'rgba(255,255,255,0.95)',
                  border: `1.5px solid ${logoutHover ? '#FFFFFF' : 'rgba(255,255,255,0.35)'}`,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: FONT,
                  boxShadow: logoutHover ? '0 8px 18px rgba(10,37,64,0.25)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.95)',
                  textDecoration: 'none',
                  padding: '8px 14px',
                  borderRadius: 999,
                  transition: 'background 0.2s ease',
                }}
              >
                Iniciar sesión
              </Link>
              <Link
                to="/login"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  background: gradients.btn,
                  border: '1px solid rgba(255,255,255,0.25)',
                  padding: '10px 18px',
                  borderRadius: 999,
                  textDecoration: 'none',
                  boxShadow: '0 8px 18px rgba(109,40,217,0.35)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
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