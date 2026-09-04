import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

const purple = '#a435f0'
const textPrimary = '#1c1d1f'
const textSecondary = '#6a6f73'
const borderColor = '#d1d7dc'

const filterCategories = [
  'Desarrollo de software',
  'Diseño',
  'Marketing digital',
  'Gestión de negocios',
  'TI y software',
  'Desarrollo personal',
  'Finanzas',
  'Música',
  'Productividad',
]
const levelOptions = ['Principiante', 'Intermedio', 'Avanzado']

const inputStyle = {
  width: '100%',
  padding: '11px 12px',
  fontSize: '14px',
  border: `1px solid ${borderColor}`,
  borderRadius: '2px',
  outline: 'none',
  boxSizing: 'border-box',
}

const fallbackCourses = [
  { id: 1, title: 'React desde cero: Guía completa de hooks y componentes', instructor: 'Juan Pérez', category: 'Desarrollo de software', level: 'Principiante', price: '₡9.900', oldPrice: '₡49.900', rating: 4.7, students: '12,540', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=60' },
  { id: 2, title: 'Node.js avanzado: APIs, bases de datos y microservicios', instructor: 'María García', category: 'Desarrollo de software', level: 'Intermedio', price: '₡12.900', oldPrice: '₡59.900', rating: 4.8, students: '8,210', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=60' },
  { id: 3, title: 'Fundamentos de Python: de cero a tu primer proyecto', instructor: 'Diego Rojas', category: 'Desarrollo de software', level: 'Principiante', price: '₡8.900', oldPrice: '₡39.900', rating: 4.3, students: '18,760', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=60' },
  { id: 4, title: 'UI/UX Design con Figma: metodologías y prototipos', instructor: 'Laura Jiménez', category: 'Diseño', level: 'Intermedio', price: '₡11.900', oldPrice: '₡54.900', rating: 4.6, students: '9,430', image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=60' },
  { id: 5, title: 'Diseño gráfico con Photoshop para principiantes', instructor: 'Roberto Araya', category: 'Diseño', level: 'Principiante', price: '₡7.900', oldPrice: '₡35.900', rating: 3.8, students: '5,110', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=60' },
  { id: 6, title: 'Marketing en redes sociales: de 0 a estrategia', instructor: 'Camila Vargas', category: 'Marketing digital', level: 'Principiante', price: '₡9.900', oldPrice: '₡45.900', rating: 4.5, students: '14,020', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=60' },
  { id: 7, title: 'SEO y Google Ads: posiciona y vende más', instructor: 'Pablo Navarro', category: 'Marketing digital', level: 'Intermedio', price: '₡6.900', oldPrice: '₡30.900', rating: 3.4, students: '3,850', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=60' },
  { id: 8, title: 'Gestión de proyectos ágiles con Scrum', instructor: 'Andrea Mora', category: 'Gestión de negocios', level: 'Intermedio', price: '₡10.900', oldPrice: '₡49.900', rating: 4.6, students: '6,740', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&q=60' },
  { id: 9, title: 'Emprende tu negocio desde cero', instructor: 'Fernando Castro', category: 'Gestión de negocios', level: 'Principiante', price: '₡9.900', oldPrice: '₡44.900', rating: 4.2, students: '11,390', image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=400&q=60' },
  { id: 10, title: 'Cloud computing con AWS: arquitecturas reales', instructor: 'Iván Solano', category: 'TI y software', level: 'Avanzado', price: '₡14.900', oldPrice: '₡69.900', rating: 4.7, students: '7,860', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=60' },
  { id: 11, title: 'Ciberseguridad esencial para desarrolladores', instructor: 'Natalia Vega', category: 'TI y software', level: 'Principiante', price: '₡9.900', oldPrice: '₡39.900', rating: 3.9, students: '4,280', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=60' },
  { id: 12, title: 'Productividad personal con técnicas probadas', instructor: 'Oscar Leitón', category: 'Productividad', level: 'Principiante', price: 'Gratis', oldPrice: null, rating: 4.1, students: '22,150', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=60' },
  { id: 13, title: 'Inteligencia emocional en el trabajo', instructor: 'Valentina Ríos', category: 'Desarrollo personal', level: 'Intermedio', price: '₡5.900', oldPrice: '₡25.900', rating: 3.6, students: '9,670', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=60' },
  { id: 14, title: 'Angular moderno: de componentes a servicios', instructor: 'Andrés Vargas', category: 'Desarrollo de software', level: 'Intermedio', price: '₡11.900', oldPrice: '₡52.900', rating: 4.4, students: '7,540', image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=400&q=60' },
  { id: 15, title: 'SQL y bases de datos: modelado para datos reales', instructor: 'Karla Cordero', category: 'Desarrollo de software', level: 'Principiante', price: '₡8.900', oldPrice: '₡38.900', rating: 4.0, students: '15,320', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=60' },
  { id: 16, title: 'Animación 2D y motion graphics', instructor: 'Esteban Rojas', category: 'Diseño', level: 'Avanzado', price: '₡13.900', oldPrice: '₡59.900', rating: 4.4, students: '2,980', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=60' },
  { id: 17, title: 'Illustrator para ilustración digital', instructor: 'Melissa Quesada', category: 'Diseño', level: 'Intermedio', price: '₡9.900', oldPrice: '₡44.900', rating: 4.0, students: '4,760', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=400&q=60' },
  { id: 18, title: 'Publicidad digital: Facebook e Instagram Ads', instructor: 'Javier Ureña', category: 'Marketing digital', level: 'Avanzado', price: '₡10.900', oldPrice: '₡49.900', rating: 3.5, students: '6,240', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=60' },
  { id: 19, title: 'Email marketing y automatizaciones', instructor: 'Paula Brenes', category: 'Marketing digital', level: 'Principiante', price: '₡7.900', oldPrice: '₡34.900', rating: 4.0, students: '8,510', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=60' },
  { id: 20, title: 'Finanzas para emprendedores', instructor: 'Cristian Alfaro', category: 'Finanzas', level: 'Avanzado', price: '₡12.900', oldPrice: '₡54.900', rating: 3.7, students: '3,460', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=60' },
  { id: 21, title: 'Liderazgo y gestión de equipos', instructor: 'Daniel Salas', category: 'Gestión de negocios', level: 'Intermedio', price: '₡10.900', oldPrice: '₡49.900', rating: 4.3, students: '7,980', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=400&q=60' },
  { id: 22, title: 'Docker y Kubernetes: contenedores en producción', instructor: 'Mario Picado', category: 'TI y software', level: 'Intermedio', price: '₡19.900', oldPrice: '₡79.900', rating: 4.2, students: '5,730', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=60' },
  { id: 23, title: 'Comunicación efectiva: expresa y convence', instructor: 'Gabriela Núñez', category: 'Desarrollo personal', level: 'Principiante', price: 'Gratis', oldPrice: null, rating: 4.4, students: '19,430', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=60' },
  { id: 24, title: 'Inversiones y mercados: comienza a invertir', instructor: 'Adriana Campos', category: 'Finanzas', level: 'Principiante', price: '₡12.900', oldPrice: '₡54.900', rating: 4.5, students: '4,150', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=60' },
  { id: 25, title: 'Guitarra acústica desde cero', instructor: 'José Ospina', category: 'Música', level: 'Principiante', price: '₡9.900', oldPrice: '₡42.900', rating: 4.6, students: '16,870', image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=400&q=60' },
  { id: 26, title: 'Producción musical con Ableton', instructor: 'Santiago Peralta', category: 'Música', level: 'Intermedio', price: '₡13.900', oldPrice: '₡59.900', rating: 4.3, students: '7,250', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=60' },
  { id: 27, title: 'Gestión del tiempo con técnicas ágiles', instructor: 'Patricia Solano', category: 'Productividad', level: 'Intermedio', price: '₡8.900', oldPrice: '₡38.900', rating: 4.5, students: '11,640', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=60' },
]

export default function AdminDashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [instructor, setInstructor] = useState('')
  const [category, setCategory] = useState(filterCategories[0])
  const [level, setLevel] = useState('Principiante')
  const [price, setPrice] = useState('')

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.length ? data : fallbackCourses)
      })
      .catch(() => {
        setCourses(fallbackCourses)
      })
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = async (event) => {
    event.preventDefault()
    if (!title.trim() || !instructor.trim() || !price.trim()) return

    const rawPrice = price.trim().replace('₡', '').replace(/\s/g, '')
    const newCourse = {
      title: title.trim(),
      instructor: instructor.trim(),
      category,
      level,
      price: rawPrice === '0' ? 'Gratis' : `₡${rawPrice}`,
      oldPrice: '₡49.900',
      rating: 4.5,
      students: '0',
      image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=400&q=60',
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
      newCourse.id = Date.now()
      setCourses((prev) => [...prev, newCourse])
      setTitle('')
      setInstructor('')
      setPrice('')
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' })
      setCourses((prev) => prev.filter((course) => course.id !== id))
      setError('')
    } catch {
      setCourses((prev) => prev.filter((course) => course.id !== id))
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
          Hola, {user.name}. Desde aquí puedes crear y eliminar cursos. Los precios se guardan en colones (₡).
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
            <div style={{ flex: '1', minWidth: '180px' }}>
              <label htmlFor="admin-category" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Categoría
              </label>
              <select
                id="admin-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                style={inputStyle}
              >
                {filterCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '140px' }}>
              <label htmlFor="admin-level" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Nivel
              </label>
              <select
                id="admin-level"
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                style={inputStyle}
              >
                {levelOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: '1', minWidth: '120px' }}>
              <label htmlFor="admin-price" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                Precio (colones)
              </label>
              <input
                id="admin-price"
                type="text"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="9900 (0 = Gratis)"
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
                  <th style={cellStyle}>Categoría</th>
                  <th style={cellStyle}>Instructor</th>
                  <th style={cellStyle}>Nivel</th>
                  <th style={cellStyle}>Precio</th>
                  <th style={cellStyle}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} style={{ borderBottom: `1px solid ${borderColor}` }}>
                    <td style={cellStyle}>{course.id}</td>
                    <td style={{ ...cellStyle, fontWeight: 700, color: textPrimary }}>{course.title}</td>
                    <td style={{ ...cellStyle, color: textSecondary }}>{course.category}</td>
                    <td style={{ ...cellStyle, color: textSecondary }}>{course.instructor}</td>
                    <td style={{ ...cellStyle, color: textSecondary }}>{course.level}</td>
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