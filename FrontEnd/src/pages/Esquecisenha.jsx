import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './EsqueciSenha.css'; // Importando o CSS

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState("");
  const navigate = useNavigate();

  const handleRecuperacao = () => {
    if (!email) {
      setAlerta("Por favor, insira um e-mail.");
      return;
    }

    // Aqui você pode integrar a lógica para enviar um link de recuperação de senha
    console.log("Enviando link para recuperação de senha para o email:", email);

    setAlerta("");
    alert("Link de recuperação de senha enviado para o seu e-mail.");
    navigate("/login"); // Redireciona para a página de login após o envio
  };

  return (
    <div className="esqueci-senha-container">
      <div className="esqueci-senha-box">
        {alerta && <div className="alerta">{alerta}</div>}
        <div className="title">
          <h2>Recuperação de Senha</h2>
        </div>
        <div className="input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="input-email"
          />
        </div>
        <button onClick={handleRecuperacao} className="button-recuperar">
          Enviar Link de Recuperação
        </button>
        <div className="login-redirect">
          <span>Lembrou a senha? </span>
          <button onClick={() => navigate("/login")} className="link-login">
            Faça login
          </button>
        </div>
      </div>
    </div>
  );
};

export default EsqueciSenha;
