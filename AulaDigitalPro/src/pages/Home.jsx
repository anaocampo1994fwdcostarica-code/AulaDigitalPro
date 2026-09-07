import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import BrandLogo from '../components/BrandLogo'
import { FONT, gradients } from '../theme'

const API_URL = '/api/courses'

const fallbackCourses = [
  { id:1, title: 'React desde cero: Guia completa de hooks y componentes', instructor: 'Juan Perez', category: 'Desarrollo de software', level: 'Principiante', price: '9.900' },
  { id:2, title: 'Node.js avanzado: APIs, bases de datos y microservicios', instructor: 'Maria Garcia', category: 'Desarrollo de software', level: 'Intermedio', price: '12.900' },
  { id:3, title: 'Fundamentos de Python: de cero a tu primer proyecto', instructor: 'Diego Rojas', category: 'Desarrollo de software', level: 'Principiante', price: '8.900' },
  { id:4, title: 'UI/UX Design con Figma: metodologias y prototipos', instructor: 'Laura Jimenez', category: 'Diseno', level: 'Intermedio', price: '11.900' },
  { id:5, title: 'Diseno grafico con Photoshop para principiantes', instructor: 'Roberto Araya', category: 'Diseno', level: 'Principiante', price: '7.900' },
  { id:6, title: 'Marketing en redes sociales: de 0 a estrategia', instructor: 'Camila Vargas', category: 'Marketing digital', level: 'Principiante', price: '9.900' },
]

function CategoryBadge({ category, level }) {
  const colors = {
    'Desarrollo de software': { bg: 'rgba(0,168,150,0.16)', color: '#2DD4BF' },
    'Diseno': { bg: 'rgba(212,175,55,0.16)', color: '#E8C766' },
    'Marketing digital': { bg: 'rgba(14,165,233,0.16)', color: '#5BC8F8' },
    default: { bg: 'rgba(255,255,255,0.14)', color: '#E8ECF4' },
  }
  const levelColors = {
    'Principiante': { bg: 'rgba(0,168,150,0.16)', color: '#2DD4BF' },
    'Intermedio': { bg: 'rgba(37,99,235,0.16)', color: '#7CA8FA' },
    'Avanzado': { bg: 'rgba(212,175,55,0.18)', color: '#E8C766' },
    default: { bg: 'rgba(255,255,255,0.14)', color: '#E8ECF4' },
  }
  const style = colors[category] || colors.default
  const lStyle = levelColors[level] || levelColors.default
  return (
    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', background: style.bg, color: style.color }}>{category}</span>
      <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', background: lStyle.bg, color: lStyle.color }}>{level}</span>
    </div>
  )
}

const aboutCards = [
  {
    title: 'Mision',
    icon: '🎯',
    text: 'Democratizar la educacion tecnologica y hacerla accesible para cualquier persona, ofreciendo formacion de alta calidad, practica y alineada con las demandas reales de la industria.',
  },
  {
    title: 'Vision',
    icon: '🚀',
    text: 'Convertirnos en la plataforma educativa en tecnologia mas confiable de la region, reconocida por transformar carreras y empresas.',
  },
  {
    title: 'Nuestra Historia',
    icon: '📖',
    text: 'AulaDigital Pro nacio de una idea sencilla: la mejor manera de aprender es haciendo. Hoy somos una comunidad en crecimiento que impulsa talento digital.',
  },
]

const stats = [
  { value: '27+', label: 'Cursos profesionales' },
  { value: '100K+', label: 'Estudiantes activos' },
  { value: '4.8', label: 'Valoración media' },
  { value: '99%', label: 'Satisfacción' },
]

export default function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function loadCourses() {
      try {
        const response = await fetch(API_URL)
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

  const featured = courses.slice(0, 6)

  return (
    <div style={{ minHeight: '100vh', background: gradients.app, fontFamily: FONT, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '-160px', left: '-140px', width: '560px', height: '560px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-180px', right: '-160px', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,179,1,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <header className="home-topbar">
        <Link to="/" style={{ display: 'flex', textDecoration: 'none', flexShrink: 0 }}>
          <BrandLogo compact size="md" tone="light" />
        </Link>
        <Link className="home-topbar__login" to="/login">Iniciar sesión</Link>
      </header>

      <section className="home-hero">
        <span className="home-hero__eyebrow">✨ Aprendizaje que se convierte en acción</span>
        <BrandLogo size="xl" tone="light" />
        <h1 className="home-hero__title">Bienvenido a la nueva forma de aprender digital</h1>
        <p className="home-hero__subtitle">Domina habilidades en tecnología, diseño y negocios con cursos prácticos, proyectos reales y acompañamiento experto.</p>
        <div className="home-hero__actions">
          <Link className="home-cta home-cta--primary" to="/login">Explorar Cursos</Link>
          <Link className="home-cta home-cta--ghost" to="/login">Iniciar Sesión</Link>
        </div>
        <p className="home-hero__note">Empieza a tu ritmo. Cancela cuando quieras.</p>
      </section>

      <section className="home-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="home-stat">
            <div className="home-stat__value">{stat.value}</div>
            <div className="home-stat__label">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="home-section">
        <div className="home-section__head">
          <h2>Sobre Nosotros</h2>
          <p>Construimos el futuro digital, un estudiante a la vez.</p>
        </div>
        <div className="home-cards">
          {aboutCards.map((card) => (
            <div key={card.title} className="home-card home-card--about">
              <div className="home-card__icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section__head">
          <h2>Cursos destacados</h2>
          <p>Una selección de nuestra oferta formativa para arrancar tu trayecto.</p>
        </div>
        {loading ? (
          <p className="home-loading">Cargando cursos desde JSON Server...</p>
        ) : (
          <div className="home-courses">
            {featured.map((course) => (
              <div key={course.id} className="home-card home-card--course">
                <CategoryBadge category={course.category} level={course.level} />
                <h3>{course.title}</h3>
                <p className="home-card__instructor">{course.instructor}</p>
                <div className="home-card__price">
                  {course.price !== 'Gratis' ? (
                    <span className="home-card__value">{course.price}</span>
                  ) : (
                    <span className="home-card__free">Gratis</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="home-more">
          <Link className="home-cta home-cta--ghost" to="/login">Ver todos los cursos</Link>
        </div>
      </section>

      <footer className="home-footer">
        <BrandLogo compact tone="light" />
        <p>© 2026 AulaDigital Pro. Todos los derechos reservados.</p>
        <div className="home-footer__links">
          {['Privacidad','Terminos','Contacto'].map((link) => (
            <a key={link} href="#">{link}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}
