import React, { useState, useEffect } from 'react';
import './ConectSus.css';

const ConectSus = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConsultas, setShowConsultas] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [nomePaciente, setNomePaciente] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [horaConsulta, setHoraConsulta] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); // Novo estado para confirmação

  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const agendarConsulta = () => {
    if (nomePaciente && dataConsulta && horaConsulta) {
      const novaConsulta = {
        id: new Date().getTime(),
        nome: nomePaciente,
        data: dataConsulta,
        hora: horaConsulta,
      };
      setConsultas([...consultas, novaConsulta]);
      setNomePaciente('');
      setDataConsulta('');
      setHoraConsulta('');
      setShowModal(false);
      
      // Mostra a mensagem de confirmação
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

      {/* Mensagem de confirmação de agendamento */}
      {showConfirmation && (
        <div className="confirmation-message">
          <h2>Consulta confirmada!</h2>
        </div>
      )}

      {/* Resto do seu código permanece igual */}
      <div className="info-box">
        <h3 className="info-title">Conect SUS</h3>
        <p className="info-description">Agende e acompanhe consultas médicas</p>
      </div>

      <div className="options-grid">
        <div className="option-card" onClick={() => setShowModal(true)}>
          <h4 className="option-title">Agendar Consulta</h4>
          <p className="option-description">Marque uma nova consulta médica</p>
        </div>
        <div className="option-card" onClick={() => setShowConsultas(!showConsultas)}>
          <h4 className="option-title">Minhas Consultas</h4>
          <p className="option-description">Visualize suas consultas agendadas</p>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Cadastro de Consulta</h3>
            <input
              type="text"
              placeholder="Nome do Paciente"
              value={nomePaciente}
              onChange={(e) => setNomePaciente(e.target.value)}
            />
            <input
              type="date"
              placeholder="Data da Consulta"
              value={dataConsulta}
              onChange={(e) => setDataConsulta(e.target.value)}
            />
            <input
              type="time"
              placeholder="Hora da Consulta"
              value={horaConsulta}
              onChange={(e) => setHoraConsulta(e.target.value)}
            />
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
                  <strong>{consulta.nome}</strong> - {consulta.data} às {consulta.hora}
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