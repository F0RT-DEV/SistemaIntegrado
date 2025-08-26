
import React, { useState, useEffect } from 'react';
import "./FomeZero.css";

// Modal de consulta de pedidos
function ConsultaPedidosModal({ cpf, onClose }) {
  const [pedidosModal, setPedidosModal] = useState([]);
  const [loadingModal, setLoadingModal] = useState(true);
  const [errorModal, setErrorModal] = useState("");

  useEffect(() => {
    async function fetchPedidos() {
      const cpfLimpo = cpf ? cpf.trim() : "";
      console.log("CPF usado na consulta:", cpfLimpo);
      if (!cpfLimpo || cpfLimpo.length !== 11) {
        setPedidosModal([]);
        setLoadingModal(false);
        setErrorModal("CPF inválido ou não informado.");
        return;
      }
      setLoadingModal(true);
      setErrorModal("");
      try {
        const res = await fetch(`http://localhost:3000/fomezero/pedidos?cpf=${cpfLimpo}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        console.log("Dados recebidos do backend:", data);
        setPedidosModal(Array.isArray(data) ? data : []);
      } catch (err) {
        setErrorModal("Erro ao buscar pedidos.");
      }
      setLoadingModal(false);
    }
    fetchPedidos();
  }, [cpf]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>Pedidos Cadastrados</h3>
        {loadingModal ? (
          <p>Carregando...</p>
        ) : errorModal ? (
          <p style={{ color: 'red' }}>{errorModal}</p>
        ) : pedidosModal.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pedidosModal.map((pedido, index) => (
              <li key={pedido.id || index} style={{ background: '#f1f1f1', marginBottom: '12px', padding: '14px 20px', borderRadius: '10px', borderLeft: '5px solid #28a745', fontSize: '15px', color: '#444' }}>
                <strong style={{ display: 'block', fontSize: '16px', color: '#222', fontWeight: 600 }}>{pedido.nome}</strong>
                <div>CPF: {pedido.cpf}</div>
                <div>Renda Familiar: {pedido.renda_familiar}</div>
                <div>Status: {pedido.status === 'Aprovado' ? 'Aprovado' : pedido.status === 'Rejeitado' ? 'Rejeitado' : 'Em andamento'}</div>
                {pedido.status === 'Aprovado' && (
                  <div style={{ color: 'green', marginTop: '8px' }}>{pedido.mensagem}</div>
                )}
                {pedido.status === 'Rejeitado' && (
                  <div style={{ color: 'red', marginTop: '8px' }}>Pedido rejeitado: {pedido.motivo}</div>
                )}
                {pedido.status !== 'Aprovado' && pedido.status !== 'Rejeitado' && (
                  <div style={{ color: 'orange', marginTop: '8px' }}>Pedido em andamento</div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum pedido encontrado.</p>
        )}
        <div className="center-button" style={{ textAlign: 'center', marginTop: '18px' }}>
          <button onClick={onClose} className="cancel-button">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

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
      rendaFamiliar: "",
      possuiDependentes: false
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
    } else if (name === "possuiDependentes") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.cpf.length !== 11) {
      alert("CPF deve conter 11 dígitos!");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/fomezero/solicitar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          nome: formData.nome,
          cpf: formData.cpf,
          renda_familiar: formData.rendaFamiliar,
          possui_dependentes: formData.possuiDependentes
        })
      });
      const data = await res.json();
      if (data.aprovado) {
        setMostrarConfirmacao(true);
        setTimeout(() => setMostrarConfirmacao(false), 3000);
      } else {
        alert(data.motivo || "Pedido rejeitado.");
      }
    } catch (err) {
      alert("Erro ao enviar pedido. Tente novamente.");
    }
  setFormData({ nome: "", cpf: "", rendaFamiliar: "", possuiDependentes: false });
    setMostrarFormulario(false);
  };

  // Função para abrir o modal de consulta
  const handleAbrirConsulta = () => {
    // Força o CPF do usuário logado para o valor cadastrado
    const userData = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    userData.cpf = "12345678900";
    localStorage.setItem("usuarioLogado", JSON.stringify(userData));
    setMostrarConsulta(true);
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
        <div className="option-cardFzero" onClick={handleAbrirConsulta}>
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
              <div style={{ margin: '10px 0' }}>
                <label>
                  <input
                    type="checkbox"
                    name="possuiDependentes"
                    checked={formData.possuiDependentes}
                    onChange={handleChange}
                  /> Possuo dependentes
                </label>
              </div>
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
        <ConsultaPedidosModal cpf={(JSON.parse(localStorage.getItem("usuarioLogado")) || {}).cpf || ""} onClose={() => setMostrarConsulta(false)} />
      )}
    </div>
  );
};

export default FomeZero;