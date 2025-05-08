import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EsqueciSenha.css";

const EsqueciSenha = () => {
  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(true);
  const [mostrarPopup, setMostrarPopup] = useState(false);
  const navigate = useNavigate();

  const handleRecuperacao = () => {
    if (!email) {
      setAlerta("Por favor, insira um e-mail.");
      return;
    }

    console.log("Enviando link para recuperação de senha para o email:", email);

    setAlerta("");
    setMostrarFormulario(false); // Esconde o formulário
    setMostrarPopup(true); // Exibe apenas o pop-up
  };

  return (
    <div className="esqueci-senha-container">
      {/* Se mostrarFormulario for verdadeiro, exibe o formulário */}
      {mostrarFormulario && (
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
      )}

      {/* Se mostrarPopup for verdadeiro, exibe apenas o pop-up */}
      {mostrarPopup && (
        <div className="modal">
          <div className="modal-content">
            <h3>Sucesso!</h3>
            <p>O link de recuperação foi enviado para o email cadastrado.</p>
            <button
              onClick={() => {
                setMostrarPopup(false);
                navigate("/login");
              }}
              className="confirm-button"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EsqueciSenha;