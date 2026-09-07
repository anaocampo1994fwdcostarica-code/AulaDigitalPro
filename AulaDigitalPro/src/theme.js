// Sistema de diseño AulaDigital Pro — tokens compartidos
export const FONT = "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

export const palette = {
  purple: '#6D28D9',
  purpleDark: '#4C1D95',
  purpleSoft: '#8B5CF6',
  blue: '#2563EB',
  sky: '#0EA5E9',
  teal: '#0D9488',
  tealSoft: '#00A896',
  gold: '#D4AF37',
  goldBright: '#F5B301',
  ink: '#0A2540',
  slate: '#475569',
  muted: '#64748B',
  faint: '#94A3B8',
  line: '#E2E8F0',
  surface: '#FFFFFF',
  danger: '#DC2626',
}

export const gradients = {
  // Degradado de marca: púrpura → azul → verde
  app: 'linear-gradient(125deg, #4C1D95 0%, #7C3AED 24%, #4338CA 46%, #2563EB 70%, #0EA5E9 88%, #00A896 100%)',
  brand: 'linear-gradient(135deg, #6D28D9 0%, #3B82F6 55%, #0D9488 100%)',
  btn: 'linear-gradient(135deg, #7C3AED 0%, #2563EB 60%, #0EA5E9 100%)',
  gold: 'linear-gradient(135deg, #F5B301 0%, #D4AF37 100%)',
}

// Superficies semitransparentes/oscuras para la identidad visual
export const surfaces = {
  glass: 'rgba(255,255,255,0.07)',
  glassHover: 'rgba(255,255,255,0.12)',
  card: 'linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%)',
  border: 'rgba(255,255,255,0.16)',
  borderStrong: 'rgba(255,255,255,0.30)',
  input: 'rgba(255,255,255,0.08)',
}