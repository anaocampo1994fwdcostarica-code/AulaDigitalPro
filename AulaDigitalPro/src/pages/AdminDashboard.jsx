import { useState, useEffect } from 'react'
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
  { id: 'configuracion', label: 'Configuracion', badge: 'CF' },
]

const fallbackCourses = [
  { id:1, title:'React desde cero: Guia completa de hooks y componentes', category:'Desarrollo de software', instructor:'Juan Perez', level:'Principiante', price:'9.900' },
  { id:2, title:'Node.js avanzado: APIs, bases de datos y microservicios', category:'Desarrollo de software', instructor:'Maria Garcia', level:'Intermedio', price:'12.900' },
  { id:3, title:'Fundamentos de Python: de cero a tu primer proyecto', category:'Desarrollo de software', instructor:'Diego Rojas', level:'Principiante', price:'8.900' },
  { id:4, title:'UI/UX Design con Figma: metodologias y prototipos', category:'Diseno', instructor:'Laura Jimenez', level:'Intermedio', price:'11.900' },
  { id:5, title:'Diseno grafico con Photoshop para principiantes', category:'Diseno', instructor:'Roberto Araya', level:'Principiante', price:'7.900' },
  { id:6, title:'Marketing en redes sociales: de 0 a estrategia', category:'Marketing digital', instructor:'Camila Vargas', level:'Principiante', price:'9.900' },
  { id:7, title:'SEO y Google Ads: posiciona y vende mas', category:'Marketing digital', instructor:'Pablo Navarro', level:'Intermedio', price:'6.900' },
  { id:8, title:'Gestion de proyectos agiles con Scrum', category:'Gestion de negocios', instructor:'Andrea Mora', level:'Intermedio', price:'10.900' },
  { id:9, title:'Emprende tu negocio desde cero', category:'Gestion de negocios', instructor:'Fernando Castro', level:'Principiante', price:'9.900' },
  { id:10, title:'Ingles para negocios: de principiante a intermedio', category:'Desarrollo personal', instructor:'Sofia Herrera', level:'Principiante', price:'Gratis' },
  { id:11, title:'Excel avanzado: analisis de datos y dashboards', category:'Productividad', instructor:'Luis Vega', level:'Intermedio', price:'8.900' },
  { id:12, title:'Ciberseguridad esencial para empresas', category:'TI y software', instructor:'Ana Ocampo', level:'Intermedio', price:'14.900' },
  { id:13, title:'Fotografia digital: composicion y edicion', category:'Diseno', instructor:'Ricardo Munoz', level:'Principiante', price:'7.900' },
  { id:14, title:'Analitica web con Google Analytics', category:'Marketing digital', instructor:'Valeria Quiros', level:'Intermedio', price:'9.900' },
  { id:15, title:'Email marketing y automatizaciones', category:'Marketing digital', instructor:'Paula Brenes', level:'Principiante', price:'7.900' },
  { id:16, title:'Finanzas para emprendedores', category:'Finanzas', instructor:'Cristian Alfaro', level:'Avanzado', price:'12.900' },
  { id:17, title:'Liderazgo y gestion de equipos', category:'Gestion de negocios', instructor:'Daniel Salas', level:'Intermedio', price:'10.900' },
  { id:18, title:'Docker y Kubernetes: contenedores en produccion', category:'TI y software', instructor:'Mario Picado', level:'Intermedio', price:'19.900' },
  { id:19, title:'Comunicacion efectiva: expresa y convence', category:'Desarrollo personal', instructor:'Gabriela Nunez', level:'Principiante', price:'Gratis' },
  { id:20, title:'Inversiones y mercados: comienza a invertir', category:'Finanzas', instructor:'Adriana Campos', level:'Principiante', price:'12.900' },
  { id:21, title:'Guitarra acustica desde cero', category:'Musica', instructor:'Jose Ospina', level:'Principiante', price:'9.900' },
  { id:22, title:'Produccion musical con Ableton', category:'Musica', instructor:'Santiago Peralta', level:'Intermedio', price:'13.900' },
  { id:23, title:'Gestion del tiempo con tecnicas agiles', category:'Productividad', instructor:'Patricia Solano', level:'Intermedio', price:'8.900' },
  { id:24, title:'Taller practico de React Native', category:'Desarrollo de software', instructor:'Mauricio Rojas', level:'Avanzado', price:'15.900' },
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

const placeholderMeta = {
  usuarios: { badge: 'US', title: 'Gestion de Usuarios', desc: 'Aqui podras administrar cuentas, roles y accesos de tus estudiantes y colaboradores.' },
  reportes: { badge: 'RP', title: 'Reportes', desc: 'Consulta metricas de ventas, inscripciones y rendimiento de la plataforma.' },
  configuracion: { badge: 'CF', title: 'Configuracion', desc: 'Personaliza la identidad, monedas, notificaciones y preferencias generales.' },
}

export default function AdminDashboard({ user, onLogout }) {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [title, setTitle] = useState('')
  const [instructor, setInstructor] = useState('')
  const [category, setCategory] = useState(filterCategories[0])
  const [level, setLevel] = useState('Principiante')
  const [price, setPrice] = useState('')
  const [activeSection, setActiveSection] = useState('cursos')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({ title: '', category: '', level: '', price: '' })

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
    const rawPrice = editForm.price.trim().replace(/[^0-9.]/g, ''
    const updates = {
      title: editForm.title.trim(),
      category: editForm.category,
      level: editForm.level,
      price: rawPrice === '0' || !rawPrice ? 'Gratis' : rawPrice
    }
    try {
      const response = await fetch(`/api/courses/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updates) })
      const updated = await response.json()
      setCourses((prev) => prev.map((c) => String(c.id) === String(id) ? updated : c)))
    } catch {
      setCourses((prev) => prev.map((c) => String(c.id) === String(id) ? { ...c, ...updates } : c)))
    }
    setEditingId(null)
  }

  const totalStudents = courses.reduce((acc, c) => acc + (parseInt(String(c.students).replace(/\D/g, ''), 10) || 0),  ️0)
  const avgRating = courses.length ? (courses.reduce((a, c) => a + (c.rating ||  ️0),  ️0) / courses.length).toFixed(1) : '--'
  const paid = courses.filter((c) => c.price !== 'Gratis')
  const revenue = paid.reduce((a, c) => a + (parseInt(String(c.price).replace(/[^0-9.]/g, ''), 10) ||  ️0),  ️0)

  const stats = [
    { label: 'Cursos totales', value: String(courses.length) },
    { label: 'Estudiantes', value: totalStudents >= 1000 ? `${(totalStudents / 1000).toFixed(1)}K+` : String(totalStudents) },
    { label: 'Valoracion media', value: avgRating },
    { label: 'Ingresos est.', value: `CRC ${revenue.toLocaleString('es-CR')}` },
  ]
]