import { useState } from 'react'
import { FONT, palette, gradients } from '../theme'

const demoUsers = [
  { id: 1, name: 'Ana Ocampo', email: 'admin@aula.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Carlos Mora', email: 'user@aula.com', password: 'user123', role: 'user' },
]

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [adminHover, setAdminHover] = useState(false)
  const [userHover, setUserHover] = useState(false)

  const loginUser = (found) =>
    onLogin({ id: found.id, name: found.name, email: found.email, role: found.role })

  const findUser = (users, emailValue, passwordValue) =>
    users.find(
      (u) =>
        u.email.toLowerCase() === emailValue.trim().toLowerCase() &&
        u.password === passwordValue
    )

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Por favor completa el correo y la contraseña.')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('/api/users')
      const users = await response.json()
      const found = findUser(users, email, password)
      if (!found) {
        setError('Credenciales incorrectas. Revisa tu correo y contraseña.')
        return
      }
      loginUser(found)
    } catch {
      const found = findUser(demoUsers, email, password)
      if (!found) {
        setError('No se pudo conectar con JSON Server. Usa los botones demo o ejecuta "npm run server".')
        return
      }
      loginUser(found)
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = (role) => {
    const found = demoUsers.find((u) => u.role === role)
    loginUser(found)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: gradients.app,
        fontFamily: FONT,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Elementos decorativos */}
      <div style={{ position: 'absolute', top: '-140px', left: '-120px', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-180px', right: '-160px', width: '580px', height: '580px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.16) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '26%', right: '34%', width: '340px', height: '340px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div
        className="login-shell"
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 40px',
          display: 'grid',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        {/* Panel de marca: logo grande + textos */}
        <div className="login-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', animation: 'fadeInUp 0.6s ease both' }}>
            <img
              src="/logo-gemini.jpg"
              alt="Logotipo AulaDigital Pro"
              style={{
                width: 'clamp(170px, 20vw, 250px)',
                height: 'clamp(170px, 20vw, 250px)',
                objectFit: 'contain',
                filter: 'drop-shadow(0 20px 40px rgba(20, 5, 45, 0.5))',
              }}
            />
            <h1
              style={{
                margin: '30px 0 8px',
                fontFamily: FONT,
                fontSize: 'clamp(40px, 5.5vw, 64px)',
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: '-0.045em',
                color: '#FFFFFF',
              }}
            >
              AulaDigital<span style={{ color: palette.sky }}>Pro</span>
            </h1>
            <p style={{ fontSize: 'clamp(16px, 1.6vw, 19px)', fontWeight: 600, color: 'rgba(255,255,255,0.92)', letterSpacing: '-0.01em', margin: '0 0 22px' }}>
              Soluciones de aprendizaje pro
            </p>
            <span className="login-rule" style={{ width: 64, height: 4, borderRadius: 999, background: gradients.btn, marginBottom: 22 }} />
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.78)', maxWidth: 420, margin: 0 }}>
              Accede a cursos prácticos, proyectos reales y acompañamiento experto para avanzar con confianza en el mundo digital.
            </p>
          </div>
        </div>

        {/* Formulario de acceso — estilo Uiverse (azul → morado) */}
        <form
          onSubmit={handleSubmit}
          className="login-form-card"
          style={{
            width: '100%',
            maxWidth: 460,
            marginLeft: 'auto',
            background: 'linear-gradient(135deg, #1E40AF 0%, #7C3AED 100%)',
            borderRadius: 24,
            overflow: 'hidden',
            padding: '40px 38px',
            boxSizing: 'border-box',
            boxShadow: '0 32px 80px rgba(20, 5, 45, 0.5)',
            animation: 'slideInFromLeft 1s ease-out',
          }}
        >
          <h2
            style={{
              animation: 'appear 2s ease-out',
              textAlign: 'center',
              fontSize: 36,
              fontWeight: 800,
              color: '#FFFFFF',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
              fontFamily: FONT,
            }}
          >
            Bienvenido
          </h2>
          <p style={{ animation: 'appear 3s ease-out', textAlign: 'center', fontSize: 15, color: 'rgba(255,255,255,0.85)', margin: '0 0 32px', lineHeight: 1.5 }}>
            Inicia sesión con tu cuenta
          </p>

          <div style={{ marginBottom: 26 }} className="login-field">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="email">Correo electrónico</label>
          </div>

          <div style={{ marginBottom: 26 }} className="login-field">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder=" "
              required
            />
            <label htmlFor="password">Contraseña</label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 26 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'rgba(255,255,255,0.9)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                style={{ accentColor: '#8B5CF6', width: 15, height: 15, borderRadius: 4 }}
                defaultChecked={false}
              />
              Recuérdame
            </label>
            <a href="#" style={{ fontSize: 14, color: '#BFDBFE', textDecoration: 'none' }} onClick={(event) => event.preventDefault()}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {error && (
            <div style={{ background: 'rgba(220, 38, 38, 0.35)', border: '1px solid rgba(252, 165, 165, 0.5)', color: '#FEE2E2', fontSize: 13.5, fontWeight: 500, padding: '12px 16px', borderRadius: 12, marginBottom: 20, lineHeight: 1.5 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 14,
              background: loading ? 'rgba(167,139,250,0.7)' : '#8B5CF6',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              border: 'none',
              borderRadius: 10,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
              transition: 'background 0.2s ease',
              fontFamily: FONT,
            }}
            onMouseEnter={(event) => (event.currentTarget.style.background = '#6D28D9')}
            onMouseLeave={(event) => (event.currentTarget.style.background = loading ? 'rgba(167,139,250,0.7)' : '#8B5CF6')}
          >
            {loading ? 'Verificando...' : 'Iniciar sesión'}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0', fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.22)' }} />
            o prueba una cuenta demo
            <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.22)' }} />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              onClick={() => handleDemo('admin')}
              onMouseEnter={() => setAdminHover(true)}
              onMouseLeave={() => setAdminHover(false)}
              style={{ flex: 1, padding: 12, background: adminHover ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.12)', color: '#FFFFFF', fontSize: 13.5, fontWeight: 700, border: '1.5px solid rgba(255,255,255,0.45)', borderRadius: 10, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.2s ease', transform: adminHover ? 'translateY(-2px)' : 'none' }}
            >
              Entrar como Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemo('user')}
              onMouseEnter={() => setUserHover(true)}
              onMouseLeave={() => setUserHover(false)}
              style={{ flex: 1, padding: 12, background: userHover ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.92)', color: palette.ink, fontSize: 13.5, fontWeight: 700, border: '1.5px solid transparent', borderRadius: 10, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.2s ease', transform: userHover ? 'translateY(-2px)' : 'none' }}
            >
              Entrar como Usuario
            </button>
          </div>

          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', margin: '20px 0 0', textAlign: 'center', lineHeight: 1.6 }}>
            Admin: admin@aula.com / admin123 · Usuario: user@aula.com / user123
          </p>
        </form>
      </div>
    </div>
  )
}