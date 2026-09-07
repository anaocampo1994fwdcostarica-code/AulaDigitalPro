import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'
import { FONT, palette, gradients } from '../theme'

const navCategories = [
  { label: 'Desarrollo', category: 'Desarrollo de software' },
  { label: 'IT', category: 'TI y software' },
  { label: 'Diseno', category: 'Diseno' },
  { label: 'Marketing', category: 'Marketing digital' },
  { label: 'Negocios', category: 'Gestion de negocios' },
  { label: 'Finanzas', category: 'Finanzas' },
  { label: 'Musica', category: 'Musica' },
  { label: 'Productividad', category: 'Productividad' },
]
const filterCategories = [
  'Desarrollo de software',
  'Diseno',
  'Marketing digital',
  'Gestion de negocios',
  'TI y software',
  'Desarrollo personal',
  'Finanzas',
  'Musica',
  'Productividad',
]
const levelOptions = ['Todos los niveles', 'Principiante', 'Intermedio', 'Avanzado']
const ratingOptions = [
  { label: '4.5 y superior', min: 4.5 },
  { label: '4.0 y superior', min: 4.0 },
  { label: '3.5 y superior', min: 3.5 },
  { label: '3.0 y superior', min: 3.0 },
]
const priceOptions = ['Gratis', 'De pago']

