import { useState } from 'react'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

const inputStyle = {
  width: '100%',
  padding: '14px 12px',
  fontSize: '15px',
  border: '1px solid #1c1d1f',
  borderRadius: '2px',
  outline: 'none',
  boxSizing: 'border-box',
}

const labelStyle = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 700,
  color: '#1c1d1f',
  marginBottom: '6px',
}

export default function LoginForm({ user, onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonHover, setButtonHover] = useState(false)

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
      const found = users.find(
        (u) =>
          u.email.toLowerCase() === email.trim().toLowerCase() &&
          u.password === password
      )

      if (!found) {
        setError('Credenciales incorrectas. Revisa tu correo y contraseña.')
        return
      }

      onLogin({ id: found.id, name: found.name, email: found.email, role: found.role })
    } catch {
      setError('No se pudo conectar con JSON Server. Ejecuta "npm run server" y vuelve a intentar.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        fontFamily: udemyFont,
        padding: '24px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
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
        <span style={{ fontSize: '22px', fontWeight: 700, color: '#1c1d1f' }}>
          AulaDigitalPro
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: '460px',
          border: '1px solid #d1d7dc',
          borderRadius: '4px',
          padding: '32px',
          boxSizing: 'border-box',
          background: '#fff',
        }}
      >
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1c1d1f', margin: '0 0 4px' }}>
          Iniciar sesión
        </h1>
        <p style={{ fontSize: '14px', color: '#6a6f73', margin: '0 0 24px' }}>
          Aprende nuevas habilidades y dale un impulso a tu carrera.
        </p>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="tu@email.com"
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="password" style={labelStyle}>
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            style={inputStyle}
          />
        </div>

        {error && (
          <div
            style={{
              background: '#fff4f4',
              border: '1px solid #e6b3b3',
              color: '#9f1d1d',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px',
              borderRadius: '2px',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          onMouseEnter={() => setButtonHover(true)}
          onMouseLeave={() => setButtonHover(false)}
          style={{
            width: '100%',
            padding: '14px',
            background: buttonHover ? '#8710d8' : '#a435f0',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 700,
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
        >
          {loading ? 'Verificando...' : 'Iniciar sesión'}
        </button>
      </form>

      <p style={{ fontSize: '14px', color: '#6a6f73', marginTop: '20px' }}>
        ¿Nuevo en AulaDigitalPro?{' '}
        <a href="#" style={{ color: '#5624d0', fontWeight: 700, textDecoration: 'none' }}>
          Regístrate
        </a>
      </p>

      {!user && (
        <div
          style={{
            marginTop: '16px',
            background: '#f7f9fa',
            border: '1px dashed #d1d7dc',
            borderRadius: '4px',
            padding: '14px 18px',
            fontSize: '13px',
            color: '#6a6f73',
            maxWidth: '460px',
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <strong style={{ color: '#1c1d1f' }}>Credenciales de prueba</strong>
          <div style={{ marginTop: '6px', lineHeight: '1.6' }}>
            Admin: admin@aula.com / admin123
            <br />
            Usuario: user@aula.com / user123
          </div>
        </div>
      )}
    </div>
  )
}