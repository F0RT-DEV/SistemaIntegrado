import React, { useState } from 'react';
import './ConectSus.css'; // Importando o CSS

const ConectSus = () => {
  const [showModal, setShowModal] = useState(false); // Controla o modal de agendamento
  const [showConsultas, setShowConsultas] = useState(false); // Controla a exibição da lista de consultas
  const [consultas, setConsultas] = useState([]); // Lista de consultas agendadas
  const [nomePaciente, setNomePaciente] = useState(''); // Estado para o nome do paciente
  const [dataConsulta, setDataConsulta] = useState(''); // Estado para a data da consulta
  const [horaConsulta, setHoraConsulta] = useState(''); // Estado para a hora da consulta

  // Função para adicionar uma nova consulta
  const agendarConsulta = () => {
    if (nomePaciente && dataConsulta && horaConsulta) {
      const novaConsulta = {
        id: new Date().getTime(), // ID único baseado no timestamp
        nome: nomePaciente,
        data: dataConsulta,
        hora: horaConsulta,
      };
      setConsultas([...consultas, novaConsulta]); // Adiciona a nova consulta à lista
      setNomePaciente(''); // Limpa o campo do nome
      setDataConsulta(''); // Limpa o campo da data
      setHoraConsulta(''); // Limpa o campo da hora
      setShowModal(false); // Fecha o modal
    } else {
      alert('Preencha todos os campos!'); // Validação simples
    }
  };

  return (
    <div className="system-info">
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

      {/* Modal de agendamento */}
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

      {/* Lista de consultas agendadas */}
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