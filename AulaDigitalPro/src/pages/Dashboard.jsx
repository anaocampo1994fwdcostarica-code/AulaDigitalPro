import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

const navCategories = [
  { label: 'Desarrollo', category: 'Desarrollo de software' },
  { label: 'IT', category: 'TI y software' },
  { label: 'Diseño', category: 'Diseño' },
  { label: 'Marketing', category: 'Marketing digital' },
  { label: 'Negocios', category: 'Gestión de negocios' },
  { label: 'Finanzas', category: 'Finanzas' },
  { label: 'Música', category: 'Música' },
  { label: 'Productividad', category: 'Productividad' },
]
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
const levelOptions = ['Todos los niveles', 'Principiante', 'Intermedio', 'Avanzado']
const ratingOptions = [
  { label: '4.5 y superior', min: 4.5 },
  { label: '4.0 y superior', min: 4.0 },
  { label: '3.5 y superior', min: 3.5 },
  { label: '3.0 y superior', min: 3.0 },
]
const priceOptions = ['Gratis', 'De pago']

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

const textPrimary = '#1E293B'
const textSecondary = '#475569'
const purple = '#9333EA'
const purpleDark = '#7E22CE'
const borderColor = '#E2E8F0'

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
      price: '₡9.900',
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
          <button
            onClick={clearFilters}
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: textPrimary,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              padding: '6px 2px',
              cursor: 'pointer',
            }}
          >
            Explorar
            <span style={{ fontSize: '10px' }}>▼</span>
          </button>
          {navCategories.map(({ label, category }) => {
            const isActive =
              selectedCategories.length === 1 && selectedCategories[0] === category
            return (
              <button
                key={category}
                onClick={() => handleNavCategory(category)}
                style={{
                  fontSize: '13px',
                  fontWeight: isActive ? 700 : 600,
                  color: isActive ? purpleDark : textPrimary,
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #9333EA' : '3px solid transparent',
                  padding: '6px 2px',
                  cursor: 'pointer',
                }}
              >
                {label}
              </button>
            )
          })}
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
            {filteredCourses.length} resultados para "
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
              background: '#F8FAFC',
              padding: '16px',
              marginBottom: '24px',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: textPrimary, margin: '0 0 12px' }}>
              Crear un nuevo curso (solo admin)
            </h3>
            <form
              onSubmit={handleCreate}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}
            >
              <div style={{ flex: '2', minWidth: '200px' }}>
                <label htmlFor="dash-title" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Título
                </label>
                <input
                  id="dash-title"
                  type="text"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Título del curso"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: '1', minWidth: '150px' }}>
                <label htmlFor="dash-instructor" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Instructor
                </label>
                <input
                  id="dash-instructor"
                  type="text"
                  value={instructor}
                  onChange={(event) => setInstructor(event.target.value)}
                  placeholder="Nombre"
                  style={inputStyle}
                />
              </div>
              <div style={{ flex: '1', minWidth: '170px' }}>
                <label htmlFor="dash-category" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Categoría
                </label>
                <select
                  id="dash-category"
                  value={newCategory}
                  onChange={(event) => setNewCategory(event.target.value)}
                  style={inputStyle}
                >
                  {filterCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ flex: '1', minWidth: '140px' }}>
                <label htmlFor="dash-level" style={{ display: 'block', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                  Nivel
                </label>
                <select
                  id="dash-level"
                  value={newLevel}
                  onChange={(event) => setNewLevel(event.target.value)}
                  style={inputStyle}
                >
                  {levelOptions.filter((level) => level !== 'Todos los niveles').map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
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
                <label key={category} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', fontSize: '14px', color: textPrimary, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleIn(category, selectedCategories, setSelectedCategories)}
                    style={{ accentColor: purple, width: '16px', height: '16px' }}
                  />
                  {category}
                </label>
              ))}
            </FilterSection>
            <FilterSection title="Valoración">
              {ratingOptions.map((option) => (
                <label key={option.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', fontSize: '14px', color: textPrimary, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(option.label)}
                    onChange={() => toggleIn(option.label, selectedRatings, setSelectedRatings)}
                    style={{ accentColor: purple, width: '16px', height: '16px' }}
                  />
                  {option.label} ★
                </label>
              ))}
            </FilterSection>
            <FilterSection title="Nivel">
              {levelOptions.map((level) => (
                <label key={level} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', fontSize: '14px', color: textPrimary, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(level)}
                    onChange={() => toggleIn(level, selectedLevels, setSelectedLevels)}
                    style={{ accentColor: purple, width: '16px', height: '16px' }}
                  />
                  {level}
                </label>
              ))}
            </FilterSection>
            <FilterSection title="Precio">
              {priceOptions.map((price) => (
                <label key={price} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', fontSize: '14px', color: textPrimary, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes(price)}
                    onChange={() => toggleIn(price, selectedPrices, setSelectedPrices)}
                    style={{ accentColor: purple, width: '16px', height: '16px' }}
                  />
                  {price}
                </label>
              ))}
            </FilterSection>
            {hasFilters && (
              <button
                onClick={clearFilters}
                style={{
                  marginTop: '16px',
                  width: '100%',
                  background: '#fff',
                  color: purpleDark,
                  border: `1px solid ${purpleDark}`,
                  padding: '9px',
                  fontSize: '14px',
                  fontWeight: 700,
                  borderRadius: '2px',
                  cursor: 'pointer',
                }}
              >
                Borrar filtros
              </button>
            )}
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
                {loading ? 'Cargando cursos...' : `${filteredCourses.length} resultados`}
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
            ) : filteredCourses.length === 0 ? (
              <div
                style={{
                  background: '#F8FAFC',
                  border: `1px dashed ${borderColor}`,
                  borderRadius: '8px',
                  padding: '40px',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '16px', fontWeight: 700, color: textPrimary, margin: '0 0 8px' }}>
                  No hay cursos que coincidan con los filtros
                </p>
                <p style={{ fontSize: '14px', color: textSecondary, margin: 0 }}>
                  Prueba quitando algún filtro o borra todos.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '24px',
                }}
              >
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