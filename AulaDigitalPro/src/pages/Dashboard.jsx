import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

const navCategories = ['Desarrollo', 'IT', 'Diseño', 'Marketing', 'Negocios', 'Finanzas', 'Música', 'Productividad']
const filterCategories = ['Desarrollo de software', 'Diseño', 'Marketing digital', 'Gestión de negocios', 'TI y software', 'Desarrollo personal']
const levels = ['Todos los niveles', 'Principiante', 'Intermedio', 'Avanzado']
const ratings = ['4.5 y superior', '4.0 y superior', '3.5 y superior', '3.0 y superior']
const prices = ['Gratis', 'De pago']

const textPrimary = '#1c1d1f'
const textSecondary = '#6a6f73'
const purple = '#a435f0'
const purpleDark = '#5624d0'
const borderColor = '#d1d7dc'

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '14px',
  border: `1px solid ${borderColor}`,
  borderRadius: '2px',
  outline: 'none',
  boxSizing: 'border-box',
}

function FilterSection({ title, children }) {
  return (
    <section style={{ borderBottom: `1px solid ${borderColor}`, padding: '16px 0' }}>
      <h3 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary, margin: 0, paddingBottom: '8px' }}>
        {title}
      </h3>
      {children}
    </section>
  )
}

function CheckboxRow({ label }) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '7px 0',
        fontSize: '14px',
        color: textPrimary,
        cursor: 'pointer',
      }}
    >
      <input type="checkbox" style={{ accentColor: purple, width: '16px', height: '16px' }} />
      {label}
    </label>
  )
}

export default function Dashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [instructor, setInstructor] = useState('')
  const isAdmin = user?.role === 'admin'

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
    if (!title.trim() || !instructor.trim()) return

    const newCourse = {
      title: title.trim(),
      instructor: instructor.trim(),
      level: 'Principiante',
      price: '$9.99',
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
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: udemyFont }}>
      <Navbar user={user} onLogout={onLogout} />

      <div style={{ borderBottom: `1px solid ${borderColor}`, background: '#fff' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '10px 24px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: textPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Explorar
            <span style={{ fontSize: '10px' }}>▼</span>
          </span>
          {navCategories.map((category) => (
            <a key={category} href="#" style={{ fontSize: '13px', fontWeight: 600, color: textPrimary, textDecoration: 'none' }}>
              {category}
            </a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
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

        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '13px', margin: 0 }}>
            <span style={{ color: textSecondary }}>
              Inicio &gt; Cursos &gt; Desarrollo de software
            </span>
          </p>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: textPrimary, margin: '8px 0 4px' }}>
            {courses.length} resultados para "
            <span style={{ color: purpleDark }}>todos los cursos</span>"
          </h1>
          <p style={{ fontSize: '14px', color: textSecondary, margin: 0 }}>
            Bienvenido, {user.name}. Cursos de la plataforma mejor valorados por sus alumnos.
          </p>
        </div>

        {isAdmin && (
          <div
            style={{
              border: `1px solid ${borderColor}`,
              borderRadius: '8px',
              background: '#f7f9fa',
              padding: '16px',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary, margin: '0 0 12px' }}>
              Crear un nuevo curso (solo admin)
            </h3>
            <form
              onSubmit={handleCreate}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Título del curso"
                style={{ ...inputStyle, flex: '2', minWidth: '220px' }}
              />
              <input
                type="text"
                value={instructor}
                onChange={(event) => setInstructor(event.target.value)}
                placeholder="Instructor"
                style={{ ...inputStyle, flex: '1', minWidth: '160px' }}
              />
              <button
                type="submit"
                style={{
                  background: purple,
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  border: 'none',
                  padding: '10px 18px',
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              >
                Crear curso
              </button>
            </form>
          </div>
        )}

        <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
          <aside style={{ width: '250px', minWidth: '250px' }}>
            <FilterSection title="Categorías">
              {filterCategories.map((category) => (
                <CheckboxRow key={category} label={category} />
              ))}
            </FilterSection>
            <FilterSection title="Valoración">
              {ratings.map((rating) => (
                <CheckboxRow key={rating} label={`${rating} ★`} />
              ))}
            </FilterSection>
            <FilterSection title="Nivel">
              {levels.map((level) => (
                <CheckboxRow key={level} label={level} />
              ))}
            </FilterSection>
            <FilterSection title="Precio">
              {prices.map((price) => (
                <label
                  key={price}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '7px 0',
                    fontSize: '14px',
                    color: textPrimary,
                    cursor: 'pointer',
                  }}
                >
                  <input type="radio" name="price" style={{ accentColor: purple, width: '16px', height: '16px' }} />
                  {price}
                </label>
              ))}
            </FilterSection>
          </aside>

          <main style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}
            >
              <span style={{ fontSize: '14px', color: textSecondary }}>
                {loading ? 'Cargando cursos...' : `${courses.length} resultados`}
              </span>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: textPrimary }}>
                Ordenar por:
                <select
                  style={{
                    padding: '8px 10px',
                    border: `1px solid ${borderColor}`,
                    background: '#fff',
                    borderRadius: '2px',
                    fontSize: '14px',
                    color: textPrimary,
                    outline: 'none',
                  }}
                >
                  <option>Bestsellers</option>
                  <option>Más valorados</option>
                  <option>Recientes</option>
                  <option>Precio: de menor a mayor</option>
                </select>
              </label>
            </div>

            {loading ? (
              <p style={{ fontSize: '15px', color: textSecondary }}>Cargando cursos desde JSON Server...</p>
            ) : courses.length === 0 ? (
              <p style={{ fontSize: '15px', color: textSecondary }}>Aún no hay cursos. El admin puede crearlos.</p>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '24px',
                }}
              >
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    onDelete={isAdmin ? () => handleDelete(course.id) : undefined}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}