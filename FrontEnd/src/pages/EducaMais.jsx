import React, { useState, useEffect } from 'react';
import './EducaMais.css';

const EducaMais = () => {
  const [showNewRegistrationModal, setShowNewRegistrationModal] = useState(false);
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [students, setStudents] = useState([{ name: '', birthDate: '', grade: '', cpf: '', escola: '', turno: '', isDependente: false }]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showRegistrationConfirmation, setShowRegistrationConfirmation] = useState(false);
  const [showConsultConfirmation, setShowConsultConfirmation] = useState(false);
  const [registrations, setRegistrations] = useState([]);
  const [loadingConsult, setLoadingConsult] = useState(false);
  const [consultError, setConsultError] = useState('');
  // Buscar matrículas do backend ao abrir o modal de consulta
  useEffect(() => {
    if (showConsultModal) {
      setLoadingConsult(true);
      setConsultError('');
  fetch("https://sistemaintegrado.onrender.com/matriculas/educacao", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Erro ao consultar matrículas");
          return res.json();
        })
        .then(data => {
          // Ajusta para o formato esperado pelo frontend
          setRegistrations(Array.isArray(data) ? data : []);
          setLoadingConsult(false);
        })
        .catch(err => {
          setConsultError("Erro ao consultar matrículas. Tente novamente.");
          setLoadingConsult(false);
        });
    }
  }, [showConsultModal]);

  // Mensagem de boas-vindas ao carregar a página
  useEffect(() => {
    setShowWelcome(true);
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Preencher o primeiro aluno com os dados do usuário logado quando o modal abrir
  useEffect(() => {
    if (showNewRegistrationModal) {
      try {
        const userData = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (userData) {
          setStudents([{ 
            name: userData.nome || '', 
            cpf: userData.cpf || '', 
            birthDate: '', 
            grade: '' 
          }]);
        }
      } catch (error) {
        console.error("Erro ao ler dados do usuário:", error);
        setStudents([{ name: '', cpf: '', birthDate: '', grade: '' }]);
      }
    }
  }, [showNewRegistrationModal]);

  const handleAddStudent = () => {
    setStudents([...students, { name: '', birthDate: '', grade: '', cpf: '', escola: '', turno: '', isDependente: false }]);
  };

  const handleStudentChange = (index, field, value) => {
    const updatedStudents = [...students];
    updatedStudents[index][field] = value;
    setStudents(updatedStudents);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Monta o corpo da requisição para cada aluno
    for (const student of students) {
      const body = {
        nome_aluno: student.name,
        cpf_aluno: student.cpf,
        data_nascimento: student.birthDate,
        serie_ano: student.grade,
        escola: student.escola,
        turno: student.turno
      };
      // Se marcado como dependente, pode adicionar lógica extra se necessário
      // Envia a requisição para o backend
      try {
  await fetch("https://sistemaintegrado.onrender.com/matriculas/educacao", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(body)
        });
      } catch (error) {
        console.error("Erro ao cadastrar matrícula:", error);
      }
    }
    // Adiciona os alunos cadastrados ao estado de matrículas
    setRegistrations([...registrations, ...students]);
    // Limpa os campos e fecha o modal
    setStudents([{ name: '', birthDate: '', grade: '', cpf: '', escola: '', turno: '', isDependente: false }]);
    setShowNewRegistrationModal(false);
    // Mensagem de confirmação
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
                    className={student.name ? 'auto-filled' : ''}
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
                  <input
                    type="text"
                    placeholder="Escola"
                    value={student.escola}
                    onChange={(e) => handleStudentChange(index, 'escola', e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Turno"
                    value={student.turno}
                    onChange={(e) => handleStudentChange(index, 'turno', e.target.value)}
                    required
                  />
                  <label style={{ display: 'block', marginTop: '8px' }}>
                    <input
                      type="checkbox"
                      checked={student.isDependente}
                      onChange={(e) => handleStudentChange(index, 'isDependente', e.target.checked)}
                    />{' '}
                    Este aluno é meu dependente
                  </label>
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
            <h3 style={{ textAlign: 'center', marginBottom: '24px' }}>Matrículas Cadastradas</h3>
            {loadingConsult ? (
              <p>Carregando...</p>
            ) : consultError ? (
              <p style={{ color: 'red' }}>{consultError}</p>
            ) : registrations.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {registrations.map((student, index) => (
                  <li key={index} style={{ background: '#f1f1f1', marginBottom: '12px', padding: '14px 20px', borderRadius: '10px', borderLeft: '5px solid #28a745', fontSize: '15px', color: '#444' }}>
                    <strong style={{ display: 'block', fontSize: '16px', color: '#222', fontWeight: 600 }}>{student.nome_aluno || student.name}</strong>
                    <div>CPF: {student.cpf_aluno || student.cpf}</div>
                    <div>Nascimento: {student.data_nascimento || student.birthDate}</div>
                    <div>Série/Ano: {student.serie_ano || student.grade}</div>
                    <div>Escola: {student.escola}</div>
                    <div>Turno: {student.turno}</div>
                    <div>Status: {student.status || 'Em análise'}</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma matrícula cadastrada.</p>
            )}
            <div className="center-button" style={{ textAlign: 'center', marginTop: '18px' }}>
              <button onClick={() => setShowConsultModal(false)} className="cancel-button">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducaMais;
