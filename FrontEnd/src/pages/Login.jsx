import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Arquivo de estilos

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [alerta, setAlerta] = useState("");
  const [sucesso, setSucesso] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    setAlerta(""); // Limpa alertas anteriores
    setSucesso("");
  
    if (!email || !senha) {
      setAlerta("Preencha todos os campos!");
      return;
    }
  
    // Verificar se o usuário existe no localStorage
    const storedUser = JSON.parse(localStorage.getItem("userData"));
  
    // Checar login válido
    if (
      (storedUser && storedUser.email === email && storedUser.senha === senha) ||  // Verifica dados do cadastro
      (email === "admin@email.com" && senha === "123456")  // Verifica admin
    ) {
      setSucesso("Login efetuado com sucesso!");
      setTimeout(() => {
        localStorage.setItem("token", "fake-token-123");
        console.log("Token salvo:", localStorage.getItem("token")); // Simula o token
        login();
        navigate("/educa");
      }, 1100);
    } else {
      setAlerta("E-mail ou senha inválidos!");
    }
  };
      

  return (
    <div className="login-container">
      <div className="login-box">
        {alerta && <div className="alerta">{alerta}</div>}
        {sucesso && <div className="alerta-sucesso">{sucesso}</div>}
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