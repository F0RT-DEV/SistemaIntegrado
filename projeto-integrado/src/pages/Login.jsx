import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Arquivo de estilos

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alerta, setAlerta] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !senha) {
      setAlerta("Preencha todos os campos!");
      return;
    }

    // Simulação de autenticação
    if (email === "admin@email.com" && senha === "123456") {
      login();
      navigate("/educa"); // Redireciona para a página principal após o login
    } else {
      setAlerta("E-mail ou senha incorretos!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {alerta && <div className="alerta">{alerta}</div>}
        <h2>Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu e-mail"
          className="login-input"
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Entrar
        </button>
        <div className="cadastro-link">
          <span>Não tem uma conta? </span>
          <button onClick={() => navigate("/cadastro")}>Cadastre-se</button>
        </div>

        <div className="esquecisenha-link">
        <span>Esqueceu seu senha ? </span>
        <button onClick={() => navigate("/esqueci-senha")}>Clique aqui</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
