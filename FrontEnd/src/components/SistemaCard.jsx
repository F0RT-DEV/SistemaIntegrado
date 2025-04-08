// import { useNavigate } from "react-router-dom";

// function SistemaCard({ system }) {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/app/${system.id}`);
//   };

//   return (
//     <div 
//       className={`system-card ${system.color}`} 
//       onClick={handleClick}
//       style={{ cursor: "pointer" }}
//     >
//       <div className={`icon-wrapper ${system.color}`}>
//         <system.icon size={32} className="icon-small" />
//       </div>
//       <h3 className="system-title">{system.name}</h3>
//       <p>Clique para acessar o sistema</p>
//     </div>
//   );
// }
// export default SistemaCard

import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';


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