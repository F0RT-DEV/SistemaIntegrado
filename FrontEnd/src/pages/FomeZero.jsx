import React, { useState, useEffect } from 'react';
import "./FormeZero.css";

const FomeZero = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const [mostrarBemVindo, setMostrarBemVindo] = useState(true);

  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    rendaFamiliar: "",
    numeroDependentes: "",
    emailDependente: "",
    cpfDependente: "",
    imagem: null,
  });

  useEffect(() => {
    setTimeout(() => {
      setMostrarBemVindo(false);
    }, 3000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagem: e.target.files[0] });
  };

  const validarCPF = (cpf) => {
    cpf = cpf.replace(/[.-]/g, "");
    if (cpf.length !== 11 || !/\d{11}/.test(cpf)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarCPF(formData.cpf) || !validarCPF(formData.cpfDependente)) {
      alert("CPF inválido!");
      return;
    }
    setMostrarFormulario(false);
    setMostrarPopup(true);
  };

  return (
    <div className="system-info">
      {mostrarBemVindo && (
        <div className="welcome-message-top">
            <h2>Bem-vindo ao Programa Fome Zero!</h2>
          </div>
      )}

      <div className="system-info">
        <div className="info-box">
          <h3 className="info-title">Programa Fome Zero</h3>
          <p className="info-description">Solicite ou acompanhe pedidos de cesta básica</p>
        </div>
        <div className="options-grid">
          <div className="option-card" onClick={() => setMostrarFormulario(true)}>
            <h4 className="option-title">Nova Solicitação</h4>
            <p className="option-description">Cadastre um novo pedido de cesta básica</p>
          </div>
        </div>
      </div>

      {mostrarFormulario && (
        <div className="modal">
          <div className="modal-content">
            <h3>Nova Solicitação</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} required />
              <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} required />

              <select name="rendaFamiliar" value={formData.rendaFamiliar} onChange={handleChange} required>
                <option value="">Selecione a Renda Familiar</option>
                <option value="Até 1 salário mínimo">Até 1 salário mínimo</option>
                <option value="De 1 a 2 salários mínimos">De 1 a 2 salários mínimos</option>
                <option value="Acima de 2 salários mínimos">Acima de 2 salários mínimos</option>
              </select>

              <select name="numeroDependentes" value={formData.numeroDependentes} onChange={handleChange} required>
                <option value="">Número de Dependentes</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3 ou mais">3 ou mais</option>
              </select>

              <input type="email" name="emailDependente" placeholder="Email do Dependente" value={formData.emailDependente} onChange={handleChange} required />
              <input type="text" name="cpfDependente" placeholder="CPF do Dependente" value={formData.cpfDependente} onChange={handleChange} required />

              <input type="file" accept="image/*" onChange={handleFileChange} required />

              <div className="modal-buttons">
                <button type="button" onClick={() => setMostrarFormulario(false)} className="cancel-button">Cancelar</button>
                <button type="submit" className="confirm-button">Enviar Pedido</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {mostrarPopup && (
        //<div className="modal">
          <div className="confirmation-message registration">
            <h3>Solicitação Enviada!</h3>
            <p>Seu pedido foi enviado com sucesso. Em breve, você poderá acompanhar o status.</p>
            <button onClick={() => setMostrarPopup(false)} className="confirm-button">Fechar</button>
          </div>
        //</div>
      )}
    </div>
  );
};

export default FomeZero;