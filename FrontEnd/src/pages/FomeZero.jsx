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
      // console.log("CPF usado na consulta:", cpfLimpo); // Comentado para privacidade
      if (!cpfLimpo || cpfLimpo.length !== 11) {
        setPedidosModal([]);
        setLoadingModal(false);
        setErrorModal("CPF inválido ou não informado.");
        return;
      }
      setLoadingModal(true);
      setErrorModal("");
      try {
  const res = await fetch(`https://sistemaintegrado.onrender.com/fomezero/pedidos?cpf=${cpfLimpo}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        // console.log("Dados recebidos do backend:", data); // Comentado para privacidade
        setPedidosModal(Array.isArray(data) ? data : []);
      } catch (err) {
        setErrorModal("Erro ao buscar pedidos.");
      }
      setLoadingModal(false);
    }
    fetchPedidos();
  }, [cpf]);

  return (
    <div className="modalFZERO">
      <div className="modal-contentFZERO">
        <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>Pedidos Cadastrados</h3>
        {loadingModal ? (
          <p>Carregando...</p>
        ) : errorModal ? (
          <p style={{ color: 'red' }}>{errorModal}</p>
        ) : pedidosModal.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {pedidosModal.map((pedido, index) => (
              <li key={pedido.id || index} className="pedido-card">
                <strong>{pedido.nome}</strong>
                <div className="pedido-info">
                  <span>CPF: {pedido.cpf}</span>
                  <span>Renda Familiar: {pedido.renda_familiar}</span>
                  {pedido.status === 'Aprovado' && (
                    <span className="status-badge-fz">Aprovado</span>
                  )}
                  {pedido.status === 'Rejeitado' && (
                    <span className="status-badge-fz rejeitado">Rejeitado</span>
                  )}
                  {pedido.status !== 'Aprovado' && pedido.status !== 'Rejeitado' && (
                    <span className="status-badge-fz andamento">Em andamento</span>
                  )}
                  {pedido.status === 'Aprovado' && (
                    <div style={{ color: '#22c55e', marginTop: '8px' }}>{pedido.mensagem}</div>
                  )}
                  {pedido.status === 'Rejeitado' && (
                    <div style={{ color: '#e53935', marginTop: '8px' }}>Pedido rejeitado: {pedido.motivo}</div>
                  )}
                  {pedido.status !== 'Aprovado' && pedido.status !== 'Rejeitado' && (
                    <div style={{ color: '#f59e42', marginTop: '8px' }}>Pedido em andamento</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum pedido encontrado.</p>
        )}
        <div className="center-button" style={{ textAlign: 'center', marginTop: '18px' }}>
          <button onClick={onClose} className="cancel-buttonFZF">
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

  const [jaSolicitouNoMes, setJaSolicitouNoMes] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarBemVindo(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Verifica se já existe solicitação no mês ao carregar a tela
  useEffect(() => {
    async function verificarSolicitacaoMes() {
      const userData = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
      const cpf = userData.cpf;
      if (!cpf || cpf.length !== 11) {
        setJaSolicitouNoMes(false);
        return;
      }
      try {
        const res = await fetch(`https://sistemaintegrado.onrender.com/fomezero/pedidos?cpf=${cpf}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        // console.log("Pedidos encontrados para debug:", data); // Comentado para privacidade
        // Verifica se existe pedido do mês atual
        const agora = new Date();
        const pedidosDoMes = (Array.isArray(data) ? data : []).filter(p => {
          const dataPedido = new Date(p.data);
          const mesmoMes = dataPedido.getMonth() === agora.getMonth();
          const mesmoAno = dataPedido.getFullYear() === agora.getFullYear();
          // console.log(`Pedido:`, p, `Data:`, p.data, `Mês:`, dataPedido.getMonth(), `Ano:`, dataPedido.getFullYear(), `Mesmo mês?`, mesmoMes, `Mesmo ano?`, mesmoAno); // Comentado para privacidade
          return mesmoMes && mesmoAno;
        });
        // console.log("Pedidos do mês atual:", pedidosDoMes); // Comentado para privacidade
        setJaSolicitouNoMes(pedidosDoMes.length > 0);
      } catch (err) {
        // console.log("Erro ao buscar pedidos para debug:", err); // Comentado para privacidade
        setJaSolicitouNoMes(false);
      }
    }
    verificarSolicitacaoMes();
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
    if (name === "possuiDependentes") {
      setFormData({ ...formData, [name]: e.target.checked });
    } else if (name !== "cpf") {
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
      const res = await fetch("https://sistemaintegrado.onrender.com/fomezero/solicitar", {
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
        setFormData({ nome: "", cpf: formData.cpf, rendaFamiliar: "", possuiDependentes: false });
        setMostrarFormulario(false);
        setJaSolicitouNoMes(true); // Bloqueia imediatamente após sucesso
      } else {
        if (data.motivo === 'Só é permitida uma solicitação por mês.') {
          alert('Você já fez uma solicitação este mês. Aguarde o próximo mês para solicitar novamente.');
          setJaSolicitouNoMes(true); // Garante bloqueio se backend retornar restrição
        } else {
          alert(data.motivo || "Pedido rejeitado.");
        }
      }
    } catch (err) {
      alert("Erro ao enviar pedido. Tente novamente.");
    }
  };

  // Função para abrir o modal de consulta
  const handleAbrirConsulta = () => {
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
        <div
          className="option-cardFZERO"
          onClick={() => {
            if (!jaSolicitouNoMes) setMostrarFormulario(true);
          }}
          style={jaSolicitouNoMes ? { cursor: 'not-allowed', opacity: 0.7 } : { cursor: 'pointer' }}
        >
          <h4 className="option-titleFZERO">Nova Solicitação</h4>
          <p className="option-description">Cadastre um novo pedido de cesta básica</p>
          {jaSolicitouNoMes && (
            <p style={{ color: '#e53935', fontWeight: 'bold', marginTop: '8px' }}>
              Você já fez uma solicitação este mês.<br />
              Você poderá fazer uma nova solicitação daqui a um mês novamente!
            </p>
          )}
        </div>
        <div className="option-cardFzero" onClick={handleAbrirConsulta}>
          <h4 className="option-titlefzero">Acompanhar Pedido</h4>
          <p className="option-description">Visualize seu pedido</p>
        </div>
      </div>

      {/* Modal Nova Solicitação */}
      {mostrarFormulario && (
        <div className="modalFZERO">
          <div className="modal-contentFZERO">
            <h3>Nova Solicitação</h3>
            {jaSolicitouNoMes ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <p style={{ color: '#e53935', fontWeight: 'bold', fontSize: '1.1em' }}>
                  Você já fez uma solicitação este mês.<br />
                  Você poderá fazer uma nova solicitação daqui a um mês novamente!
                </p>
                <button type="button" onClick={() => setMostrarFormulario(false)} className="cancel-buttonFZF" style={{ marginTop: '24px' }}>
                  Fechar
                </button>
              </div>
            ) : (
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
                  disabled
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
                <div className="modal-buttons1">
                  <button type="button" onClick={() => setMostrarFormulario(false)} className="cancel-buttonFZF">
                    Cancelar
                  </button>
                  <button type="submit" className="confirm-buttonF">
                    Enviar Pedido
                  </button>
                </div>
              </form>
            )}
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