import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { FONT, gradients } from '../theme'

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
const levelOptions = ['Principiante', 'Intermedio', 'Avanzado']

const navSections = [
  { id: 'cursos', label: 'Gestion de Cursos', badge: 'CU' },
  { id: 'usuarios', label: 'Gestion de Usuarios', badge: 'US' },
  { id: 'reportes', label: 'Reportes', badge: 'RP' },
]

const fallbackCourses = [
  { id:1, title:'React desde cero: Guia completa de hooks y componentes', category:'Desarrollo de software', instructor:'Juan Perez', level:'Principiante', price:'9.900' },
  { id:2, title:'Node.js avanzado: APIs, bases de datos y microservicios', category:'Desarrollo de software', instructor:'Maria Garcia', level:'Intermedio', price:'12.900' },
  { id:3, title:'Fundamentos de Python: de cero a tu primer proyecto', category:'Desarrollo de software', instructor:'Diego Rojas', level:'Principiante', price:'8.900' },
  { id:4, title:'UI/UX Design con Figma: metodologias y prototipos', category:'Diseno', instructor:'Laura Jimenez', level:'Intermedio', price:'11.900' },
  { id:5, title:'Diseno grafico con Photoshop para principiantes', category:'Diseno', instructor:'Roberto Araya', level:'Principiante', price:'7.900' },
  { id:6, title:'Marketing en redes sociales: de 0 a estrategia', category:'Marketing digital', instructor:'Camila Vargas', level:'Principiante', price:'9.900' },
]

const fallbackUsers = [
  { id: 1, name: 'Ana Ocampo', email: 'admin@aula.com', role: 'admin' },
  { id: 2, name: 'Carlos Mora', email: 'user@aula.com', role: 'user' },
]

const sampleStudents = [
  'María Fernández', 'José Ramírez', 'Lucía Herrera', 'Andrés Morales', 'Valentina Rojas',
  'Diego Solís', 'Camila Vargas', 'Sebastián Chaves', 'Isabella Navarro', 'Mateo Jiménez',
  'Sofía Araya', 'Felipe Cordero', 'Gabriela Núñez', 'Ricardo Vargas', 'Paola Benavides',
  'Julián Salazar', 'Verónica Campos', 'Tomás Aguilar', 'Natalia Poveda', 'Samuel Quirós',
]

const inputStyle = {
  width: '100%',
  padding: '11px 12px',
  fontSize: '14px',
  border: '1px solid rgba(255,255,255,0.22)',
  borderRadius: '10px',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.08)',
  color: '#FFFFFF',
  fontFamily: FONT,
}

