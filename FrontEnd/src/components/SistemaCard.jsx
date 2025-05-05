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
      <div className={`icon-wrapper ${system.color}`}>
      <system.icon className="icon-small" />
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