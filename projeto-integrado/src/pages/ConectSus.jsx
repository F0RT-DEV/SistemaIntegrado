import React from 'react'

const ConectSus = () => {
  return (
    <div className="system-info">
    <div className="info-box yellow">
      <h3 className="info-title yellow">Conect SUS</h3>
      <p className="info-description yellow">Agende e acompanhe consultas médicas</p>
    </div>
    <div className="options-grid">
      <div className="option-card">
        <h4 className="option-title">Agendar Consulta</h4>
        <p className="option-description">Marque uma nova consulta médica</p>
      </div>
      <div className="option-card">
        <h4 className="option-title">Minhas Consultas</h4>
        <p className="option-description">Visualize suas consultas agendadas</p>
      </div>
    </div>
  </div>
  )
}

export default ConectSus