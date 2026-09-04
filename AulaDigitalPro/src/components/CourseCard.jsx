import { useState } from 'react'

const udemyFont =
  "'Udemy Sans', 'SF Pro Text', -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI', Helvetica, Arial, sans-serif"

export default function CourseCard({
  title,
  instructor,
  level,
  price,
  oldPrice,
  rating,
  students,
  image = 'https://via.placeholder.com/300x200',
  onDelete,
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 6px 16px rgba(0, 0, 0, 0.12)'
          : '0 1px 2px rgba(0, 0, 0, 0.04)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        border: '1px solid #e8e8e8',
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
            background: '#eceb98',
            color: '#3d3c0a',
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '4px',
            marginBottom: '6px',
          }}
        >
          {level}
        </span>
        <h3
          style={{
            margin: '0 0 4px',
            fontSize: '15px',
            lineHeight: '1.3',
            fontWeight: 700,
            color: '#1c1d1f',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '39px',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: '0 0 6px',
            fontSize: '12px',
            color: '#6a6f73',
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
          <span style={{ fontSize: '12px', color: '#6a6f73' }}>({students})</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '17px', fontWeight: 700, color: '#1c1d1f' }}>{price}</span>
            {oldPrice && (
              <span
                style={{
                  fontSize: '13px',
                  color: '#6a6f73',
                  textDecoration: 'line-through',
                }}
              >
                {oldPrice}
              </span>
            )}
          </div>
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
        </div>
      </div>
    </div>
  )
}