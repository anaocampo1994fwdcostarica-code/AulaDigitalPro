import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

const purple = '#a435f0'
const textPrimary = '#1c1d1f'
const textSecondary = '#6a6f73'
const borderColor = '#d1d7dc'

const inputStyle = {
  width: '100%',
  padding: '11px 12px',
  fontSize: '14px',
  border: `1px solid ${borderColor}`,
  borderRadius: '2px',
  outline: 'none',
  boxSizing: 'border-box',
}

export default function AdminDashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [instructor, setInstructor] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data)
        setError('')
      })
      .catch(() => {
        setError('No se pudo conectar con JSON Server. Ejecuta "npm run server" en otra terminal.')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async (event) => {
    event.preventDefault()
    if (!title.trim() || !instructor.trim() || !price.trim()) return

    const newCourse = {
      title: title.trim(),
      instructor: instructor.trim(),
      level: 'Principiante',
      price: price.trim().startsWith('$') ? price.trim() : `$${price.trim()}`,
      oldPrice: '$49.99',
      rating: 4.5,
      students: '0',
      image: 'https://via.placeholder.com/300x200',
    }

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      })
      const created = await response.json()
      setCourses((prev) => [...prev, created])
      setTitle('')
      setInstructor('')
      setPrice('')
      setError('')
    } catch {
      setError('No se pudo crear el curso.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' })
      setCourses((prev) => prev.filter((course) => course.id !== id))
    } catch {
      setError('No se pudo eliminar el curso.')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7f9fa', fontFamily: udemyFont }}>
      <Navbar user={user} onLogout={onLogout} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 700, color: textPrimary, margin: '0 0 4px' }}>
          Panel de administración
        </h1>
        <p style={{ fontSize: '14px', color: textSecondary, margin: '0 0 24px' }}>
          Hola, {user.name}. Desde aquí puedes crear y eliminar cursos (JSON Server).
        </p>

        {error && (
          <div
            style={{
              background: '#fff4f4',
              border: '1px solid #e6b3b3',
              color: '#9f1d1d',
              fontSize: '14px',
              fontWeight: 600,
              padding: '12px 16px',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
          >
            {error}
          </div>
        )}

        <div
          style={{
            background: '#fff',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px',
          }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: textPrimary, margin: '0 0 14px' }}>
            Crear curso
          </h3>
          <form
            onSubmit={handleCreate}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}
          >
            <div style={{ flex: '2', minWidth: '220px' }}>
              <label htmlFor="admin-title" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Título
              </label>
              <input
                id="admin-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ej: React Hooks avanzados"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: '1', minWidth: '160px' }}>
              <label htmlFor="admin-instructor" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Instructor
              </label>
              <input
                id="admin-instructor"
                type="text"
                value={instructor}
                onChange={(event) => setInstructor(event.target.value)}
                placeholder="Nombre del instructor"
                style={inputStyle}
              />
            </div>
            <div style={{ flex: '1', minWidth: '120px' }}>
              <label htmlFor="admin-price" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Precio
              </label>
              <input
                id="admin-price"
                type="text"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="9.99"
                style={inputStyle}
              />
            </div>
            <button
              type="submit"
              style={{
                background: purple,
                color: '#fff',
                fontSize: '14px',
                fontWeight: 700,
                border: 'none',
                padding: '11px 20px',
                borderRadius: '2px',
                cursor: 'pointer',
              }}
            >
              Crear curso
            </button>
          </form>
        </div>

        <div
          style={{
            background: '#fff',
            border: `1px solid ${borderColor}`,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '14px 20px',
              borderBottom: `1px solid ${borderColor}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: textPrimary, margin: 0 }}>
              Cursos registrados
            </h3>
            <span style={{ fontSize: '13px', color: textSecondary }}>
              {loading ? 'Cargando...' : `${courses.length} elementos`}
            </span>
          </div>

          {loading ? (
            <p style={{ padding: '20px', fontSize: '14px', color: textSecondary, margin: 0 }}>
              Cargando cursos desde JSON Server...
            </p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f7f9fa', color: textSecondary }}>
                  <th style={cellStyle}>#</th>
                  <th style={cellStyle}>Título</th>
                  <th style={cellStyle}>Instructor</th>
                  <th style={cellStyle}>Precio</th>
                  <th style={cellStyle}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td style={cellStyle}>{course.id}</td>
                    <td style={{ ...cellStyle, fontWeight: 700, color: textPrimary }}>{course.title}</td>
                    <td style={{ ...cellStyle, color: textSecondary }}>{course.instructor}</td>
                    <td style={cellStyle}>{course.price}</td>
                    <td style={cellStyle}>
                      <button
                        onClick={() => handleDelete(course.id)}
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#b42318',
                          background: '#fff',
                          border: '1px solid #b42318',
                          padding: '6px 12px',
                          borderRadius: '2px',
                          cursor: 'pointer',
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

const cellStyle = {
  textAlign: 'left',
  padding: '12px 20px',
  verticalAlign: 'top',
}