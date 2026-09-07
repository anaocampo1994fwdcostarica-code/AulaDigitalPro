import { GraduationCap } from 'lucide-react'

export default function Logo({ size = 48, fontSize = 22 }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        width: 'fit-content',
      }}
    >
      {/* Icono envuelto en cuadrado con degradado */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          borderRadius: 14,
          background: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 60%, #0EA5E9 100%)',
          boxShadow: '0 10px 22px rgba(109, 40, 217, 0.4)',
          flexShrink: 0,
        }}
      >
        <GraduationCap color="#FFFFFF" size={size * 0.55} strokeWidth={2.4} />
      </span>

      {/* Texto */}
      <span
        style={{
          color: '#FFFFFF',
          fontFamily: "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: 800,
          fontSize,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          lineHeight: 1.1,
        }}
      >
        AulaDigital<span style={{ color: '#0EA5E9' }}>Pro</span>
      </span>
    </div>
  )
}
