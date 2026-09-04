import { useState } from 'react'

const levelColors = {
  Principiante: '#12805c',
  Intermedio: '#175cd3',
  Avanzado: '#b42318',
}

export default function CourseCard({
  title,
  instructor,
  level,
  price,
  image = 'https://via.placeholder.com/300x200',
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        border: '1px solid #e8e8e8',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: hovered
          ? '0 8px 24px rgba(0, 0, 0, 0.15)'
          : '0 1px 3px rgba(0, 0, 0, 0.06)',
        transform: hovered ? 'translateY(-4px)' : 'none',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        cursor: 'pointer',
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      <div style={{ padding: '14px' }}>
        <span
          style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 600,
            color: '#fff',
            background: levelColors[level] || '#175cd3',
            marginBottom: '8px',
          }}
        >
          {level}
        </span>
        <h3
          style={{
            margin: '0 0 4px',
            fontSize: '16px',
            fontWeight: 700,
            color: '#1c1d1f',
          }}
        >
          {title}
        </h3>
        <p style={{ margin: '0 0 10px', fontSize: '13px', color: '#6a6f73' }}>
          {instructor}
        </p>
        <p style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1c1d1f' }}>
          {price}
        </p>
      </div>
    </div>
  )
}