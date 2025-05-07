import React, { useState, useEffect } from 'react';
import './EducaMais.css';

const EducaMais = () => {
  const [showNewRegistrationModal, setShowNewRegistrationModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [students, setStudents] = useState([{ name: '', birthDate: '', grade: '', cpf: '' }]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showRegistrationConfirmation, setShowRegistrationConfirmation] = useState(false);
  const [showConsultConfirmation, setShowConsultConfirmation] = useState(false);

  // Mensagem de boas-vindas ao carregar a página
  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAddStudent = () => {
    setStudents([...students, { name: '', birthDate: '', grade: '', cpf: '' }]);
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Alunos cadastrados:', students);
    setStudents([{ name: '', birthDate: '', grade: '', cpf: '' }]);
    setShowNewRegistrationModal(false);
    
    // Mostra mensagem de confirmação de matrícula
    setShowRegistrationConfirmation(true);
    setTimeout(() => setShowRegistrationConfirmation(false), 3000);
  };

  const handleConsultSubmit = (e) => {
    e.preventDefault();
    setShowConsultModal(false);
    
    // Mostra mensagem de confirmação de consulta
    setShowConsultConfirmation(true);
    setTimeout(() => setShowConsultConfirmation(false), 3000);
  };

  return (
    <div className="system-info">
      {/* Mensagem de boas-vindas */}
      {showWelcome && (
        <div className="welcome-message-top">
          <h2>Seja bem-vindo ao EducaMais!</h2>
        </div>
      )}

      {/* Mensagem de confirmação de matrícula */}
      {showRegistrationConfirmation && (
        <div className="confirmation-message registration">
          <h2>Matrícula realizada com sucesso!</h2>
        </div>
      )}

      {/* Mensagem de confirmação de consulta */}
      {showConsultConfirmation && (
        <div className="confirmation-message consult">
          <h2>Consulta realizada com sucesso!</h2>
        </div>
      )}

      <div className="info-box blue">
        <h3 className="info-title blue">Matrícula Escolar</h3>
        <p className="info-description blue">Realize ou acompanhe matrículas no sistema educacional</p>
      </div>

      <div className="options-grid">
        <div className="option-cardEDM" onClick={() => setShowNewRegistrationModal(true)}>
          <h4 className="option-titleEDM">Nova Matrícula</h4>
          <p className="option-description">Cadastre um novo aluno no sistema</p>
        </div>
        <div className="option-cardEdm" onClick={() => setShowConsultModal(true)}>
          <h4 className="option-titleedm">Consultar Matrícula</h4>
          <p className="option-description">Verifique o status de uma matrícula</p>
        </div>
      </div>

      {/* Modal de Nova Matrícula */}
      {showNewRegistrationModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nova Matrícula</h3>
            <form onSubmit={handleSubmit}>
              {students.map((student, index) => (
                <div key={index} className="student-form">
                  <h5>Aluno {index + 1}</h5>
                  <input
                    type="text"
                    placeholder="Nome do Aluno"
                    value={student.name}
                    onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="CPF do Aluno"
                    value={student.cpf}
                    onChange={(e) => handleStudentChange(index, 'cpf', e.target.value)}
                    required
                  />
                  <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={student.birthDate}
                    onChange={(e) => handleStudentChange(index, 'birthDate', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Série/Ano"
                    value={student.grade}
                    onChange={(e) => handleStudentChange(index, 'grade', e.target.value)}
                    required
                  />
                </div>
              ))}
              <div className="modal-buttons">
                <button type="button" onClick={handleAddStudent} className="add-button">
                  Adicionar Aluno
                </button>
                <button type="button" onClick={() => setShowNewRegistrationModal(false)} className="cancel-button">
                  Cancelar
                </button>
                <button type="submit" className="confirm-button">
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Consulta de Matrícula */}
      {showConsultModal && (
        <div className="modal">
          <div className="modal-contentED">
            <h3>Consultar Matrícula</h3>
            <form onSubmit={handleConsultSubmit}>
              <input
                type="text"
                placeholder="Número da Matrícula ou CPF"
                required
              />
              <div className="modal-buttons">
                <button type="button" onClick={() => setShowConsultModal(false)} className="cancel-button">
                  Cancelar
                </button>
                <button type="submit" className="confirm-button">
                  Consultar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducaMais;