import { useState } from 'react'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

const demoUsers = [
  { id: 1, name: 'Ana Ocampo', email: 'admin@aula.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Carlos Mora', email: 'user@aula.com', password: 'user123', role: 'user' },
]

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

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [buttonHover, setButtonHover] = useState(false)

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
        setError(
          'No se pudo conectar con JSON Server y las credenciales no coinciden con la cuenta demo. Usa los botones de abajo o ejecuta "npm run server".'
        )
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

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            margin: '20px 0',
            fontSize: '13px',
            color: '#6a6f73',
          }}
        >
          <span style={{ flex: 1, height: '1px', background: '#d1d7dc' }} />
          o prueba una cuenta demo
          <span style={{ flex: 1, height: '1px', background: '#d1d7dc' }} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={() => handleDemo('admin')}
            style={{
              flex: 1,
              padding: '12px',
              background: '#a435f0',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
          >
            Entrar como Admin
          </button>
          <button
            type="button"
            onClick={() => handleDemo('user')}
            style={{
              flex: 1,
              padding: '12px',
              background: '#fff',
              color: '#1c1d1f',
              fontSize: '14px',
              fontWeight: 700,
              border: '1px solid #1c1d1f',
              borderRadius: '2px',
              cursor: 'pointer',
            }}
          >
            Entrar como Usuario
          </button>
        </div>
        <p
          style={{
            fontSize: '12px',
            color: '#6a6f73',
            margin: '12px 0 0',
            textAlign: 'center',
          }}
        >
          Admin: admin@aula.com / admin123 · Usuario: user@aula.com / user123
        </p>
      </form>
    </div>
  )
}