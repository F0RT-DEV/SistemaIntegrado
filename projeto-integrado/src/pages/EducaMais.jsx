import React from 'react'

const EducaMais = () => {
  return (
    <div className="system-info">
    <div className="info-box blue">
      <h3 className="info-title blue">Matrícula Escolar</h3>
      <p className="info-description blue">Realize ou acompanhe matrículas no sistema educacional</p>
    </div>
    <div className="options-grid">
      <div className="option-card">
        <h4 className="option-title">Nova Matrícula</h4>
        <p className="option-description">Cadastre um novo aluno no sistema</p>
      </div>
      <div className="option-card">
        <h4 className="option-title">Consultar Matrícula</h4>
        <p className="option-description">Verifique o status de uma matrícula</p>
      </div>
    </div>
  </div>
  )
}

export default EducaMais