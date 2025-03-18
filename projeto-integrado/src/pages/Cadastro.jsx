import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css"; // Importação do CSS

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alerta, setAlerta] = useState("");
  const navigate = useNavigate();

  const handleCadastro = () => {
    if (!nome || !cpf || !email || !senha) {
      setAlerta("Todos os campos são obrigatórios!");
      return;
    }

    console.log("Usuário cadastrado:", { nome, cpf, email, senha });

    setAlerta("");
    alert("Cadastro realizado com sucesso!");
    navigate("/");
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-box">
        {alerta && <div className="alerta">{alerta}</div>}
        <div className="cadastro-logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Bandeira_do_Amap%C3%A1.svg/640px-Bandeira_do_Amap%C3%A1.svg.png"
            alt="Logo"
          />
          <h2>Cadastro de Usuário</h2>
        </div>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
          className="cadastro-input"
        />
        <input
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          placeholder="Digite seu CPF"
          className="cadastro-input"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className="cadastro-input"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          className="cadastro-input"
        />
        <button onClick={handleCadastro} className="cadastro-button">
          Cadastrar
        </button>
        <div className="login-link">
          <span>Já tem uma conta? </span>
          <button onClick={() => navigate("/login")}>Faça login</button>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