const btnBase = { fontSize: '13px', fontWeight: 700, borderRadius: '999px', padding: '8px 14px', cursor: 'pointer', fontFamily: FONT, transition: 'all 0.2s ease', whiteSpace: 'nowrap' }
const editBtn = { ...btnBase, color: '#FFFFFF', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.32)' }
const saveBtn = { ...btnBase, color: '#FFFFFF', background: gradients.btn, border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 18px rgba(20,5,45,0.25)' }
const cancelBtn = { ...btnBase, color: 'rgba(255,255,255,0.8)', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)' }
const deleteBtn = { ...btnBase, color: '#FCA5A5', background: 'rgba(220,38,38,0.16)', border: '1px solid rgba(252,165,165,0.4)' }

const cellStyle = { textAlign: 'left', padding: '12px 16px', verticalAlign: 'top' }

export default function AdminDashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [usersLoading, setUsersLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [instructor, setInstructor] = useState('')
  const [category, setCategory] = useState(filterCategories[0])
  const [level, setLevel] = useState('Principiante')
  const [price, setPrice] = useState('')
  const [activeSection, setActiveSection] = useState('cursos')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', category: '', level: '', price: '' })
  const [reportCourseId, setReportCourseId] = useState(null)

  useEffect(() => {
    let active = true
    async function loadCourses() {
      try {
        const response = await fetch('/api/courses')
        const data = await response.json()
        if (active) setCourses(data)
      } catch {
        if (active) setCourses(fallbackCourses)
      } finally {
        if (active) setLoading(false)
      }
    }
    loadCourses()
    return () => { active = false }
  }, [])

  useEffect(() => {
    let active = true
    async function loadUsers() {
      try {
        const response = await fetch('/api/users')
        const data = await response.json()
        if (active) setUsers(data)
      } catch {
        if (active) setUsers(fallbackUsers)
      } finally {
        if (active) setUsersLoading(false)
      }
    }
    loadUsers()
    return () => { active = false }
  }, [])

  const handleCreate = async (event) => {
    event.preventDefault()
    if (!title.trim() || !instructor.trim() || !price.trim()) {
      setError('Completa titulo, instructor y precio para crear el curso.')
      return
    }
    const newCourse = {
      id: Date.now(),
      title: title.trim(),
      instructor: instructor.trim(),
      category,
      level,
      price: price.trim().toLowerCase() === '0' ? 'Gratis' : price.trim(),
      oldPrice: null,
      rating: 4.5,
      students: '0',
    }
    try {
      const response = await fetch('/api/courses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newCourse) })
      const created = await response.json()
      setCourses((prev) => [created, ...prev])
    } catch {
      setCourses((prev) => [newCourse, ...prev])
    }
    setTitle('')
    setInstructor('')
    setPrice('')
    setError('')
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' })
      setCourses((prev) => prev.filter((c) => String(c.id) !== String(id)))
    } catch {
      setCourses((prev) => prev.filter((c) => String(c.id) !== String(id)))
    }
  }

  const startEdit = (course) => {
    setEditingId(course.id)
    setEditForm({
      title: course.title,
      category: course.category,
      level: course.level,
      price: course.price === 'Gratis' ? '0' : String(course.price).replace(/[^0-9.]/g, ''),
    })
  }

  const cancelEdit = () => {
    setEditingId(null)
  }

  const handleUpdate = async (id) => {
    if (!editForm.title.trim()) return
    const rawPrice = editForm.price.trim().replace(/[^0-9.]/g, '')
    const updates = {
      title: editForm.title.trim(),
      category: editForm.category,
      level: editForm.level,
      price: rawPrice === '0' || !rawPrice ? 'Gratis' : rawPrice
    }
    try {
      const response = await fetch(`/api/courses/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) })
      const updated = await response.json()
      setCourses((prev) => prev.map((c) => String(c.id) === String(id) ? updated : c))
    } catch {
      setCourses((prev) => prev.map((c) => String(c.id) === String(id) ? { ...c, ...updates } : c))
    }
    setEditingId(null)
  }

  const totalStudents = courses.reduce((acc, c) => acc + (parseInt(String(c.students).replace(/\D/g, ''), 10) || 0), 0)
  const avgRating = courses.length ? (courses.reduce((a, c) => a + (c.rating || 0), 0) / courses.length).toFixed(1) : '--'
  const paid = courses.filter((c) => c.price !== 'Gratis')
  const revenue = paid.reduce((a, c) => a + (parseInt(String(c.price).replace(/[^0-9.]/g, ''), 10) || 0), 0)

  const stats = [
    { label: 'Cursos totales', value: String(courses.length) },
    { label: 'Estudiantes', value: totalStudents >= 1000 ? `${(totalStudents / 1000).toFixed(1)}K+` : String(totalStudents) },
    { label: 'Valoracion media', value: avgRating },
    { label: 'Ingresos est.', value: `CRC ${revenue.toLocaleString('es-CR')}` },
  ]

  const getInscribedStudents = (course) => {
    const realStudents = users.filter((u) => u.role === 'user').map((u) => u.name)
    const count = Math.max(1, parseInt(String(course.students).replace(/\D/g, ''), 10) % 12 || 5)
    const names = [...realStudents]
    for (let i = 0; names.length < count; i++) {
      names.push(`${sampleStudents[i % sampleStudents.length]} ${course.instructor ? '' : ''}`.trim() || sampleStudents[i % sampleStudents.length])
    }
    return [...new Set(names)].slice(0, count)
  }

  const exportCourseExcel = (course) => {
    const students = getInscribedStudents(course)
    const header = 'Curso,Instructor,Estudiante,Correo,Estado'
    const rows = students.map((name) => {
      const email = `${name.split(' ')[0]}.${name.split(' ')[1] || 'estudiante'}@auladigital.com`.toLowerCase()
      return `"${course.title}","${course.instructor}","${name}","${email}",Inscrito`
    })
    const csv = [header, ...rows].join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `inscritos-${course.title.replace(/[^\w]+/g, '-')}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const selectedReportCourse = reportCourseId
    ? courses.find((c) => String(c.id) === String(reportCourseId))
    : courses[0]

  return (
    <div style={{ minHeight: '100vh', background: 'radial-gradient(1200px 600px at 20% -10%, #2C1A5E 0%, transparent 60%), radial-gradient(1000px 500px at 90% 0%, #103B6B 0%, transparent 55%), #0B0E24', color: '#FFFFFF', fontFamily: FONT }}>
      <Navbar user={user} onLogout={onLogout} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 28 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, background: 'linear-gradient(120deg,#FFFFFF,#E0C9FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Panel de Administración
            </h1>
            <p style={{ margin: '6px 0 0', color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
              Gestiona cursos, usuarios y reportes de la plataforma.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              to="/dashboard"
              style={{ ...btnBase, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.32)', color: '#FFFFFF', textDecoration: 'none' }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 999, marginBottom: 28, width: 'fit-content' }}>
          {navSections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13.5,
                fontWeight: 700,
                padding: '9px 16px',
                borderRadius: 999,
                border: 'none',
                cursor: 'pointer',
                color: activeSection === s.id ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                background: activeSection === s.id ? gradients.btn : 'transparent',
                boxShadow: activeSection === s.id ? '0 8px 18px rgba(109,40,217,0.35)' : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 800, opacity: 0.85 }}>{s.badge}</span>
              {s.label}
            </button>
          ))}
        </div>

        {activeSection === 'cursos' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, marginBottom: 28 }}>
              {stats.map((st) => (
                <div key={st.label} style={{ padding: '18px 20px', borderRadius: 16, background: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)', border: '1px solid rgba(255,255,255,0.14)' }}>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{st.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 800, marginTop: 6 }}>{st.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 20, alignItems: 'start' }}>
              <form
                onSubmit={handleCreate}
                style={{ padding: 22, borderRadius: 18, background: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)', border: '1px solid rgba(255,255,255,0.14)', display: 'flex', flexDirection: 'column', gap: 14 }}
              >
                <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>Nuevo curso</h2>
                {error && (
                  <div style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(220,38,38,0.16)', border: '1px solid rgba(252,165,165,0.4)', color: '#FCA5A5', fontSize: 13 }}>{error}</div>
                )}
                <input style={inputStyle} placeholder="Titulo del curso" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input style={inputStyle} placeholder="Instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
                <select style={inputStyle} value={category} onChange={(e) => setCategory(e.target.value)}>
                  {filterCategories.map((c) => <option key={c} value={c} style={{ color: '#111' }}>{c}</option>)}
                </select>
                <select style={inputStyle} value={level} onChange={(e) => setLevel(e.target.value)}>
                  {levelOptions.map((l) => <option key={l} value={l} style={{ color: '#111' }}>{l}</option>)}
                </select>
                <input style={inputStyle} placeholder="Precio (o 0 para gratis)" value={price} onChange={(e) => setPrice(e.target.value)} />
                <button type="submit" style={{ ...saveBtn, padding: '12px 16px', fontSize: 14 }}>
                  Crear curso
                </button>
              </form>

              <div style={{ padding: 22, borderRadius: 18, background: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)', border: '1px solid rgba(255,255,255,0.14)' }}>
                <h2 style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>Cursos ({courses.length})</h2>
                {loading ? (
                  <div style={{ color: 'rgba(255,255,255,0.5)', padding: '20px 0' }}>Cargando cursos...</div>
                ) : courses.length === 0 ? (
                  <div style={{ color: 'rgba(255,255,255,0.5)', padding: '20px 0' }}>Sin cursos registrados.</div>
                ) : (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640, fontSize: 13.5 }}>
                      <thead>
                        <tr style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          <th style={cellStyle}>Curso</th>
                          <th style={cellStyle}>Categoria</th>
                          <th style={cellStyle}>Nivel</th>
                          <th style={cellStyle}>Precio</th>
                          <th style={cellStyle}>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {courses.map((c) => (
                          <tr key={c.id} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            {editingId === c.id ? (
                              <>
                                <td style={cellStyle}>
                                  <input style={{ ...inputStyle, width: 200 }} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                                </td>
                                <td style={cellStyle}>
                                  <select style={{ ...inputStyle, width: 170 }} value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}>
                                    {filterCategories.map((cat) => <option key={cat} value={cat} style={{ color: '#111' }}>{cat}</option>)}
                                  </select>
                                </td>
                                <td style={cellStyle}>
                                  <select style={{ ...inputStyle, width: 150 }} value={editForm.level} onChange={(e) => setEditForm({ ...editForm, level: e.target.value })}>
                                    {levelOptions.map((lv) => <option key={lv} value={lv} style={{ color: '#111' }}>{lv}</option>)}
                                  </select>
                                </td>
                                <td style={cellStyle}>
                                  <input style={{ ...inputStyle, width: 110 }} value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
                                </td>
                                <td style={cellStyle}>
                                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    <button style={saveBtn} onClick={() => handleUpdate(c.id)}>Guardar</button>
                                    <button style={cancelBtn} onClick={cancelEdit}>Cancelar</button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td style={cellStyle}>
                                  <div style={{ fontWeight: 700, lineHeight: 1.35 }}>{c.title}</div>
                                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 3 }}>{c.instructor}</div>
                                </td>
                                <td style={cellStyle}>{c.category}</td>
                                <td style={cellStyle}>{c.level}</td>
                                <td style={cellStyle}>{c.price === 'Gratis' ? <span style={{ color: '#6EE7B7', fontWeight: 700 }}>Gratis</span> : <span>CRC {String(c.price)}</span>}</td>
                                <td style={cellStyle}>
                                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    <button style={editBtn} onClick={() => startEdit(c)}>Editar</button>
                                    <button style={deleteBtn} onClick={() => handleDelete(c.id)}>Eliminar</button>
                                  </div>
                                </td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeSection === 'usuarios' && (
          <div style={{ padding: 22, borderRadius: 18, background: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)', border: '1px solid rgba(255,255,255,0.14)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 12 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>Gestion de Usuarios ({users.length})</h2>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                {users.filter((u) => u.role === 'admin').length} administradores · {users.filter((u) => u.role === 'user').length} usuarios
              </span>
            </div>
            {usersLoading ? (
              <div style={{ color: 'rgba(255,255,255,0.5)', padding: '20px 0' }}>Cargando usuarios...</div>
            ) : users.length === 0 ? (
              <div style={{ color: 'rgba(255,255,255,0.5)', padding: '20px 0' }}>Sin usuarios registrados.</div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560, fontSize: 14 }}>
                  <thead>
                    <tr style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={cellStyle}>Nombre</th>
                      <th style={cellStyle}>Correo</th>
                      <th style={cellStyle}>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                        <td style={cellStyle}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <span style={{ display: 'inline-flex', width: 36, height: 36, borderRadius: '50%', alignItems: 'center', justifyContent: 'center', background: u.role === 'admin' ? 'rgba(14,165,233,0.2)' : 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.25)', fontWeight: 800, fontSize: 14 }}>
                              {u.name.charAt(0).toUpperCase()}
                            </span>
                            <span style={{ fontWeight: 700 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={cellStyle}><span style={{ color: 'rgba(255,255,255,0.75)' }}>{u.email}</span></td>
                        <td style={cellStyle}>
                          <span style={{ display: 'inline-block', fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: u.role === 'admin' ? 'rgba(14,165,233,0.18)' : 'rgba(0,168,150,0.14)', color: u.role === 'admin' ? '#38BDF8' : '#2DD4BF' }}>
                            {u.role === 'admin' ? 'Administrador' : 'Usuario'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeSection === 'reportes' && (
          <div style={{ padding: 22, borderRadius: 18, background: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)', border: '1px solid rgba(255,255,255,0.14)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>Reporte de Inscritos</h2>
              {selectedReportCourse && (
                <button style={saveBtn} onClick={() => exportCourseExcel(selectedReportCourse)}>
                  ⬇ Exportar a Excel
                </button>
              )}
            </div>

            <div style={{ marginBottom: 18, maxWidth: 480 }}>
              <label style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 8, fontWeight: 600 }}>Selecciona un curso</label>
              <select
                style={inputStyle}
                value={selectedReportCourse ? String(selectedReportCourse.id) : ''}
                onChange={(e) => setReportCourseId(e.target.value)}
              >
                {courses.map((c) => (
                  <option key={c.id} value={String(c.id)} style={{ color: '#111' }}>{c.title}</option>
                ))}
              </select>
            </div>

            {selectedReportCourse ? (
              <>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 16, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
                  <span>Instructor: <strong style={{ color: '#FFFFFF' }}>{selectedReportCourse.instructor}</strong></span>
                  <span>Categoria: <strong style={{ color: '#FFFFFF' }}>{selectedReportCourse.category}</strong></span>
                  <span>Total inscritos: <strong style={{ color: '#6EE7B7' }}>{getInscribedStudents(selectedReportCourse).length}</strong></span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560, fontSize: 14 }}>
                    <thead>
                      <tr style={{ color: 'rgba(255,255,255,0.55)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        <th style={cellStyle}>#</th>
                        <th style={cellStyle}>Estudiante</th>
                        <th style={cellStyle}>Correo</th>
                        <th style={cellStyle}>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getInscribedStudents(selectedReportCourse).map((name, i) => {
                        const email = `${name.split(' ')[0]}.${name.split(' ')[1] || 'estudiante'}@auladigital.com`.toLowerCase()
                        return (
                          <tr key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            <td style={cellStyle}><span style={{ color: 'rgba(255,255,255,0.5)' }}>{i + 1}</span></td>
                            <td style={cellStyle}><span style={{ fontWeight: 700 }}>{name}</span></td>
                            <td style={cellStyle}><span style={{ color: 'rgba(255,255,255,0.75)' }}>{email}</span></td>
                            <td style={cellStyle}><span style={{ color: '#6EE7B7', fontWeight: 600 }}>Inscrito</span></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.5)', padding: '20px 0' }}>No hay cursos disponibles para generar el reporte.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
