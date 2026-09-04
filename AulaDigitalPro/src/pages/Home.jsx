import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const FONT = "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"
const PRIMARY = '#9333EA'
const PRIMARY_DARK = '#9333EA'
const TEXT = '#1E293B'
const TEXT_MUTED = '#475569'
const BORDER = '#E2E8F0'
const API_URL = '/api/courses'

const sectionTitleStyle = {
  fontSize: '30px',
  fontWeight: 700,
  color: TEXT,
  margin: '0 0 8px',
  textAlign: 'center',
}

const buttonStyle = {
  display: 'inline-block',
  background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 700,
  padding: '14px 28px',
  borderRadius: '12px',
  textDecoration: 'none',
  cursor: 'pointer',
  boxShadow: '0 12px 24px rgba(139, 92, 246, 0.2)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
}

export default function Home() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Error al cargar los cursos')
        return response.json()
      })
      .then((data) => setCourses(data))
      .catch(() => setError('No pudimos cargar los cursos destacados. Inténtalo de nuevo más tarde.'))
      .finally(() => setLoading(false))
  }, [])

  const featured = courses.slice(0, 6)

  return (
    <div style={{ fontFamily: FONT, minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-hero__eyebrow">Aprendizaje que se convierte en acción</span>
          <h1>Aprende hoy las habilidades que abrirán tu próximo camino.</h1>
          <p>
            Cursos prácticos, proyectos reales y acompañamiento experto para avanzar con confianza
            en el mundo digital.
          </p>
          <Link to="/login" style={buttonStyle}>
            Explorar cursos
          </Link>
          <small>Empieza a tu ritmo. Cancela cuando quieras.</small>
        </div>
        <div className="home-hero__visual" aria-label="Estudiante aprendiendo en AulaDigitalPro">
          <div className="home-hero__shape home-hero__shape--mint" />
          <div className="home-hero__shape home-hero__shape--peach" />
          <div className="home-hero__shape home-hero__shape--yellow" />
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85"
            alt="Estudiante trabajando en un curso digital"
          />
          <div className="home-hero__note">+ habilidades reales</div>
          <div className="home-hero__badge">Aprende a tu ritmo</div>
        </div>
      </section>

      {/* Sobre nosotros */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={sectionTitleStyle}>Sobre Nosotros</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '32px',
          }}
        >
          <div
            style={{
              background: '#F8FAFC',
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: PRIMARY_DARK, margin: '0 0 12px' }}>
              Misión
            </h3>
            <p style={{ fontSize: '15px', color: TEXT_MUTED, lineHeight: 1.7, margin: 0 }}>
              Democratizar la educación tecnológica y hacerla accesible para cualquier persona,
              ofreciendo formación de alta calidad, práctica y alineada con las demandas reales de
              la industria. Creemos que el talento no entiende de fronteras, y nuestra misión es
              darle las herramientas para que despegue.
            </p>
          </div>
          <div
            style={{
              background: '#F8FAFC',
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: PRIMARY_DARK, margin: '0 0 12px' }}>
              Visión
            </h3>
            <p style={{ fontSize: '15px', color: TEXT_MUTED, lineHeight: 1.7, margin: 0 }}>
              Convertirnos en la plataforma educativa en tecnología más confiable de la región,
              reconocida por transformar carreras y empresas. Soñamos con un ecosistema donde cada
              estudiante, sin importar su punto de partida, pueda construir un futuro mejor a través
              del conocimiento.
            </p>
          </div>
          <div
            style={{
              background: '#F8FAFC',
              border: `1px solid ${BORDER}`,
              borderRadius: '12px',
              padding: '24px',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: PRIMARY_DARK, margin: '0 0 12px' }}>
              Nuestra Historia
            </h3>
            <p style={{ fontSize: '15px', color: TEXT_MUTED, lineHeight: 1.7, margin: 0 }}>
              AulaDigital Pro nació de una idea sencilla: la mejor manera de aprender es haciendo.
              Comenzamos como un pequeño proyecto con unos pocos cursos y una convicción enorme.
              Hoy somos una comunidad en crecimiento que acompaña a miles de estudiantes en su
              trayecto hacia el dominio de la tecnología, curso a curso, proyecto a proyecto.
            </p>
          </div>
        </div>
      </section>

      {/* Cursos destacados */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px 64px' }}>
        <h2 style={sectionTitleStyle}>Cursos Destacados</h2>
        <p
          style={{
            fontSize: '16px',
            color: TEXT_MUTED,
            textAlign: 'center',
            margin: '0 0 32px',
          }}
        >
          Una selección de nuestra oferta formativa para arrancar tu trayecto.
        </p>

        {loading ? (
          <p style={{ fontSize: '16px', color: TEXT_MUTED, textAlign: 'center' }}>
            Cargando cursos desde JSON Server...
          </p>
        ) : error ? (
          <p style={{ fontSize: '16px', color: '#b42318', textAlign: 'center' }}>{error}</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '24px',
            }}
          >
            {featured.map((course) => (
              <div
                key={course.id}
                style={{
                  border: `1px solid ${BORDER}`,
                  borderRadius: '12px',
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
                }}
              >
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: TEXT,
                    margin: '0 0 8px',
                    minHeight: '42px',
                  }}
                >
                  {course.title}
                </h3>
                <p
                  style={{
                    fontSize: '14px',
                    color: TEXT_MUTED,
                    lineHeight: 1.5,
                    margin: '0 0 8px',
                    flex: 1,
                  }}
                >
                  {course.instructor}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    marginBottom: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: PRIMARY_DARK,
                      background: '#D1FAE5',
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    {course.category} · {course.level}
                  </span>
                  {course.price !== 'Gratis' && (
                    <span style={{ fontSize: '16px', fontWeight: 700, color: TEXT }}>
                      {course.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link to="/login" style={buttonStyle}>
            Ver más
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#3B82F6', color: '#fff', textAlign: 'center', padding: '24px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2026 AulaDigital Pro</p>
      </footer>
    </div>
  )
}