// src/components/LandingPage.jsx
import { Link } from 'react-router-dom';
import {
  Book,
  ShoppingBasket,
  Heart,
  Download,
  Menu,
  ChevronRight,
  MessageSquare,
  Wifi,
  Bell,
  Phone,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import './LandingPage.css';

function LandingPage() {
  const [logado, setLogado] = useState(false);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const scrollToServices = () => {
    scrollToSection('servicos');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLogado(true);
    }
  }, []);
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-container landing-header-content">
          <div className="landing-logo">
            <img
              src="https://amapa.gov.br/images/logo-amapa.png"
              alt="Logo AP"
            />
          </div>

          <nav className="landing-main-nav" aria-label="Navegação principal">
            <button type="button" className="landing-nav-link" onClick={() => scrollToSection('home')}>
              Home
            </button>
            <button type="button" className="landing-nav-link" onClick={() => scrollToSection('servicos')}>
              Serviços
            </button>
            <button type="button" className="landing-nav-link" onClick={() => scrollToSection('sobre')}>
              Sobre
            </button>
            <button type="button" className="landing-nav-link" onClick={() => scrollToSection('ajuda')}>
              Ajuda
            </button>
          </nav>

          <div className="landing-header-buttons">
              {/* <button className="landing-download-button">
                <Download size={20} />
                <span>Baixe o app</span>
              </button> */}
              {logado ? (
                <span className="landing-welcome-message">Bem-vindo de volta!</span>
              ) : (
                <Link to="/login" className="landing-access-button">Acessar</Link>
              )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="landing-hero">
        <div className="landing-container landing-hero-content">
          <div className="landing-hero-text">
            <h1>Todos os serviços do Governo do Amapá em um só lugar</h1>
            <p>
              Educação, saúde e assistência social de forma integrada e
              acessível
            </p>
            <button
              type="button"
              className="landing-cta-button"
              onClick={scrollToServices}
            >
              Explorar serviços
            </button>
          </div>
          <div className="landing-hero-image">
            <img
              src="https://amapa.gov.br/images/logo-amapa.png"
              alt="App Preview"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="landing-services">
        <div className="landing-container">
          <h2>Nossos Serviços</h2>
          <div className="landing-services-grid">
            {/* Educa Mais */}
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

            {/* Fome 0 */}
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

            {/* Conect SUS */}
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

      {/* Features Section */}
      <section id="sobre" className="landing-features bg-gray-100 py-12">
        <div className="landing-container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 border-b-4 border-yellow-500 inline-block">
            Serviços do Governo
          </h2>
          <div className="landing-features-grid grid md:grid-cols-3 gap-8">
            <div className="landing-feature-item bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <Wifi className="landing-feature-icon text-green-700 mb-4 mx-auto" size={48} />
              <h3 className="text-xl font-semibold text-gray-800">
                Acesso Digital
              </h3>
              <p className="text-gray-600">
                Plataforma otimizada para comunidades ribeirinhas com acesso
                remoto via internet ou satélite.
              </p>
            </div>
            <div className="landing-feature-item bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <MessageSquare
                className="landing-feature-icon text-blue-700 mb-4"
                size={48}
              />
              <h3 className="text-xl font-semibold text-gray-800">
                Transparência e Notícias
              </h3>
              <p className="text-gray-600">
                Acompanhe informações atualizadas sobre programas estaduais e
                iniciativas em sua região.
              </p>
            </div>
            <div className="landing-feature-item bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <Bell className="landing-feature-icon text-yellow-600 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800">
                Alertas Oficiais
              </h3>
              <p className="text-gray-600">
                Receba notificações por SMS, e-mail ou pelo aplicativo do
                Governo do Amazonas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="landing-download">
        <div className="landing-container landing-download-content">
          <div className="landing-download-text">
            <span className="landing-eyebrow">Portal digital</span>
            <h2>Acesse tudo em um só lugar</h2>
            <p>
              Educação, saúde, benefícios e informações oficiais com acesso fácil,
              rápido e seguro.
            </p>
            <div className="landing-store-buttons">
              <Link to="/login" className="landing-store-button primary">
                <span>Entrar no portal</span>
              </Link>
              <button
                type="button"
                className="landing-store-button secondary"
                onClick={scrollToServices}
              >
                <span>Ver serviços</span>
              </button>
            </div>
          </div>
          <div className="landing-download-image">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop"
              alt="Acesso ao portal do Governo do Amapá"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="ajuda" className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-grid">
            <div className="landing-footer-column">
              <h3>Serviços</h3>
              <ul>
                <li>
                  <Link to="/app/educa">Educa Mais</Link>
                </li>
                <li>
                  <Link to="/app/fome">Fome 0</Link>
                </li>
                <li>
                  <Link to="/app/sus">Conect SUS</Link>
                </li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <h3>Suporte</h3>
              <ul>
                <li>
                  <button type="button" className="landing-footer-link" onClick={() => scrollToSection('sobre')}>
                    FAQ
                  </button>
                </li>
                <li>
                  <button type="button" className="landing-footer-link" onClick={() => scrollToSection('contato')}>
                    Contato
                  </button>
                </li>
                <li>
                  <button type="button" className="landing-footer-link" onClick={() => scrollToSection('ajuda')}>
                    Ajuda
                  </button>
                </li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <h3>Legal</h3>
              <ul>
                <li>
                  <button type="button" className="landing-footer-link" onClick={() => scrollToSection('sobre')}>
                    Privacidade
                  </button>
                </li>
                <li>
                  <button type="button" className="landing-footer-link" onClick={() => scrollToSection('sobre')}>
                    Termos
                  </button>
                </li>
                <li>
                  <button type="button" className="landing-footer-link" onClick={() => scrollToSection('sobre')}>
                    Segurança
                  </button>
                </li>
              </ul>
            </div>
            <div id="contato" className="landing-footer-column">
              <h3>Contato</h3>
              <div className="landing-contact-phone">
                <Phone size={20} />
                <span>0800 123 4567</span>
              </div>
              <div className="landing-social-icons">
                <Link to="mailto:contato@ap.gov.br">
                  <MessageSquare size={24} />
                </Link>
                <Link to="tel:08001234567">
                  <Bell size={24} />
                </Link>
              </div>
            </div>
          </div>
          <div className="landing-footer-bottom">
            <p>&copy; 2025 Governo AP. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;