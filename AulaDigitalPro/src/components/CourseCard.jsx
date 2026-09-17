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
  if (level === 'Intermedio') {
    return { background: 'rgba(37, 99, 235, 0.12)', color: '#2563EB' }
  }
  if (level === 'Avanzado') {
    return { background: 'rgba(124, 58, 237, 0.12)', color: '#7C3AED' }
  }
  return { background: 'rgba(99, 102, 241, 0.12)', color: '#6366F1' }
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
  onAddToCart,
  inCart = false,
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
        borderRadius: '0.5rem',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 16px 30px -8px rgba(15, 23, 42, 0.22)'
          : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
        border: hovered ? '1px solid rgba(109,40,217,0.4)' : '1px solid #ECEEF1',
        borderTop: '4px solid #4F46E5',
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

      <div style={{ padding: '16px 16px 26px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '10px', marginTop: 'auto', paddingTop: '10px' }}>
          {editing ? (
            <input type="text" value={editPrice} onChange={(event) => setEditPrice(event.target.value)}
              style={{ ...inputStyle, maxWidth: '110px' }} />
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', minWidth: 0, flexShrink: 1 }}>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#1C1D1F', letterSpacing: '-0.02em' }}>{price}</span>
              {oldPrice && (
                <span style={{ fontSize: '12px', color: '#9399A1', textDecoration: 'line-through' }}>{oldPrice}</span>
              )}
            </div>
          )}

          {isAdmin && (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '8px', flexShrink: 1, minWidth: 0 }}>
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
                    fontSize: '12px', fontWeight: 700, color: '#FFFFFF',
                    background: '#4F46E5', border: 'none',
                    padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(79,70,229,0.3)',
                    transition: 'background 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease',
                  }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.background = '#4338CA'
                      event.currentTarget.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.background = '#4F46E5'
                      event.currentTarget.style.transform = 'translateY(0)'
                    }}>
                    Editar
                  </button>
                  {onDelete && (
                    <button onClick={onDelete}
                      onMouseEnter={() => setDeleteHover(true)}
                      onMouseLeave={() => setDeleteHover(false)}
                      style={{
                        fontSize: '12px', fontWeight: 700,
                        color: '#FFFFFF',
                        background: deleteHover ? '#DC2626' : '#ef4444',
                        border: 'none',
                        padding: '8px 14px', borderRadius: '8px', cursor: 'pointer',
boxShadow: deleteHover ? '0 6px 14px rgba(239,68,68,0.4)' : '0 4px 10px rgba(239,68,68,0.3)',
                        transition: 'background 0.15s ease, boxShadow 0.15s ease, transform 0.15s ease',
                      }}>
                      Eliminar
                    </button>
                  )}
                </>
              )}
            </div>
          )}

          {!isAdmin && onAddToCart && (
            <button
              onClick={onAddToCart}
              disabled={inCart}
              style={{
                fontSize: '12.5px', fontWeight: 800, color: inCart ? '#0D9488' : '#FFFFFF',
                background: inCart ? 'rgba(13,148,136,0.12)' : gradients.btn,
                border: inCart ? '1px solid rgba(13,148,136,0.4)' : 'none',
                padding: '9px 14px', borderRadius: '8px', cursor: inCart ? 'default' : 'pointer',
                boxShadow: inCart ? 'none' : '0 6px 14px rgba(109,40,217,0.3)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'all 0.15s ease, transform 0.15s ease',
              }}
              onMouseEnter={(event) => {
                if (!inCart) {
                  event.currentTarget.style.transform = 'translateY(-1px)'
                  event.currentTarget.style.boxShadow = '0 8px 18px rgba(109,40,217,0.4)'
                }
              }}
              onMouseLeave={(event) => {
                if (!inCart) {
                  event.currentTarget.style.transform = 'translateY(0)'
                  event.currentTarget.style.boxShadow = '0 6px 14px rgba(109,40,217,0.3)'
                }
              }}
            >
              {inCart ? '✓ En el carrito' : 'Agregar al Carrito'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
