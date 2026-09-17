import { palette, FONT } from '../theme'

const SIZE_MAP = { xs: 24, sm: 32, md: 40, lg: 64, xl: 120 }
const FONT_MAP = { xs: '15px', sm: '19px', md: '24px', lg: '30px', xl: '48px' }

export default function BrandLogo({ compact = false, size = 'md', tone = 'dark' }) {
  const px = SIZE_MAP[size] || SIZE_MAP.md
  const fontSize = FONT_MAP[size] || FONT_MAP.md
  const dark = tone === 'dark'
  const baseColor = dark ? palette.ink : '#FFFFFF'
  const accentColor = palette.goldBright

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <img
        src="/logo-gemini.jpg"
        alt="Logo AulaDigital Pro"
        style={{
          width: `${px}px`,
          height: `${px}px`,
          objectFit: 'contain',
          borderRadius: '12px',
          flexShrink: 0,
          transform: 'scale(1.05)',
          boxShadow: dark ? '0 4px 12px rgba(15,23,42,0.25)' : '0 8px 18px rgba(20,5,45,0.35)',
        }}
      />
      {!compact && (
        <span
          style={{
            fontSize,
            fontWeight: 800,
            lineHeight: 1.05,
            whiteSpace: 'nowrap',
            letterSpacing: '-0.03em',
            fontFamily: FONT,
          }}
        >
          <span style={{ color: baseColor }}>AulaDigital</span>
          <span style={{ color: accentColor }}>Pro</span>
        </span>
      )}
    </div>
  )
}
