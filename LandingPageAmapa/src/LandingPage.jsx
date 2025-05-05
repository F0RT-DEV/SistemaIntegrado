import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ShoppingBasket, Heart, Download, Menu, ChevronRight, MessageSquare, Wifi, Bell, Phone } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <img src="https://images.unsplash.com/photo-1584441405886-bc91be61e56a?w=50&h=50&fit=crop" alt="Logo AP" />
            <span>Governo AP</span>
          </div>

          <nav className="main-nav">
            <Link to="/">Home</Link>
            <Link to="#servicos">Serviços</Link>
            <Link to="#sobre">Sobre</Link>
            <Link to="#ajuda">Ajuda</Link>
          </nav>

          <div className="header-buttons">
            <button className="download-button">
              <Download size={20} />
              <span>Baixe o app</span>
            </button>
            <Link to="/app" className="access-button">
              Acessar
            </Link>
            <button className="menu-button">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Todos os serviços do Governo AP em um só lugar</h1>
            <p>Educação, saúde e assistência social de forma integrada e acessível</p>
            <Link to="/app" className="cta-button">
              Conheça nossos serviços
            </Link>
          </div>
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1556155092-490a1ba16284?w=600&h=400&fit=crop" 
              alt="App Preview" 
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="servicos">
        <div className="container">
          <h2>Nossos Serviços</h2>
          <div className="services-grid">
            {/* Educa Mais */}
            <div className="service-card">
              <div className="service-icon blue">
                <Book size={32} />
              </div>
              <h3>Educa Mais</h3>
              <p>Matrícula escolar e acompanhamento educacional</p>
              <Link to="/app/educa" className="link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </Link>
            </div>

            {/* Fome 0 */}
            <div className="service-card">
              <div className="service-icon green">
                <ShoppingBasket size={32} />
              </div>
              <h3>Fome 0</h3>
              <p>Programa de assistência alimentar</p>
              <Link to="/app/fome" className="link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </Link>
            </div>

            {/* Conect SUS */}
            <div className="service-card">
              <div className="service-icon red">
                <Heart size={32} />
              </div>
              <h3>Conect SUS</h3>
              <p>Agendamento de consultas e serviços de saúde</p>
              <Link to="/app/sus" className="link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="sobre">
        <div className="container">
          <h2>Diferenciais</h2>
          <div className="features-grid">
            <div className="feature-item">
              <Wifi className="feature-icon" size={48} />
              <h3>Recurso Offline</h3>
              <p>Funcionalidade especial para comunidades ribeirinhas</p>
            </div>
            <div className="feature-item">
              <MessageSquare className="feature-icon" size={48} />
              <h3>Integração Total</h3>
              <p>Dados compartilhados entre sistemas para menos burocracia</p>
            </div>
            <div className="feature-item">
              <Bell className="feature-icon" size={48} />
              <h3>Notificações</h3>
              <p>Acompanhe tudo por SMS, e-mail ou no aplicativo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="download">
        <div className="container download-content">
          <div className="download-text">
            <h2>Baixe nosso aplicativo</h2>
            <p>Tenha todos os serviços na palma da sua mão</p>
            <div className="store-buttons">
              <button className="store-button">
                <Download size={24} />
                <span>Google Play</span>
              </button>
              <button className="store-button">
                <Download size={24} />
                <span>App Store</span>
              </button>
            </div>
          </div>
          <div className="download-image">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop" 
              alt="App Preview" 
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="ajuda">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>Serviços</h3>
              <ul>
                <li><Link to="/app/educa">Educa Mais</Link></li>
                <li><Link to="/app/fome">Fome 0</Link></li>
                <li><Link to="/app/sus">Conect SUS</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Suporte</h3>
              <ul>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/contato">Contato</Link></li>
                <li><Link to="/ajuda">Ajuda</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li><Link to="/privacidade">Privacidade</Link></li>
                <li><Link to="/termos">Termos</Link></li>
                <li><Link to="/seguranca">Segurança</Link></li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Contato</h3>
              <div className="contact-phone">
                <Phone size={20} />
                <span>0800 123 4567</span>
              </div>
              <div className="social-icons">
                <a href="#">
                  <MessageSquare size={24} />
                </a>
                <a href="#">
                  <Bell size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Governo AP. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

