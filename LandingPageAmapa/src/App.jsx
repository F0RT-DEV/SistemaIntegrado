import React from "react";
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
} from "lucide-react";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <img
              src="https://www.portal.ap.gov.br/img/logo_gea.png"
              alt="Logo AP"
            />
            
          </div>

          <nav className="main-nav">
            <a href="#">Home</a>
            <a href="#">Serviços</a>
            <a href="#">Sobre</a>
            <a href="#">Ajuda</a>
          </nav>

          <div className="header-buttons">
            <button className="download-button">
              <Download size={20} />
              <span>Baixe o app</span>
            </button>
            <button className="access-button">Acessar</button>
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
            <h1>Todos os serviços do Governo do Amapá em um só lugar</h1>
            <p>
              Educação, saúde e assistência social de forma integrada e
              acessível
            </p>
            <button className="cta-button">Conheça nossos serviços</button>
          </div>
          <div className="hero-image">
            <img
              src="https://www.portal.ap.gov.br/img/logo_gea.png"
              alt="App Preview"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
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
              <button className="link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Fome 0 */}
            <div className="service-card">
              <div className="service-icon green">
                <ShoppingBasket size={32} />
              </div>
              <h3>Fome 0</h3>
              <p>Programa de assistência alimentar</p>
              <button className="link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Conect SUS */}
            <div className="service-card">
              <div className="service-icon red">
                <Heart size={32} />
              </div>
              <h3>Conect SUS</h3>
              <p>Agendamento de consultas e serviços de saúde</p>
              <button className="link-button">
                <span>Saiba mais</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Serviços - Governo do Estado do Amazonas */}
      <section className="features bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 border-b-4 border-yellow-500 inline-block">
            Serviços do Governo
          </h2>
          <div className="features-grid grid md:grid-cols-3 gap-8">
            <div className="feature-item bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <Wifi className="feature-icon text-green-700 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-800">
                Acesso Digital
              </h3>
              <p className="text-gray-600">
                Plataforma otimizada para comunidades ribeirinhas com acesso
                remoto via internet ou satélite.
              </p>
            </div>
            <div className="feature-item bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <MessageSquare
                className="feature-icon text-blue-700 mb-4"
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
            <div className="feature-item bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <Bell className="feature-icon text-yellow-600 mb-4" size={48} />
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
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>Serviços</h3>
              <ul>
                <li>
                  <a href="#">Educa Mais</a>
                </li>
                <li>
                  <a href="#">Fome 0</a>
                </li>
                <li>
                  <a href="#">Conect SUS</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Suporte</h3>
              <ul>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Contato</a>
                </li>
                <li>
                  <a href="#">Ajuda</a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li>
                  <a href="#">Privacidade</a>
                </li>
                <li>
                  <a href="#">Termos</a>
                </li>
                <li>
                  <a href="#">Segurança</a>
                </li>
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
