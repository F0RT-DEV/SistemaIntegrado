// Login.jsx (corrigido)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import "./Login.css";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alerta, setAlerta] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlerta("");

    if (!email || !senha) {
      setAlerta("Preencha todos os campos!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.login({ email, senha });

      // Corrigido para salvar com chave correta
      localStorage.setItem("token", response.token);
      localStorage.setItem("userData", JSON.stringify(response.user));

      login();
      navigate("/app/perfil"); // Redireciona para a tela de perfil
    } catch (error) {
      console.error("Erro no login:", error);
      setAlerta(error.message || "E-mail ou senha inválidos!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img 
          src="https://www.portal.ap.gov.br/img/logo_gea.png" 
          alt="Logo GEA" 
          className="login-logo"
        />

        {alerta && <div className="alerta">{alerta}</div>}

        <h2 className="login-title">Login</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            className="login-input"
            required
          />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            className="login-input"
            required
          />

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="cadastro-link">
          <span>Não tem uma conta? </span>
          <button onClick={() => navigate("/cadastro")}>Cadastre-se</button>
        </div>

        <div className="esquecisenha-link">
          <span>Esqueceu sua senha? </span>
          <button onClick={() => navigate("/esqueci-senha")}>Clique aqui</button>
        </div>
      </div>
    </div>
  );
};

export default Login;