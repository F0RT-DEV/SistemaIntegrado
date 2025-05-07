import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import "./SistemaCard.css"; // Importando o CSS para estilização


const SistemaCard = ({ system }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.includes(system.id)

  return (
    <button
    onClick={() => navigate(`/app/${system.id}`)} 
      className={`system-card ${isActive ? 'active' : ''}`}>
      <div 
  className={`icon-wrapper ${system.color}`}
  style={{
    ...(system.color === 'red' && {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      border: '2px solid rgba(255, 102, 0, 0.3) '
    }),
    ...(system.color === 'blue' && {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      border: '2px solid rgba(3, 7, 248, 0.46)'
    }),
    ...(system.color === 'green' && {
      backgroundColor: 'rgba(0, 0, 0, 0.12)',
      border: '2px solid rgba(13, 233, 42, 0.42)'
    })
  }}
>
  <system.icon className={`icon-small ${system.color}`} size={24} />
</div>
      <h3 className="system-title">
        {system.name}
      </h3>
      <p className="system-status">
        {isActive ? 'Sistema ativo' : 'Clique para acessar'}
      </p>
    </button>
  )
}

export default SistemaCard