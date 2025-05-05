import React, { useState, useEffect } from 'react';
import './ConectSus.css';

const ConectSus = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConsultas, setShowConsultas] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [nomePaciente, setNomePaciente] = useState('');
  const [dataHora, setDataHora] = useState('');
  const [medico, setMedico] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const agendarConsulta = () => {
    if (nomePaciente && dataHora && medico && especialidade) {
      const novaConsulta = {
        id: Date.now(),
        nome: nomePaciente,
        dataHora,
        medico,
        especialidade,
      };
      setConsultas([...consultas, novaConsulta]);
      setNomePaciente('');
      setDataHora('');
      setMedico('');
      setEspecialidade('');
      setShowModal(false);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    } else {
      alert('Preencha todos os campos!');
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
          <h4 className="option-title">Agendar Consulta</h4>
          <p className="option-description">Marque uma nova consulta médica</p>
        </div>
        <div className="option-cardCsus" onClick={() => setShowConsultas(!showConsultas)}>
          <h4 className="option-title">Minhas Consultas</h4>
          <p className="option-description">Visualize suas consultas agendadas</p>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nova Consulta</h3>
            <label>Nome do Paciente</label>
            <input
              type="text"
              value={nomePaciente}
              onChange={(e) => setNomePaciente(e.target.value)}
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
          </div>
        </div>
      )}

      {showConsultas && (
        <div className="consultas-list">
          <h3>Consultas Agendadas</h3>
          {consultas.length > 0 ? (
            <ul>
              {consultas.map((consulta) => (
                <li key={consulta.id}>
                  <strong>{consulta.nome}</strong>
                  <div>
                    {new Date(consulta.dataHora).toLocaleDateString()} às {new Date(consulta.dataHora).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div>Médico: {consulta.medico}</div>
                  <div>Especialidade: {consulta.especialidade}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma consulta agendada.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ConectSus;
