import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
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

const categoryImages = {
  'Desarrollo de software': 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=60',
  'Diseno': 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=60',
  'Marketing digital': 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=400&q=60',
  'Gestion de negocios': 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&q=60',
  'TI y software': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=60',
  'Desarrollo personal': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=60',
  'Finanzas': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=60',
  'Musica': 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=400&q=60',
  'Productividad': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=60',
}

const fallbackCourses = [
  { id: 1, title: 'React desde cero: Guia completa de hooks y componentes', instructor: 'Juan Perez', category: 'Desarrollo de software', level: 'Principiante', price: '9.900', oldPrice: '49.900', rating: 4.7, students: '12,540', image: categoryImages['Desarrollo de software'] },
  { id: 2, title: 'Node.js avanzado: APIs, bases de datos y microservicios', instructor: 'Maria Garcia', category: 'Desarrollo de software', level: 'Intermedio', price: '12.900', oldPrice: '59.900', rating: 4.8, students: '8,210', image: categoryImages['Desarrollo de software'] },
  { id: 3, title: 'Fundamentos de Python: de cero a tu primer proyecto', instructor: 'Diego Rojas', category: 'Desarrollo de software', level: 'Principiante', price: '8.900', oldPrice: '39.900', rating: 4.3, students: '18,760', image: categoryImages['Desarrollo de software'] },
  { id: 4, title: 'UI/UX Design con Figma: metodologias y prototipos', instructor: 'Laura Jimenez', category: 'Diseno', level: 'Intermedio', price: '11.900', oldPrice: '54.900', rating: 4.6, students: '9,430', image: categoryImages['Diseno'] },
  { id: 5, title: 'Diseno grafico con Photoshop para principiantes', instructor: 'Roberto Araya', category: 'Diseno', level: 'Principiante', price: '7.900', oldPrice: '35.900', rating: 3.8, students: '5,110', image: categoryImages['Diseno'] },
  { id: 6, title: 'Marketing en redes sociales: de 0 a estrategia', instructor: 'Camila Vargas', category: 'Marketing digital', level: 'Principiante', price: '9.900', oldPrice: '45.900', rating: 4.5, students: '14,020', image: categoryImages['Marketing digital'] },
  { id: 7, title: 'SEO y Google Ads: posiciona y vende mas', instructor: 'Pablo Navarro', category: 'Marketing digital', level: 'Intermedio', price: '6.900', oldPrice: '30.900', rating: 3.4, students: '3,850', image: categoryImages['Marketing digital'] },
  { id: 8, title: 'Gestion de proyectos agiles con Scrum', instructor: 'Andrea Mora', category: 'Gestion de negocios', level: 'Intermedio', price: '10.900', oldPrice: '49.900', rating: 4.6, students: '6,740', image: categoryImages['Gestion de negocios'] },
  { id: 9, title: 'Emprende tu negocio desde cero', instructor: 'Fernando Castro', category: 'Gestion de negocios', level: 'Principiante', price: '9.900', oldPrice: '44.900', rating: 4.2, students: '11,390', image: categoryImages['Gestion de negocios'] },
  { id: 10, title: 'Cloud computing con AWS: arquitecturas reales', instructor: 'Ivan Solano', category: 'TI y software', level: 'Avanzado', price: '14.900', oldPrice: '69.900', rating: 4.7, students: '7,860', image: categoryImages['TI y software'] },
  { id: 11, title: 'Ciberseguridad esencial para desarrolladores', instructor: 'Natalia Vega', category: 'TI y software', level: 'Principiante', price: '9.900', oldPrice: '39.900', rating: 3.9, students: '4,280', image: categoryImages['TI y software'] },
  { id: 12, title: 'Productividad personal con tecnicas probadas', instructor: 'Oscar Leiton', category: 'Productividad', level: 'Principiante', price: 'Gratis', oldPrice: null, rating: 4.1, students: '22,150', image: categoryImages['Productividad'] },
  { id: 13, title: 'Inteligencia emocional en el trabajo', instructor: 'Valentina Rios', category: 'Desarrollo personal', level: 'Intermedio', price: '5.900', oldPrice: '25.900', rating: 3.6, students: '9,670', image: categoryImages['Desarrollo personal'] },
  { id: 14, title: 'Angular moderno: de componentes a servicios', instructor: 'Andres Vargas', category: 'Desarrollo de software', level: 'Intermedio', price: '11.900', oldPrice: '52.900', rating: 4.4, students: '7,540', image: categoryImages['Desarrollo de software'] },
  { id: 15, title: 'SQL y bases de datos: modelado para datos reales', instructor: 'Karla Cordero', category: 'Desarrollo de software', level: 'Principiante', price: '8.900', oldPrice: '38.900', rating: 4.0, students: '15,320', image: categoryImages['Desarrollo de software'] },
  { id: 16, title: 'Animacion 2D y motion graphics', instructor: 'Esteban Rojas', category: 'Diseno', level: 'Avanzado', price: '13.900', oldPrice: '59.900', rating: 4.4, students: '2,980', image: categoryImages['Diseno'] },
  { id: 17, title: 'Illustrator para ilustracion digital', instructor: 'Melissa Quesada', category: 'Diseno', level: 'Intermedio', price: '9.900', oldPrice: '44.900', rating: 4.0, students: '4,760', image: categoryImages['Diseno'] },
  { id: 18, title: 'Publicidad digital: Facebook e Instagram Ads', instructor: 'Javier Urena', category: 'Marketing digital', level: 'Avanzado', price: '10.900', oldPrice: '49.900', rating: 3.5, students: '6,240', image: categoryImages['Marketing digital'] },
  { id: 19, title: 'Email marketing y automatizaciones', instructor: 'Paula Brenes', category: 'Marketing digital', level: 'Principiante', price: '7.900', oldPrice: '34.900', rating: 4.0, students: '8,510', image: categoryImages['Marketing digital'] },
  { id: 20, title: 'Finanzas para emprendedores', instructor: 'Cristian Alfaro', category: 'Finanzas', level: 'Avanzado', price: '12.900', oldPrice: '54.900', rating: 3.7, students: '3,460', image: categoryImages['Finanzas'] },
  { id: 21, title: 'Liderazgo y gestion de equipos', instructor: 'Daniel Salas', category: 'Gestion de negocios', level: 'Intermedio', price: '10.900', oldPrice: '49.900', rating: 4.3, students: '7,980', image: categoryImages['Gestion de negocios'] },
  { id: 22, title: 'Docker y Kubernetes: contenedores en produccion', instructor: 'Mario Picado', category: 'TI y software', level: 'Intermedio', price: '19.900', oldPrice: '79.900', rating: 4.2, students: '5,730', image: categoryImages['TI y software'] },
  { id: 23, title: 'Comunicacion efectiva: expresa y convence', instructor: 'Gabriela Nunez', category: 'Desarrollo personal', level: 'Principiante', price: 'Gratis', oldPrice: null, rating: 4.4, students: '19,430', image: categoryImages['Desarrollo personal'] },
  { id: 24, title: 'Inversiones y mercados: comienza a invertir', instructor: 'Adriana Campos', category: 'Finanzas', level: 'Principiante', price: '12.900', oldPrice: '54.900', rating: 4.5, students: '4,150', image: categoryImages['Finanzas'] },
  { id: 25, title: 'Guitarra acustica desde cero', instructor: 'Jose Ospina', category: 'Musica', level: 'Principiante', price: '9.900', oldPrice: '42.900', rating: 4.6, students: '16,870', image: categoryImages['Musica'] },
  { id: 26, title: 'Produccion musical con Ableton', instructor: 'Santiago Peralta', category: 'Musica', level: 'Intermedio', price: '13.900', oldPrice: '59.900', rating: 4.3, students: '7,250', image: categoryImages['Musica'] },
  { id: 27, title: 'Gestion del tiempo con tecnicas agiles', instructor: 'Patricia Solano', category: 'Productividad', level: 'Intermedio', price: '8.900', oldPrice: '38.900', rating: 4.5, students: '11,640', image: categoryImages['Productividad'] },
]

