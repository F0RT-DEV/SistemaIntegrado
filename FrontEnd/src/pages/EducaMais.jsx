import React, { useState } from 'react';
import './FormEducaMais.css';

const EducaMais = () => {
  const [showNewRegistrationModal, setShowNewRegistrationModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [students, setStudents] = useState([{ name: '', birthDate: '', grade: '', cpf: '' }]);

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
    // Limpa o formulário após o envio
    setStudents([{ name: '', birthDate: '', grade: '', cpf: '' }]);
    setShowNewRegistrationModal(false);
  };

  return (
    <div className="system-info">
      <div className="info-box blue">
        <h3 className="info-title blue">Matrícula Escolar</h3>
        <p className="info-description blue">Realize ou acompanhe matrículas no sistema educacional</p>
      </div>
      <div className="options-grid">
        <div className="option-card" onClick={() => setShowNewRegistrationModal(true)}>
          <h4 className="option-title">Nova Matrícula</h4>
          <p className="option-description">Cadastre um novo aluno no sistema</p>
        </div>
        <div className="option-card" onClick={() => setShowConsultModal(true)}>
          <h4 className="option-title">Consultar Matrícula</h4>
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
          <div className="modal-content">
            <h3>Consultar Matrícula</h3>
            <form>
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