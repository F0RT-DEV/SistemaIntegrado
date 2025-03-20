import React, { useState } from 'react';
import './FormEducaMais.css'

const EducaMais = () => {
  const [activeForm, setActiveForm] = useState(null); // Controla qual formulário está ativo
  const [students, setStudents] = useState([{ name: '', birthDate: '', grade: '', cpf: '' }]); // Lista de alunos com CPF

  const handleNewRegistrationClick = () => {
    setActiveForm(activeForm === 'newRegistration' ? null : 'newRegistration');
    setStudents([{ name: '', birthDate: '', grade: '', cpf: '' }]); // Reinicia a lista de alunos ao abrir o formulário
  };

  const handleConsultRegistrationClick = () => {
    setActiveForm(activeForm === 'consultRegistration' ? null : 'consultRegistration');
  };

  const handleAddStudent = () => {
    setStudents([...students, { name: '', birthDate: '', grade: '', cpf: '' }]); // Adiciona um novo aluno à lista
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents); // Atualiza os dados de um aluno específico
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Alunos cadastrados:', students); // Exibe os dados no console (substitua por sua lógica de envio)
  };

  return (
    <div className="system-info">
      <div className="info-box blue">
        <h3 className="info-title blue">Matrícula Escolar</h3>
        <p className="info-description blue">Realize ou acompanhe matrículas no sistema educacional</p>
      </div>
      <div className="options-grid">
        <div className="option-card" onClick={handleNewRegistrationClick}>
          <h4 className="option-title">Nova Matrícula</h4>
          <p className="option-description">Cadastre um novo aluno no sistema</p>
        </div>
        <div className="option-card" onClick={handleConsultRegistrationClick}>
          <h4 className="option-title">Consultar Matrícula</h4>
          <p className="option-description">Verifique o status de uma matrícula</p>
        </div>
      </div>

      {/* Container para os formulários */}
      <div className="form-container">
        {activeForm === 'newRegistration' && (
          <form className="registration-form" onSubmit={handleSubmit}>
            <h4>Formulário de Nova Matrícula</h4>
            {students.map((student, index) => (
              <div key={index} className="student-form">
                <h5>Aluno {index + 1}</h5>
                <label>
                  Nome do Aluno:
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => handleStudentChange(index, 'name', e.target.value)}
                    required
                    placeholder="Digite o Nome do aluno"
                  />
                </label>
                <label>
                  CPF do Aluno:
                  <input
                    type="text"
                    value={student.cpf}
                    onChange={(e) => handleStudentChange(index, 'cpf', e.target.value)}
                    required
                    placeholder="Digite o CPF"
                  />
                </label>
                <label>
                  Data de Nascimento:
                  <input
                    type="date"
                    value={student.birthDate}
                    onChange={(e) => handleStudentChange(index, 'birthDate', e.target.value)}
                    required
                  />
                </label>
                <label>
                  Série:
                  <input
                    type="text"
                    value={student.grade}
                    onChange={(e) => handleStudentChange(index, 'grade', e.target.value)}
                    required
                  />
                </label>
              </div>
            ))}
            <button type="button" onClick={handleAddStudent} className="add-student-button">
              Adicionar Aluno
            </button>
            <button type="submit" className="submit-button">
              Cadastrar
            </button>
          </form>
        )}

        {activeForm === 'consultRegistration' && (
          <form className="consult-form">
            <h4>Formulário de Consulta de Matrícula</h4>
            <label>
              Número da Matrícula:
              <input type="text" name="registrationNumber" />
            </label>
            <button type="submit" className="submit-button">Consultar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EducaMais;