import {
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { GraduationCap, Apple, Heart } from "lucide-react";
import NavBarra from "./components/NavBarra";
import EducaMais from "./pages/EducaMais";
import FomeZero from "./pages/FomeZero";
import ConectSus from "./pages/ConectSus";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Esquecisenha from "./pages/Esquecisenha";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import PerfilUsuario from "./pages/PerfilUsuario";
import SistemaCard from "./components/SistemaCard";
import "./App.css";


import { useRef } from "react";
function MainContent({ user }) {
  // LOG: Estado do usuário recebido
  console.log('[DEBUG] user recebido em MainContent:', user);
  const location = useLocation();
  const contentRef = useRef(null);

  const systems = [
    { id: "educa", name: "Educa Mais", icon: GraduationCap, color: "blue" },
    { id: "fome", name: "Fome Zero", icon: Apple, color: "green" },
    { id: "sus", name: "Conect SUS", icon: Heart, color: "red" },
  ];

  // Verifica se há campos obrigatórios faltantes
  const camposObrigatorios = ["nome", "cpf", "email", "data_nascimento", "endereco", "numero", "cep", "cidade", "uf", "bairro"];
  // Considera campo faltando se for null, undefined ou string vazia/espacos
  const camposFaltando = camposObrigatorios.filter(campo => {
    const valor = user[campo];
    const faltando = valor === undefined || valor === null || (typeof valor === "string" && valor.trim() === "");
    if (faltando) {
      // LOG: Campo faltando
      console.log(`[DEBUG] Campo faltando: ${campo} | Valor:`, valor);
    }
    return faltando;
  });
  const perfilIncompleto = camposFaltando.length > 0;
  if (perfilIncompleto) {
    console.log('[DEBUG] Campos faltando:', camposFaltando);
  }

  useEffect(() => {
    if (window.innerWidth <= 768 && contentRef.current) {
      setTimeout(() => {
        contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  }, [location.pathname]);

  return (
    <main className="main-content">
      {location.pathname.startsWith("/app") && !location.pathname.startsWith("/app/perfil") && (
        <>
          {perfilIncompleto && (
            <div className="main-alerta-completar" style={{
              background: '#fffbe6',
              border: '1px solid #ffe58f',
              color: '#ad8b00',
              borderRadius: '8px',
              padding: '16px',
              margin: '18px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontWeight: 500,
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              ⚠️ Seu perfil está incompleto. Complete os dados obrigatórios para acessar todos os serviços.
              <a
                href="/app/perfil"
                style={{
                  marginLeft: 'auto',
                  background: 'linear-gradient(90deg,#6c63ff,#4e54c8)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 18px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textDecoration: 'none'
                }}
              >
                Completar Perfil
              </a>
            </div>
          )}
          <section className="services">
            <div className="systems-grid">
              {systems.map((system) => (
                <SistemaCard key={system.id} system={system} perfilIncompleto={perfilIncompleto} />
              ))}
            </div>
          </section>
        </>
      )}

      <div className="system-content-container" ref={contentRef}>
        <Outlet />
      </div>
    </main>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });
  const [user, setUser] = useState(() => {
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    return savedUser || {};
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
    const savedUser = JSON.parse(localStorage.getItem("userData"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Atualiza o estado do usuário sempre que fizer login ou logout
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = JSON.parse(localStorage.getItem("userData"));
      if (savedUser) setUser(savedUser);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    // Garante que o localStorage está sincronizado
    localStorage.setItem("userData", JSON.stringify(userData));
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
      <Route path="/esqueci-senha" element={<Esquecisenha />} />

      {/* App Principal */}
      <Route
        path="/app/*"
        element={
          isAuthenticated ? (
            <div className="app">
              <NavBarra isAuthenticated={isAuthenticated} />
              <MainContent user={user} />
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
        <Route path="perfil" element={<PerfilUsuario user={user} setUser={setUser} />} />
        <Route path="landing" element={<LandingPage />} />
      </Route>

      {/* Redirecionamento Padrão */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


export default App;