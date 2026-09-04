import Navbar from '../components/Navbar'
import CourseCard from '../components/CourseCard'

const courses = [
  { id: 1, title: 'React desde cero', instructor: 'Juan Pérez', level: 'Principiante', price: '$49' },
  { id: 2, title: 'Node.js avanzado', instructor: 'María García', level: 'Intermedio', price: '$79' },
  { id: 3, title: 'Sistemas distribuidos', instructor: 'Carlos López', level: 'Avanzado', price: '$99' },
  { id: 4, title: 'JavaScript esencial', instructor: 'Ana Torres', level: 'Principiante', price: '$39' },
  { id: 5, title: 'TypeScript práctico', instructor: 'Luis Ramírez', level: 'Intermedio', price: '$69' },
  { id: 6, title: 'Cloud con AWS', instructor: 'Sofía Ruiz', level: 'Avanzado', price: '$129' },
]

const categories = ['Desarrollo de software', 'Diseño', 'Marketing', 'Negocios']
const levels = ['Principiante', 'Intermedio', 'Avanzado']

const sidebarSectionTitle = {
  fontSize: '14px',
  fontWeight: 700,
  color: '#1c1d1f',
  margin: '0 0 10px',
}

const checkboxLabel = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  color: '#1c1d1f',
  marginBottom: '8px',
  cursor: 'pointer',
}

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f6' }}>
      <Navbar />
      <div style={{ display: 'flex', maxWidth: '1200px', margin: '0 auto', gap: '24px', padding: '24px' }}>
        <aside
          style={{
            width: '22%',
            minWidth: '220px',
            background: '#fff',
            border: '1px solid #e8e8e8',
            borderRadius: '12px',
            padding: '20px',
            height: 'fit-content',
          }}
        >
          <h2 style={{ ...sidebarSectionTitle, fontSize: '18px', marginBottom: '18px' }}>Explorar</h2>
          <div style={{ marginBottom: '20px' }}>
            <p style={sidebarSectionTitle}>Categoría</p>
            {categories.map((category) => (
              <label key={category} style={checkboxLabel}>
                <input type="checkbox" />
                {category}
              </label>
            ))}
          </div>
          <div>
            <p style={sidebarSectionTitle}>Nivel</p>
            {levels.map((level) => (
              <label key={level} style={checkboxLabel}>
                <input type="checkbox" />
                {level}
              </label>
            ))}
          </div>
        </aside>
        <main style={{ flex: 1 }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1c1d1f', margin: '0 0 16px' }}>
            Todos los cursos
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '20px',
            }}
          >
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}