import React, { useState, useEffect } from 'react';
import "./FomeZero.css";

const FomeZero = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarBemVindo, setMostrarBemVindo] = useState(true);
  const [mostrarConsulta, setMostrarConsulta] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [formData, setFormData] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    return {
      nome: userData.nome || "",
      cpf: userData.cpf || "",
      rendaFamiliar: ""
    };
  });

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarBemVindo(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Atualiza os dados quando o modal abre
  useEffect(() => {
    if (mostrarFormulario) {
      const userData = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
      setFormData(prev => ({
        ...prev,
        nome: userData.nome || prev.nome,
        cpf: userData.cpf || prev.cpf
      }));
    }
  }, [mostrarFormulario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cpf") {
      // Permite qualquer número (removida a validação)
      const onlyNumbers = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: onlyNumbers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verificação básica apenas se tem 11 dígitos (sem validar dígitos verificadores)
    if (formData.cpf.length !== 11) {
      alert("CPF deve conter 11 dígitos!");
      return;
    }

    setPedidos([...pedidos, formData]);
    setFormData({ nome: "", cpf: "", rendaFamiliar: "" });
    setMostrarFormulario(false);

    // Mostra a confirmação por 3 segundos
    setMostrarConfirmacao(true);
    setTimeout(() => setMostrarConfirmacao(false), 3000);
  };

  return (
    <div className="system-info">
      {mostrarBemVindo && (
        <div className="welcome-message-top">
          <h2>Bem-vindo ao Fome Zero!</h2>
        </div>
      )}

      {mostrarConfirmacao && (
        <div className="confirmation-message registration">
          <h2>Solicitação enviada com sucesso!</h2>
        </div>
      )}

      <div className="info-box">
        <h3 className="info-title">Programa Fome Zero</h3>
        <p className="info-description">Solicite ou acompanhe pedidos de cesta básica</p>
      </div>

      <div className="options-grid">
        <div className="option-cardFZERO" onClick={() => setMostrarFormulario(true)}>
          <h4 className="option-titleFZERO">Nova Solicitação</h4>
          <p className="option-description">Cadastre um novo pedido de cesta básica</p>
        </div>
        <div className="option-cardFzero" onClick={() => setMostrarConsulta(true)}>
          <h4 className="option-titlefzero">Acompanhar Pedido</h4>
          <p className="option-description">Visualize seu pedido</p>
        </div>
      </div>

      {/* Modal Nova Solicitação */}
      {mostrarFormulario && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nova Solicitação</h3>
            <form onSubmit={handleSubmit}>
              <p>Novo pedido</p>
              <input 
                type="text" 
                name="nome" 
                placeholder="Nome" 
                value={formData.nome} 
                onChange={handleChange} 
                required 
                className={formData.nome ? 'auto-filled' : ''}
              />
              <input 
                type="text" 
                name="cpf" 
                placeholder="CPF (apenas números)" 
                value={formData.cpf} 
                onChange={handleChange} 
                required 
                className={formData.cpf ? 'auto-filled' : ''}
                maxLength={11}
              />
              <select 
                name="rendaFamiliar" 
                value={formData.rendaFamiliar} 
                onChange={handleChange} 
                required
              >
                <option value="">Selecione a Renda Familiar</option>
                <option value="Até 1 salário mínimo">Até 1 salário mínimo</option>
                <option value="De 1 a 2 salários mínimos">De 1 a 2 salários mínimos</option>
                <option value="Acima de 2 salários mínimos">Acima de 2 salários mínimos</option>
              </select>

              <div className="modal-buttons">
                <button type="button" onClick={() => setMostrarFormulario(false)} className="cancel-button">
                  Cancelar
                </button>
                <button type="submit" className="confirm-button">
                  Enviar Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Consulta */}
      {mostrarConsulta && (
        <div className="consultas-listFZ">
          <h3>Pedidos Cadastrados</h3>
          {pedidos.length > 0 ? (
            <ul>
              {pedidos.map((pedido, index) => (
                <li key={index}>
                  <strong>{pedido.nome}</strong>
                  <div>CPF: {pedido.cpf}</div>
                  <div>Renda Familiar: {pedido.rendaFamiliar}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum pedido encontrado.</p>
          )}
          <div className="center-button">
            <button onClick={() => setMostrarConsulta(false)} className="cancel-button">
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FomeZero;