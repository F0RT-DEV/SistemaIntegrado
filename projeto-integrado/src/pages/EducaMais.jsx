import React, { useState } from 'react';
import './FormEducaMais.css';

const EducaMais = () => {
  const [activeForm, setActiveForm] = useState(null); // Controla qual formulário está ativo

  const handleNewRegistrationClick = () => {
    setActiveForm(activeForm === 'newRegistration' ? null : 'newRegistration');
  };

  const handleConsultRegistrationClick = () => {
    setActiveForm(activeForm === 'consultRegistration' ? null : 'consultRegistration');
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
          <form className="registration-form">
            <h4>Formulário de Nova Matrícula</h4>
            <label>
              Nome do Aluno:
              <input type="text" name="studentName" />
            </label>
            <label>
              Nome do Responsável:
              <input type="text" name="responsibleName" />
            </label>
            <label>
              Data de Nascimento:
              <input type="date" name="birthDate" />
            </label>
            <label>
              Série:
              <input type="text" name="grade" />
            </label>
            <button type="submit">Cadastrar</button>
          </form>
        )}

        {activeForm === 'consultRegistration' && (
          <form className="consult-form">
            <h4>Formulário de Consulta de Matrícula</h4>
            <label>
              Número da Matrícula:
              <input type="text" name="registrationNumber" />
            </label>
            <button type="submit">Consultar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EducaMais;