import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const FONT = "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"
const PRIMARY = '#a435f0'
const PRIMARY_DARK = '#5624d0'
const TEXT = '#1c1d1f'
const TEXT_MUTED = '#6a6f73'
const BORDER = '#e8e8e8'
const API_URL = 'http://localhost:3001/courses'

const sectionTitleStyle = {
  fontSize: '30px',
  fontWeight: 700,
  color: TEXT,
  margin: '0 0 8px',
  textAlign: 'center',
}

const buttonStyle = {
  display: 'inline-block',
  background: PRIMARY,
  color: '#fff',
  fontSize: '16px',
  fontWeight: 700,
  padding: '14px 28px',
  borderRadius: '6px',
  textDecoration: 'none',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
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
    <div style={{ fontFamily: FONT, minHeight: '100vh', background: '#fff' }}>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(135deg, #1c1d1f 0%, #281a3a 60%, #5624d0 100%)',
          color: '#fff',
          textAlign: 'center',
          padding: '96px 24px',
        }}
      >
        <h1 style={{ fontSize: '52px', fontWeight: 800, margin: '0 0 16px' }}>AulaDigital Pro</h1>
        <p
          style={{
            fontSize: '20px',
            color: '#e0d7f0',
            maxWidth: '640px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          Aprende tecnología de la mano de expertos y conviértete en el profesional que el mundo
          digital necesita. Cursos prácticos, proyectos reales y una comunidad que te impulsa.
        </p>
        <Link to="/login" style={buttonStyle}>
          Acceder a la plataforma
        </Link>
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
              background: '#f7f9fa',
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
              background: '#f7f9fa',
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
              background: '#f7f9fa',
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
                  {course.description}
                </p>
                <span style={{ fontSize: '13px', fontWeight: 700, color: PRIMARY_DARK }}>
                  {course.duration}
                </span>
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
      <footer style={{ background: '#1c1d1f', color: '#e0d7f0', textAlign: 'center', padding: '24px' }}>
        <p style={{ fontSize: '14px', margin: 0 }}>© 2024 AulaDigital Pro</p>
      </footer>
    </div>
  )
}