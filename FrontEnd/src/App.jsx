import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet  // Adicione esta importação
} from "react-router-dom";
import { useState } from "react";
import { GraduationCap, Apple, Heart } from "lucide-react";
import NavBarra from "./components/NavBarra";
import EducaMais from "./pages/EducaMais";
import FomeZero from "./pages/FomeZero";
import ConectSus from "./pages/ConectSus";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import EsqueciSenha from "./pages/Esquecisenha";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import SistemaCard from "./components/SistemaCard";
import "./App.css"; // Adicione o arquivo CSS para estilos globais
function MainContent() {
  const location = useLocation();

  const systems = [
    { id: "educa", name: "Educa Mais", icon: GraduationCap, color: "blue" },
    { id: "fome", name: "Fome 0", icon: Apple, color: "green" },
    { id: "sus", name: "Conect SUS", icon: Heart, color: "red" },
  ];

  return (
    <main className="main-content">
      {location.pathname.startsWith("/app") && (
        <section className="services">
            <div className="systems-grid">
              {systems.map((system) => (
                <SistemaCard key={system.id} system={system} />
              ))}
            </div>
        </section>
      )}

      <div className="system-content-container">
        <Outlet />
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
      <Routes>
        {/* Landing Page */}
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

        {/* Autenticação */}
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login login={handleLogin} />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />

        {/* App Principal */}
        <Route
          path="/app/*"
          element={
            isAuthenticated ? (
              <div className="app">
                <NavBarra isAuthenticated={isAuthenticated} />
                <MainContent />
                <Footer />
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Rotas aninhadas */}
          <Route path="educa" element={<EducaMais />} />
          <Route path="fome" element={<FomeZero />} />
          <Route path="sus" element={<ConectSus />} />
        </Route>

        {/* Redirecionamento Padrão */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
  );
}

export default App;