const fallbackCourses = [
  { id: 1, title: 'React desde cero: Guia completa de hooks y componentes', instructor: 'Juan Perez', category: 'Desarrollo de software', level: 'Principiante', price: '9.900', oldPrice: '49.900', rating: 4.7, students: '12,540', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=60' },
  { id: 2, title: 'Node.js avanzado: APIs, bases de datos y microservicios', instructor: 'Maria Garcia', category: 'Desarrollo de software', level: 'Intermedio', price: '12.900', oldPrice: '59.900', rating: 4.8, students: '8,210', image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=60' },
  { id: 3, title: 'Fundamentos de Python: de cero a tu primer proyecto', instructor: 'Diego Rojas', category: 'Desarrollo de software', level: 'Principiante', price: '8.900', oldPrice: '39.900', rating: 4.3, students: '18,760', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=60' },
  { id: 4, title: 'UI/UX Design con Figma: metodologias y prototipos', instructor: 'Laura Jimenez', category: 'Diseno', level: 'Intermedio', price: '11.900', oldPrice: '54.900', rating: 4.6, students: '9,430', image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=60' },
  { id: 5, title: 'Diseno grafico con Photoshop para principiantes', instructor: 'Roberto Araya', category: 'Diseno', level: 'Principiante', price: '7.900', oldPrice: '35.900', rating: 3.8, students: '5,110', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=60' },
  { id: 6, title: 'Marketing en redes sociales: de 0 a estrategia', instructor: 'Camila Vargas', category: 'Marketing digital', level: 'Principiante', price: '9.900', oldPrice: '45.900', rating: 4.5, students: '14,020', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=60' },
  { id: 7, title: 'SEO y Google Ads: posiciona y vende mas', instructor: 'Pablo Navarro', category: 'Marketing digital', level: 'Intermedio', price: '6.900', oldPrice: '30.900', rating: 3.4, students: '3,850', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=60' },
  { id: 8, title: 'Gestion de proyectos agiles con Scrum', instructor: 'Andrea Mora', category: 'Gestion de negocios', level: 'Intermedio', price: '10.900', oldPrice: '49.900', rating: 4.6, students: '6,740', image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&q=60' },
  { id: 9, title: 'Emprende tu negocio desde cero', instructor: 'Fernando Castro', category: 'Gestion de negocios', level: 'Principiante', price: '9.900', oldPrice: '44.900', rating: 4.2, students: '11,390', image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=400&q=60' },
  { id: 10, title: 'Cloud computing con AWS: arquitecturas reales', instructor: 'Ivan Solano', category: 'TI y software', level: 'Avanzado', price: '14.900', oldPrice: '69.900', rating: 4.7, students: '7,860', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=60' },
  { id: 11, title: 'Ciberseguridad esencial para desarrolladores', instructor: 'Natalia Vega', category: 'TI y software', level: 'Principiante', price: '9.900', oldPrice: '39.900', rating: 3.9, students: '4,280', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=60' },
  { id: 12, title: 'Productividad personal con tecnicas probadas', instructor: 'Oscar Leiton', category: 'Productividad', level: 'Principiante', price: 'Gratis', oldPrice: null, rating: 4.1, students: '22,150', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=60' },
  { id: 13, title: 'Inteligencia emocional en el trabajo', instructor: 'Valentina Rios', category: 'Desarrollo personal', level: 'Intermedio', price: '5.900', oldPrice: '25.900', rating: 3.6, students: '9,670', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=60' },
  { id: 14, title: 'Angular moderno: de componentes a servicios', instructor: 'Andres Vargas', category: 'Desarrollo de software', level: 'Intermedio', price: '11.900', oldPrice: '52.900', rating: 4.4, students: '7,540', image: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&w=400&q=60' },
  { id: 15, title: 'SQL y bases de datos: modelado para datos reales', instructor: 'Karla Cordero', category: 'Desarrollo de software', level: 'Principiante', price: '8.900', oldPrice: '38.900', rating: 4.0, students: '15,320', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=60' },
  { id: 16, title: 'Animacion 2D y motion graphics', instructor: 'Esteban Rojas', category: 'Diseno', level: 'Avanzado', price: '13.900', oldPrice: '59.900', rating: 4.4, students: '2,980', image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=60' },
  { id: 17, title: 'Illustrator para ilustracion digital', instructor: 'Melissa Quesada', category: 'Diseno', level: 'Intermedio', price: '9.900', oldPrice: '44.900', rating: 4.0, students: '4,760', image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=400&q=60' },
  { id: 18, title: 'Publicidad digital: Facebook e Instagram Ads', instructor: 'Javier Urena', category: 'Marketing digital', level: 'Avanzado', price: '10.900', oldPrice: '49.900', rating: 3.5, students: '6,240', image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=60' },
  { id: 19, title: 'Email marketing y automatizaciones', instructor: 'Paula Brenes', category: 'Marketing digital', level: 'Principiante', price: '7.900', oldPrice: '34.900', rating: 4.0, students: '8,510', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=60' },
  { id: 20, title: 'Finanzas para emprendedores', instructor: 'Cristian Alfaro', category: 'Finanzas', level: 'Avanzado', price: '12.900', oldPrice: '54.900', rating: 3.7, students: '3,460', image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=400&q=60' },
  { id: 21, title: 'Liderazgo y gestion de equipos', instructor: 'Daniel Salas', category: 'Gestion de negocios', level: 'Intermedio', price: '10.900', oldPrice: '49.900', rating: 4.3, students: '7,980', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=400&q=60' },
  { id: 22, title: 'Docker y Kubernetes: contenedores en produccion', instructor: 'Mario Picado', category: 'TI y software', level: 'Intermedio', price: '19.900', oldPrice: '79.900', rating: 4.2, students: '5,730', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=60' },
  { id: 23, title: 'Comunicacion efectiva: expresa y convence', instructor: 'Gabriela Nunez', category: 'Desarrollo personal', level: 'Principiante', price: 'Gratis', oldPrice: null, rating: 4.4, students: '19,430', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=60' },
  { id: 24, title: 'Inversiones y mercados: comienza a invertir', instructor: 'Adriana Campos', category: 'Finanzas', level: 'Principiante', price: '12.900', oldPrice: '54.900', rating: 4.5, students: '4,150', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=60' },
  { id: 25, title: 'Guitarra acustica desde cero', instructor: 'Jose Ospina', category: 'Musica', level: 'Principiante', price: '9.900', oldPrice: '42.900', rating: 4.6, students: '16,870', image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=400&q=60' },
  { id: 26, title: 'Produccion musical con Ableton', instructor: 'Santiago Peralta', category: 'Musica', level: 'Intermedio', price: '13.900', oldPrice: '59.900', rating: 4.3, students: '7,250', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=400&q=60' },
  { id: 27, title: 'Gestion del tiempo con tecnicas agiles', instructor: 'Patricia Solano', category: 'Productividad', level: 'Intermedio', price: '8.900', oldPrice: '38.900', rating: 4.5, students: '11,640', image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=60' },
]

const textPrimary = '#FFFFFF'
const textSecondary = 'rgba(255,255,255,0.75)'
const borderColor = 'rgba(255,255,255,0.22)'

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '14px',
  border: `1px solid ${borderColor}`,
  borderRadius: '10px',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.08)',
  color: '#FFFFFF',
  fontFamily: FONT,
}

function FilterSection({ title, children }) {
  return (
    <section style={{ borderBottom: `1px solid rgba(255,255,255,0.14)`, padding: '14px 0' }}>
      <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'rgba(255,255,255,0.55)', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </h3>
      {children}
    </section>
  )
}

export default function Dashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [instructor, setInstructor] = useState('')
  const [newCategory, setNewCategory] = useState(filterCategories[0])
  const [newLevel, setNewLevel] = useState('Principiante')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedRatings, setSelectedRatings] = useState([])
  const [selectedLevels, setSelectedLevels] = useState([])
  const [selectedPrices, setSelectedPrices] = useState([])
  const isAdmin = user?.role === 'admin'

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

  const toggleIn = (value, list, setter) =>
    setter(list.includes(value) ? list.filter((item) => item !== value) : [...list, value])

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedRatings([])
    setSelectedLevels([])
    setSelectedPrices([])
  }

  const handleNavCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.length === 1 && prev[0] === category ? [] : [category]
    )
  }

  const hasFilters = [
    selectedCategories,
    selectedRatings,
    selectedLevels,
    selectedPrices,
  ].some((list) => list.length > 0)

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(course.category)

    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.some((label) => {
        const option = ratingOptions.find((o) => o.label === label)
        return course.rating >= option.min
      })

    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(course.level)

    const matchesPrice =
      selectedPrices.length === 0 ||
      selectedPrices.some((price) =>
        price === 'Gratis' ? course.price === 'Gratis' : course.price !== 'Gratis'
      )

    return matchesCategory && matchesRating && matchesLevel && matchesPrice
  })

  const handleCreate = async (event) => {
    event.preventDefault()
    if (!title.trim() || !instructor.trim()) return

    const newCourse = {
      title: title.trim(),
      instructor: instructor.trim(),
      category: newCategory,
      level: newLevel,
      price: '9.900',
      oldPrice: '49.900',
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
      setError('')
    } catch {
      newCourse.id = Date.now()
      setCourses((prev) => [...prev, newCourse])
      setTitle('')
      setInstructor('')
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' })
      setCourses((prev) => prev.filter((course) => course.id !== id))
    } catch {
      setCourses((prev) => prev.filter((course) => course.id !== id))
    }
  }

  const handleUpdate = async (id, updates) => {
    try {
      const response = await fetch(`/api/courses/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      const updated = await response.json()
      setCourses((prev) => prev.map((course) => (course.id === id ? updated : course)))
    } catch {
      setCourses((prev) =>
        prev.map((course) =>
          String(course.id) === String(id) ? { ...course, ...updates } : course
        )
      )
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: gradients.app, fontFamily: FONT, position: 'relative' }}>
      <Navbar user={user} onLogout={onLogout} />

      {/* Barra de categorias */}
      <div style={{ background: 'rgba(255,255,255,0.10)', borderBottom: '1px solid rgba(255,255,255,0.16)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, maxWidth: 1280, margin: '0 auto', padding: '8px 28px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <button
            onClick={clearFilters}
            style={{ fontSize: 13, fontWeight: 800, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.28)', padding: '7px 14px', cursor: 'pointer', borderRadius: 999, flexShrink: 0, fontFamily: FONT, transition: 'all 0.2s' }}
          >
            Explorar
            <span style={{ fontSize: 9, opacity: 0.7 }}>▼</span>
          </button>
          {navCategories.map(({ label, category }) => {
            const isActive = selectedCategories.length === 1 && selectedCategories[0] === category
            return (
              <button
                key={category}
                onClick={() => handleNavCategory(category)}
                style={{
                  fontSize: 13,
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? palette.purple : 'rgba(255,255,255,0.94)',
                  background: isActive ? '#FFFFFF' : 'transparent',
                  border: `1px solid ${isActive ? 'transparent' : 'rgba(255,255,255,0.25)'}`,
                  borderRadius: 999,
                  padding: '7px 14px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontFamily: FONT,
                  boxShadow: isActive ? '0 8px 18px rgba(20, 5, 45, 0.22)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 28px', position: 'relative', zIndex: 1, boxSizing: 'border-box' }}>
        {error && (
          <div style={{ background: 'rgba(220, 38, 38, 0.16)', border: '1px solid rgba(252, 165, 165, 0.4)', color: '#FECACA', fontSize: '14px', fontWeight: 600, padding: '12px 16px', borderRadius: '12px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* Breadcrumb + titulo */}
        <div style={{ marginBottom: 26 }}>
          <p style={{ fontSize: 13, margin: '0 0 8px', color: 'rgba(255,255,255,0.72)', fontWeight: 600 }}>
            Inicio &gt; Cursos &gt; <span style={{ color: '#FFFFFF' }}>Todos</span>
          </p>
          <h1 style={{ fontSize: 'clamp(24px, 3.2vw, 32px)', fontWeight: 900, color: '#FFFFFF', margin: '0 0 8px', letterSpacing: '-0.02em', fontFamily: FONT, lineHeight: 1.15 }}>
            {filteredCourses.length} resultados para <span style={{ color: palette.goldBright }}>"todos los cursos"</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', margin: 0, fontWeight: 500 }}>
            Bienvenido, {user.name}. Descubre los cursos de la plataforma mejor valorados por sus alumnos.
          </p>
        </div>

        {/* Panel admin: crear curso */}
        {isAdmin && (
          <div style={{ border: `1px solid rgba(255,255,255,0.16)`, borderRadius: '18px', background: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)', boxShadow: '0 18px 44px rgba(20,5,45,0.35)', padding: '20px 24px', marginBottom: '28px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: textPrimary, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>✨</span> Crear nuevo curso (Admin)
            </h3>
            <form onSubmit={handleCreate} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
              <div style={{ flex: '2', minWidth: '200px' }}>
                <label htmlFor="dash-title" style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: textSecondary }}>Titulo</label>
                <input id="dash-title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Titulo del curso" style={inputStyle} />
              </div>
              <div style={{ flex: '1', minWidth: '150px' }}>
                <label htmlFor="dash-instructor" style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: textSecondary }}>Instructor</label>
                <input id="dash-instructor" type="text" value={instructor} onChange={(event) => setInstructor(event.target.value)} placeholder="Nombre" style={inputStyle} />
              </div>
              <div style={{ flex: '1', minWidth: '170px' }}>
                <label htmlFor="dash-category" style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: textSecondary }}>Categoria</label>
                <select id="dash-category" value={newCategory} onChange={(event) => setNewCategory(event.target.value)} style={inputStyle}>
                  {filterCategories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: '1', minWidth: '140px' }}>
                <label htmlFor="dash-level" style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '6px', color: textSecondary }}>Nivel</label>
                <select id="dash-level" value={newLevel} onChange={(event) => setNewLevel(event.target.value)} style={inputStyle}>
                  {levelOptions.filter((level) => level !== 'Todos los niveles').map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <button type="submit" style={{
                background: gradients.btn,
                color: '#fff', fontSize: '14px', fontWeight: 800, border: '1px solid rgba(255,255,255,0.3)',
                padding: '11px 22px', borderRadius: '999px', cursor: 'pointer',
                boxShadow: '0 10px 22px rgba(20, 5, 45, 0.35)',
                transition: 'all 0.2s ease', whiteSpace: 'nowrap',
              }}>
                + Crear curso
              </button>
            </form>
          </div>
        )}

        {/* Layout sidebar + grid */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>

          {/* Sidebar filtros */}
          <aside style={{ width: 248, minWidth: 248, background: 'rgba(12,14,38,0.5)', border: '1px solid rgba(255,255,255,0.16)', borderRadius: 20, padding: '18px 22px', boxShadow: '0 24px 60px rgba(20, 5, 45, 0.4)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', fontFamily: FONT }}>
            <FilterSection title="Categorias">
              {filterCategories.map((category) => (
                <label key={category} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13, color: textPrimary, cursor: 'pointer', borderRadius: 6, fontFamily: FONT }}>
                  <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => toggleIn(category, selectedCategories, setSelectedCategories)} style={{ accentColor: palette.goldBright, width: 15, height: 15, flexShrink: 0 }} />
                  {category}
                </label>
              ))}
            </FilterSection>
            <FilterSection title="Nivel">
              {levelOptions.map((level) => (
                <label key={level} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13, color: textPrimary, cursor: 'pointer', fontFamily: FONT }}>
                  <input type="checkbox" checked={selectedLevels.includes(level)} onChange={() => toggleIn(level, selectedLevels, setSelectedLevels)} style={{ accentColor: palette.goldBright, width: 15, height: 15, flexShrink: 0 }} />
                  {level}
                </label>
              ))}
            </FilterSection>
            <FilterSection title="Valoracion">
              {ratingOptions.map((option) => (
                <label key={option.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13, color: textPrimary, cursor: 'pointer', fontFamily: FONT }}>
                  <input type="checkbox" checked={selectedRatings.includes(option.label)} onChange={() => toggleIn(option.label, selectedRatings, setSelectedRatings)} style={{ accentColor: palette.goldBright, width: 15, height: 15, flexShrink: 0 }} />
                  <span style={{ color: palette.gold }}>★</span> {option.label}
                </label>
              ))}
            </FilterSection>
            <FilterSection title="Precio">
              {priceOptions.map((price) => (
                <label key={price} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13, color: textPrimary, cursor: 'pointer', fontFamily: FONT }}>
                  <input type="checkbox" checked={selectedPrices.includes(price)} onChange={() => toggleIn(price, selectedPrices, setSelectedPrices)} style={{ accentColor: palette.goldBright, width: 15, height: 15, flexShrink: 0 }} />
                  {price}
                </label>
              ))}
            </FilterSection>
            {hasFilters && (
              <button onClick={clearFilters} style={{ marginTop: 14, width: '100%', background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: `1px solid rgba(255,255,255,0.35)`, padding: 9, fontSize: 13, fontWeight: 700, borderRadius: 10, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.2s ease' }}>
                Borrar filtros
              </button>
            )}
          </aside>

          {/* Grid cursos */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, color: '#FFFFFF', fontWeight: 700, background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.26)', padding: '7px 16px', borderRadius: 999, backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', fontFamily: FONT }}>
                {loading ? 'Cargando cursos...' : `${filteredCourses.length} resultados`}
              </span>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#FFFFFF', fontWeight: 600, fontFamily: FONT }}>
                Ordenar por:
                <select style={{ padding: '9px 16px', border: `1.5px solid ${borderColor}`, background: 'rgba(255,255,255,0.08)', borderRadius: 999, fontSize: 13.5, color: '#FFFFFF', outline: 'none', fontFamily: FONT, cursor: 'pointer' }}>
                  <option>Bestsellers</option>
                  <option>Mas valorados</option>
                  <option>Recientes</option>
                  <option>Precio: de menor a mayor</option>
                </select>
              </label>
            </div>

            {loading ? (
              <div style={{ background: 'rgba(255,255,255,0.16)', border: '1.5px dashed rgba(255,255,255,0.4)', borderRadius: 20, padding: '60px 40px', textAlign: 'center', color: '#FFFFFF', fontSize: 15, fontWeight: 600, fontFamily: FONT }}>
                Cargando cursos desde JSON Server...
              </div>
            ) : filteredCourses.length === 0 ? (
              <div style={{ background: 'rgba(12,14,38,0.5)', border: '1.5px dashed rgba(255,255,255,0.3)', borderRadius: 20, padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <p style={{ fontSize: 16, fontWeight: 700, color: textPrimary, margin: '0 0 8px' }}>
                  No hay cursos que coincidan con los filtros
                </p>
                <p style={{ fontSize: 14, color: textSecondary, margin: 0 }}>
                  Prueba quitando algún filtro o borra todos.
                </p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    {...course}
                    isAdmin={isAdmin}
                    onDelete={isAdmin ? () => handleDelete(course.id) : undefined}
                    onUpdate={isAdmin ? (updates) => handleUpdate(course.id, updates) : undefined}
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
