import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { GraduationCap, Apple, Heart } from 'lucide-react';
import { useState } from "react";
import NavBarra from "./components/NavBarra";
import EducaMais from "./pages/EducaMais";
import FomeZero from "./pages/FomeZero";
import ConectSus from "./pages/ConectSus";
import SistemaCard from "./components/SistemaCard";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import EsqueciSenha from "./pages/Esquecisenha";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";

function MainContent({ isAuthenticated, login }) {
  const location = useLocation();
  const isAuthPage = false; // Removemos a verificação pois as rotas de auth estão no nível superior

  const systems = [
    { id: 'educa', name: 'Educa Mais', icon: GraduationCap, color: 'blue' },
    { id: 'fome', name: 'Fome 0', icon: Apple, color: 'green' },
    { id: 'sus', name: 'Conect SUS', icon: Heart, color: 'red' }
  ];

  return (
    <main className="main-content">
      {location.pathname.startsWith('/app') && (
        <div className="systems-grid">
          {systems.map((system) => (
            <SistemaCard key={system.id} system={system} />
          ))}
        </div>
      )}

      <div className="system-content">
        <Routes>
          <Route path="/app/educa" element={<EducaMais />} />
          <Route path="/app/fome" element={<FomeZero />} />
          <Route path="/app/sus" element={<ConectSus />} />
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
      <Routes>
        {/* Rota da Landing Page */}
        <Route 
          path="/" 
          element={
            !isAuthenticated ? (
              <LandingPage />
            ) : (
              <Navigate to="/app" replace />
            )
          } 
        />
        
        {/* Rotas de Autenticação (acessíveis sem login) */}
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login login={handleLogin} />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        
        {/* Rotas do Sistema Principal (requerem autenticação) */}
        <Route 
          path="/app/*" 
          element={
            isAuthenticated ? (
              <div className="app-container">
                <NavBarra isAuthenticated={isAuthenticated} />
                <MainContent 
                  isAuthenticated={isAuthenticated} 
                  login={handleLogin} 
                />
                <Footer />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;