import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import NavBarra from "./components/NavBarra";
import EducaMais from "./pages/EducaMais";
import FomeZero from "./pages/FomeZero";
import ConectSus from "./pages/ConectSus";
import SistemaCard from "./components/SistemaCard";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import EsqueciSenha from "./pages/Esquecisenha"; // Importando a página Esqueci Senha

function MainContent({ isAuthenticated, login }) {
  const location = useLocation();
  const isCadastroPage = location.pathname === "/cadastro" || location.pathname === "/login" || location.pathname === "/esqueci-senha"; // Adicionei a rota /esqueci-senha

  const systems = [
    { id: "educa", name: "Educa Mais", title: "LOGO" },
    { id: "fome", name: "Fome 0", title: "LOGO" },
    { id: "sus", name: "Conect SUS", title: "LOGO" },
  ];

  return (
    <main className="main-content">
      {!isCadastroPage && (
        <div className="systems-grid">
          {systems.map((system) => (
            <SistemaCard key={system.id} system={system} />
          ))}
        </div>
      )}

      <div className={isCadastroPage ? "cadastro-full" : "system-content"}>
        <Routes>
          <Route path="/"/>
          <Route path="/educa" element={<EducaMais />} />
          <Route path="/fome" element={<FomeZero />} />
          <Route path="/sus" element={<ConectSus />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login login={login} />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} /> {/* Adicionando a nova rota */}
        </Routes>
      </div>
    </main>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div className="container">
        <NavBarra />
        <MainContent isAuthenticated={isAuthenticated} login={handleLogin} />
      </div>
    </Router>
  );
}

export default App;
