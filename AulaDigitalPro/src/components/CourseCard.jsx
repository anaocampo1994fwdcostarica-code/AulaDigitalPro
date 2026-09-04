import { useState } from 'react'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

const inputStyle = {
  width: '100%',
  padding: '6px 8px',
  fontSize: '14px',
  border: '1px solid #E2E8F0',
  borderRadius: '2px',
  outline: 'none',
  boxSizing: 'border-box',
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

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 6px 16px rgba(0, 0, 0, 0.12)'
          : '0 1px 2px rgba(0, 0, 0, 0.04)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        border: '1px solid #E2E8F0',
        fontFamily: udemyFont,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          aspectRatio: '16/9',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <div style={{ padding: '12px', flex: 1 }}>
        <span
          style={{
            display: 'inline-block',
            background: '#D1FAE5',
            color: '#047857',
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '4px',
            marginBottom: '6px',
          }}
        >
          {level}
        </span>
        {editing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(event) => setEditTitle(event.target.value)}
            style={{ ...inputStyle, marginBottom: '4px' }}
          />
        ) : (
          <h3
            style={{
              margin: '0 0 4px',
              fontSize: '15px',
              lineHeight: '1.3',
              fontWeight: 700,
              color: '#1E293B',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: '39px',
            }}
          >
            {title}
          </h3>
        )}
        <p
          style={{
            margin: '0 0 6px',
            fontSize: '12px',
            color: '#475569',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {instructor}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#b4690e' }}>{rating}</span>
          <span style={{ color: '#b4690e', fontSize: '13px', letterSpacing: '1px' }}>★★★★★</span>
          <span style={{ fontSize: '12px', color: '#475569' }}>({students})</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
          {editing ? (
            <input
              type="text"
              value={editPrice}
              onChange={(event) => setEditPrice(event.target.value)}
              style={{ ...inputStyle, maxWidth: '120px' }}
            />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '17px', fontWeight: 700, color: '#1E293B' }}>{price}</span>
              {oldPrice && (
                <span
                  style={{
                    fontSize: '13px',
                    color: '#475569',
                    textDecoration: 'line-through',
                  }}
                >
                  {oldPrice}
                </span>
              )}
            </div>
          )}
          {isAdmin && (
            <div style={{ display: 'flex', gap: '6px' }}>
              {editing ? (
                <>
                  <button
                    onClick={saveEditing}
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#fff',
                      background: '#9333EA',
                      border: '1px solid #9333EA',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#475569',
                      background: '#fff',
                      border: '1px solid #CBD5E1',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={startEditing}
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#1E293B',
                      background: '#fff',
                      border: '1px solid #CBD5E1',
                      padding: '6px 10px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                    }}
                  >
                    Editar
                  </button>
                  {onDelete && (
                    <button
                      onClick={onDelete}
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#b42318',
                        background: '#fff',
                        border: '1px solid #b42318',
                        padding: '6px 10px',
                        borderRadius: '2px',
                        cursor: 'pointer',
                      }}
                    >
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