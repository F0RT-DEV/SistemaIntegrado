import { API_BASE_URL } from '../services/api';

import React, { useState, useEffect } from 'react';
import './ConectSus.css';

const ConectSus = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConsultas, setShowConsultas] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [consultasError, setConsultasError] = useState('');
  const [nomePaciente, setNomePaciente] = useState('');
  const [cpfPaciente, setCpfPaciente] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [medico, setMedico] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [agendamentoErro, setAgendamentoErro] = useState("");

  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showConsultas) {
      setLoadingConsultas(true);
      setConsultasError("");
      const userData = JSON.parse(localStorage.getItem("usuarioLogado"));
      const token = localStorage.getItem("token");
  fetch(`${API_BASE_URL}/pacientes/consultas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar consultas");
          return res.json();
        })
        .then((data) => {
          const userData = JSON.parse(localStorage.getItem("usuarioLogado"));
          const usuarioIdLogado = userData?.id;
          const filtradas = Array.isArray(data) ? data.filter(c => c.usuario_id === usuarioIdLogado) : [];
          setConsultas(filtradas);
          setLoadingConsultas(false);
        })
        .catch((err) => {
          setConsultasError("Erro ao buscar consultas. Tente novamente.");
          setLoadingConsultas(false);
        });
    }
  }, [showConsultas]);

  const agendarConsulta = async () => {
    setAgendamentoErro("");
    const userData = JSON.parse(localStorage.getItem("usuarioLogado"));
    const usuario_id = userData?.id;
    const consultaData = {
      nome_paciente: nomePaciente,
      cpf_paciente: cpfPaciente,
      usuario_id: usuario_id,
      data_hora: dataHora,
      medico_id: medico,
      especialidade_id: especialidade
    };
    // console.log('[DEBUG] Corpo enviado para agendamento:', consultaData); // Comentado para privacidade
    try {
      //const response = await fetch("https://sistemaintegrado.onrender.com/pacientes/consultas", {
      const response = await fetch(`${API_BASE_URL}/pacientes/consultas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(consultaData)
      });
      if (!response.ok) {
        let errorMsg = "Erro ao agendar consulta. Tente novamente.";
        try {
          const errorData = await response.json();
          if (errorData.mensagem) {
            errorMsg = errorData.mensagem;
            if (errorData.motivo) {
              errorMsg += ` Motivo: ${errorData.motivo}`;
            }
            if (errorData.campos_faltantes) {
              errorMsg += ` Campos faltantes: ${errorData.campos_faltantes.join(", ")}`;
            }
          }
        } catch (err) {
          // Se não conseguir extrair JSON, mantém mensagem padrão
        }
        setAgendamentoErro(errorMsg);
        return;
      }
      await response.json();
      setShowModal(false);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
      setNomePaciente("");
      setDataHora("");
      setMedico("");
      setEspecialidade("");
    } catch (err) {
      setAgendamentoErro("Erro ao agendar consulta. Tente novamente.");
    }
  };

  return (
    <div className="system-info">
      {showWelcome && (
        <div className="welcome-message-top">
          <h2>Seja bem-vindo ao Conect SUS!</h2>
        </div>
      )}

      {showConfirmation && (
        <div className="confirmation-message">
          <h2>Consulta confirmada!</h2>
        </div>
      )}

      <div className="info-box">
        <h3 className="info-title">Conect SUS</h3>
        <p className="info-description">Agende e acompanhe consultas médicas</p>
      </div>

      <div className="options-grid">
  <div className="option-cardCSUS" onClick={() => setShowModal(true)}>
          <h4 className="option-titleAC">Agendar Consulta</h4>
          <p className="option-description">Marque uma nova consulta médica</p>
        </div>
        <div className="option-cardCsus" onClick={() => setShowConsultas(!showConsultas)}>
          <h4 className="option-titleac">Minhas Consultas</h4>
          <p className="option-description">Visualize suas consultas agendadas</p>
        </div>
      </div>

      {showModal && (
        <div className="modalCSUS">
          <div className="modal-contentCSUS">
            <h3>Nova Consulta</h3>
            <label>Nome do Paciente</label>
            <input
              type="text"
              value={nomePaciente}
              onChange={(e) => setNomePaciente(e.target.value)}
            />
            <label>CPF do Paciente</label>
            <input
              type="text"
              value={cpfPaciente}
              onChange={e => setCpfPaciente(e.target.value)}
              maxLength={11}
              placeholder="Digite o CPF do paciente"
            />
            <label>Data e Hora</label>
            <input
              type="datetime-local"
              value={dataHora}
              onChange={(e) => setDataHora(e.target.value)}
            />
            <label>Médico</label>
            <select value={medico} onChange={(e) => setMedico(e.target.value)}>
              <option value="">Selecione um médico</option>
              <option value="Dra. Ana Lima">Dra. Ana Lima</option>
              <option value="Dr. Carlos Souza">Dr. Carlos Souza</option>
              <option value="Dra. Julia Rocha">Dra. Julia Rocha</option>
            </select>
            <label>Especialidade</label>
            <select value={especialidade} onChange={(e) => setEspecialidade(e.target.value)}>
              <option value="">Selecione a especialidade</option>
              <option value="Cardiologia">Cardiologia</option>
              <option value="Clínico Geral">Clínico Geral</option>
              <option value="Pediatria">Pediatria</option>
            </select>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
            <button onClick={agendarConsulta}>Confirmar</button>
            {agendamentoErro && (
              <p style={{ color: 'red', marginTop: '10px' }}>{agendamentoErro}</p>
            )}
          </div>
        </div>
      )}

      {showConsultas && (
        <div className="modalCSUS">
          <div className="modal-contentCSUS consultas-list">
            <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>Consultas Agendadas</h3>
            {loadingConsultas ? (
              <p>Carregando...</p>
            ) : consultasError ? (
              <p style={{ color: 'red' }}>{consultasError}</p>
            ) : consultas.length > 0 ? (
              <>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {consultas.map((consulta, index) => (
                    <li key={consulta.id || index} className="consulta-card">
                      <strong>{consulta.nome_paciente}</strong>
                      <div className="consulta-info">
                        <span>Data/Hora: {consulta.data_hora ? `${new Date(consulta.data_hora).toLocaleDateString()} às ${new Date(consulta.data_hora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : '-'}</span>
                        <span>Médico: {consulta.medico_id}</span>
                        <span>Especialidade: {consulta.especialidade_id}</span>
                        {(!consulta.status || consulta.status === 'Pendente') && (
                          <span className="status-badge-csus pendente">Pendente</span>
                        )}
                        {consulta.status === 'Confirmada' && (
                          <span className="status-badge-csus confirmada">Confirmada</span>
                        )}
                        {consulta.status === 'Cancelada' && (
                          <span className="status-badge-csus cancelada">Cancelada</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Nenhuma consulta agendada.</p>
            )}
            <div className="center-button" style={{ textAlign: 'center', marginTop: '18px' }}>
              <button onClick={() => setShowConsultas(false)} className="cancel-buttonFZ">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConectSus;
