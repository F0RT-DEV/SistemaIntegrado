import React from 'react'

const FomeZero = () => {
  return (
    <div className="system-info">
    <div className="info-box green">
      <h3 className="info-title green">Programa Fome 0</h3>
      <p className="info-description green">Solicite ou acompanhe pedidos de cesta básica</p>
    </div>
    <div className="options-grid">
      <div className="option-card">
        <h4 className="option-title">Nova Solicitação</h4>
        <p className="option-description">Cadastre um novo pedido de cesta básica</p>
      </div>
      <div className="option-card">
        <h4 className="option-title">Acompanhar Pedido</h4>
        <p className="option-description">Verifique o status do seu pedido</p>
      </div>
    </div>
  </div>
  )
}

export default FomeZero;