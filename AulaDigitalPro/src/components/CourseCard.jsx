import { useState } from 'react'
import { gradients } from '../theme'

const FONT = "'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

const inputStyle = {
  width: '100%',
  padding: '6px 8px',
  fontSize: '14px',
  border: '1px solid #DEE3E8',
  borderRadius: '8px',
  outline: 'none',
  boxSizing: 'border-box',
  background: '#FFFFFF',
  color: '#1C1D1F',
}

function getLevelStyle(level) {
  if (level === 'Principiante') {
    return { background: 'rgba(0, 168, 150, 0.1)', color: '#0D9488' }
  }
  if (level === 'Avanzado') {
    return { background: 'rgba(212, 175, 55, 0.14)', color: '#A07E08' }
  }
  return { background: 'rgba(37, 99, 235, 0.12)', color: '#2563EB' }
}

export default function CourseCard({
  title,
  instructor,
  level,
  price,
  oldPrice,
  rating,
  students,
  image = 'https://via.placeholder.com/300x200',
  isAdmin = false,
  onDelete,
  onUpdate,
}) {
  const [hovered, setHovered] = useState(false)
  const [editing, setEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editPrice, setEditPrice] = useState(price)
  const [deleteHover, setDeleteHover] = useState(false)

  const startEditing = () => {
    setEditTitle(title)
    setEditPrice(price)
    setEditing(true)
  }

  const saveEditing = () => {
    if (!editTitle.trim() || !editPrice.trim()) return
    onUpdate?.({ title: editTitle.trim(), price: editPrice.trim() })
    setEditing(false)
  }

  const levelStyle = getLevelStyle(level)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: '18px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 26px 44px -12px rgba(15, 23, 42, 0.22)'
          : '0 10px 22px rgba(15, 23, 42, 0.1)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
        border: hovered ? '1px solid rgba(109,40,217,0.4)' : '1px solid #ECEEF1',
        fontFamily: FONT,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Imagen */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            aspectRatio: '16/9',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.4s ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />
      </div>

      <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {/* Badge nivel */}
        <span style={{
          display: 'inline-block',
          background: levelStyle.background,
          color: levelStyle.color,
          fontSize: '11px',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: '999px',
          alignSelf: 'flex-start',
          letterSpacing: '0.01em',
        }}>
          {level}
        </span>

        {/* Titulo */}
        {editing ? (
          <input type="text" value={editTitle} onChange={(event) => setEditTitle(event.target.value)}
            style={{ ...inputStyle, marginBottom: '2px' }} />
        ) : (
          <h3 style={{
            margin: '2px 0 0',
            fontSize: '15px',
            lineHeight: '1.4',
            fontWeight: 800,
            color: '#1C1D1F',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '40px',
            letterSpacing: '-0.01em',
          }}>
            {title}
          </h3>
        )}

        {/* Instructor */}
        <p style={{
          margin: 0,
          fontSize: '13px',
          color: '#6A6F73',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontWeight: 500,
        }}>
          {instructor}
        </p>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#1C1D1F' }}>{rating}</span>
          <span style={{ color: '#7C3AED', fontSize: '13px', letterSpacing: '1px' }}>
            {Array.from({ length: 5 }, (_, i) => (
              i < Math.round(rating) ? '★' : '☆'
            )).join('')}
          </span>
          <span style={{ fontSize: '11px', color: '#6A6F73' }}>({students})</span>
        </div>

        {/* Precio + botones admin */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginTop: 'auto', paddingTop: '6px' }}>
          {editing ? (
            <input type="text" value={editPrice} onChange={(event) => setEditPrice(event.target.value)}
              style={{ ...inputStyle, maxWidth: '110px' }} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#1C1D1F', letterSpacing: '-0.02em' }}>{price}</span>
              {oldPrice && (
                <span style={{ fontSize: '12px', color: '#9399A1', textDecoration: 'line-through' }}>{oldPrice}</span>
              )}
            </div>
          )}

          {isAdmin && (
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              {editing ? (
                <>
                  <button onClick={saveEditing} style={{
                    fontSize: '12px', fontWeight: 700, color: '#fff',
                    background: gradients.btn,
                    border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(109,40,217,0.3)',
                  }}>
                    Guardar
                  </button>
                  <button onClick={() => setEditing(false)} style={{
                    fontSize: '12px', fontWeight: 600, color: '#6A6F73',
                    background: 'transparent', border: '1px solid #DEE3E8',
                    padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
                  }}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button onClick={startEditing} style={{
                    fontSize: '12px', fontWeight: 600, color: '#1C1D1F',
                    background: '#F1F2F4', border: '1px solid #DEE3E8',
                    padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}>
                    Editar
                  </button>
                  {onDelete && (
                    <button onClick={onDelete}
                      onMouseEnter={() => setDeleteHover(true)}
                      onMouseLeave={() => setDeleteHover(false)}
                      style={{
                        fontSize: '12px', fontWeight: 700,
                        color: '#DC2626',
                        background: deleteHover ? 'rgba(220,38,38,0.12)' : 'rgba(220,38,38,0.06)',
                        border: '1px solid rgba(220,38,38,0.35)',
                        padding: '6px 12px', borderRadius: '8px', cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}>
                      Eliminar
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
