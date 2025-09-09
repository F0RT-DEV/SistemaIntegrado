import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import "./SistemaCard.css"; // Importando o CSS para estilização


const SistemaCard = ({ system, perfilIncompleto }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname.includes(system.id)
  const [showAlerta, setShowAlerta] = React.useState(false);

  const handleClick = (e) => {
    if (perfilIncompleto) {
      setShowAlerta(true);
      setTimeout(() => setShowAlerta(false), 3500);
      return;
    }
    navigate(`/app/${system.id}`);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleClick}
        className={`system-card ${isActive ? 'active' : ''}`}
      >
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
      {showAlerta && (
        <div style={{
          position: 'absolute',
          top: '-54px',
          left: 0,
          right: 0,
          background: '#fffbe6',
          border: '1px solid #ffe58f',
          color: '#ad8b00',
          borderRadius: '8px',
          padding: '12px',
          fontWeight: 500,
          zIndex: 10,
          textAlign: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}>
          ⚠️ Complete seu perfil para acessar este serviço.
        </div>
      )}
    </div>
  )
}

export default SistemaCard