const textPrimary = '#1C1D1F'
const textSecondary = '#6A6F73'
const borderColor = '#DEE3E8'

const inputStyle = {
  width: '100%',
  padding: '10px 12px',
  fontSize: '14px',
  border: `1px solid ${borderColor}`,
  borderRadius: '10px',
  outline: 'none',
  boxSizing: 'border-box',
  background: '#FFFFFF',
  color: textPrimary,
  fontFamily: FONT,
}

function FilterSection({ title, children }) {
  return (
    <section style={{ borderBottom: `1px solid #ECEEF1`, padding: '14px 0' }}>
      <h3 style={{ fontSize: '11px', fontWeight: 800, color: textSecondary, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {title}
      </h3>
      {children}
    </section>
  )
}

export default function Dashboard({ user, onLogout }) {
  const [searchParams] = useSearchParams()
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

  const searchTerm = (searchParams.get('search') || '').toLowerCase()

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
    const matchesSearch =
      !searchTerm ||
      `${course.title} ${course.instructor} ${course.category}`.toLowerCase().includes(searchTerm)

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

    return matchesSearch && matchesCategory && matchesRating && matchesLevel && matchesPrice
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
      image: categoryImages[newCategory] || fallbackCourses[0].image,
    }

    try {
      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse),
      })
      const created = await response.json()
      created.image = categoryImages[newCategory] || fallbackCourses[0].image
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
    <div style={{ minHeight: '100vh', background: '#FFFFFF', fontFamily: FONT, position: 'relative' }}>
      <Navbar user={user} onLogout={onLogout} />

      {/* Barra de categorias */}
      <div style={{ background: '#F7F8FA', borderBottom: '1px solid #ECEEF1', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, maxWidth: 1280, margin: '0 auto', padding: '8px 28px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
          <button
            onClick={clearFilters}
            style={{ fontSize: 13, fontWeight: 800, color: palette.ink, display: 'flex', alignItems: 'center', gap: 6, background: '#FFFFFF', border: `1px solid ${borderColor}`, padding: '7px 14px', cursor: 'pointer', borderRadius: 999, flexShrink: 0, fontFamily: FONT, transition: 'all 0.2s' }}
          >
            Explorar
            <span style={{ fontSize: 9, opacity: 0.6 }}>▼</span>
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
                  color: isActive ? '#FFFFFF' : textPrimary,
                  background: isActive ? palette.purple : 'transparent',
                  border: `1px solid ${isActive ? 'transparent' : borderColor}`,
                  borderRadius: 999,
                  padding: '7px 14px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  fontFamily: FONT,
                  boxShadow: isActive ? '0 8px 18px rgba(109,40,217,0.25)' : 'none',
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
          <div style={{ background: 'rgba(220, 38, 38, 0.08)', border: '1px solid rgba(220, 38, 38, 0.3)', color: palette.danger, fontSize: '14px', fontWeight: 600, padding: '12px 16px', borderRadius: '12px', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* Panel admin: crear curso */}
        {isAdmin && (
          <div style={{ border: `1px solid ${borderColor}`, borderRadius: '18px', background: '#FFFFFF', boxShadow: '0 18px 44px rgba(20,5,45,0.08)', padding: '20px 24px', marginBottom: '28px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: textPrimary, margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Crear nuevo curso (Admin)
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
                boxShadow: '0 10px 22px rgba(109,40,217,0.25)',
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
          <aside style={{ width: 248, minWidth: 248, background: '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: 20, padding: '18px 22px', boxShadow: '0 24px 60px rgba(20, 5, 45, 0.06)', fontFamily: FONT }}>
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
              <button onClick={clearFilters} style={{ marginTop: 14, width: '100%', background: '#F1F2F4', color: textPrimary, border: `1px solid ${borderColor}`, padding: 9, fontSize: 13, fontWeight: 700, borderRadius: 10, cursor: 'pointer', fontFamily: FONT, transition: 'all 0.2s ease' }}>
                Borrar filtros
              </button>
            )}
          </aside>

          {/* Grid cursos */}
          <main style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, color: textPrimary, fontWeight: 700, background: '#F7F8FA', border: `1px solid ${borderColor}`, padding: '7px 16px', borderRadius: 999, fontFamily: FONT }}>
                {loading ? 'Cargando cursos...' : `${filteredCourses.length} resultados`}
              </span>
            </div>

            {loading ? (
              <div style={{ background: '#F7F8FA', border: '1.5px dashed #D4D9DE', borderRadius: 20, padding: '60px 40px', textAlign: 'center', color: textSecondary, fontSize: 15, fontWeight: 600, fontFamily: FONT }}>
                Cargando cursos desde JSON Server...
              </div>
            ) : filteredCourses.length === 0 ? (
              <div style={{ background: '#FFFFFF', border: '1.5px dashed #D4D9DE', borderRadius: 20, padding: '60px 40px', textAlign: 'center' }}>
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
