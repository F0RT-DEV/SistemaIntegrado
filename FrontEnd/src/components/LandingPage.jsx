// src/components/LandingPage.jsx
import { Link } from 'react-router-dom';
import { Book, ShoppingBasket, Heart, Download, Menu, ChevronRight, MessageSquare, Wifi, Bell, Phone } from 'lucide-react';
import './LandingPage.css'; // Arquivo de estilos específico

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-container landing-header-content">
          <div className="logo">
            <img src="/logo-ap.png" alt="Logo AP" />
            <span>Governo AP</span>
          </div>
          
          <nav className="landing-main-nav">
            <Link to="/">Home</Link>
            <Link to="#servicos">Serviços</Link>
            <Link to="#sobre">Sobre</Link>
            <Link to="#ajuda">Ajuda</Link>
          </nav>

          <div className="landing-header-buttons">
            <button className="landing-download-button">
              <Download size={20} />
              <span>Baixe o app</span>
            </button>
            <Link to="/app" className="landing-access-button">
              Acessar
            </Link>
            <button className="landing-menu-button">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-container landing-hero-content">
          <div className="landing-hero-text">
            <h1>Todos os serviços do Governo AP em um só lugar</h1>
            <p>Educação, saúde e assistência social de forma integrada e acessível</p>
            <Link to="/app" className="landing-cta-button">
              Conheça nossos serviços
            </Link>
          </div>
          <div className="landing-hero-image">
            <img 
              src="/hero-image.jpg" 
              alt="App Preview" 
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="landing-services" id="servicos">
        <div className="landing-container">
          <h2>Nossos Serviços</h2>
          <div className="landing-services-grid">
            <div className="landing-service-card">
              <div className="landing-service-icon blue">
                <Book size={32} />
              </div>
              <h3>Educa Mais</h3>
              <p>Matrícula escolar e acompanhamento educacional</p>
              <Link to="/app/educa" className="landing-link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </Link>
            </div>

            <div className="landing-service-card">
              <div className="landing-service-icon green">
                <ShoppingBasket size={32} />
              </div>
              <h3>Fome 0</h3>
              <p>Programa de assistência alimentar</p>
              <Link to="/app/fome" className="landing-link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </Link>
            </div>

            <div className="landing-service-card">
              <div className="landing-service-icon red">
                <Heart size={32} />
              </div>
              <h3>Conect SUS</h3>
              <p>Agendamento de consultas e serviços de saúde</p>
              <Link to="/app/sus" className="landing-link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (mantido igual) */}
      <footer className="landing-footer">
    
        <div className="landing-container">
          <div className="landing-footer-grid">
            <div className="landing-footer-column">
              <h3>Serviços</h3>
              <ul>
                <li><a href="#">Educa Mais</a></li>
                <li><a href="#">Fome 0</a></li>
                <li><a href="#">Conect SUS</a></li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <h3>Suporte</h3>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">Ajuda</a></li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <h3>Legal</h3>
              <ul>
                <li><a href="#">Privacidade</a></li>
                <li><a href="#">Termos</a></li>
                <li><a href="#">Segurança</a></li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <h3>Contato</h3>
              <div className="landing-contact-phone">
                <Phone size={20} />
                <span>0800 123 4567</span>
              </div>
              <div className="landing-social-icons">
                <a href="#">
                  <MessageSquare size={24} />
                </a>
                <a href="#">
                  <Bell size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="landing-footer-bottom">
            <p>&copy; 2025 Governo AP. Todos os direitos reservados.</p>
          </div>
        </div>
        {/* ... conteúdo do footer ... */}
      </footer>
    </div>
  );
}

export default LandingPage;