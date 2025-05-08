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
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-container landing-header-content">
          <div className="landing-logo">
            <img
              src="https://www.portal.ap.gov.br/img/logo_gea.png"
              alt="Logo AP"
            />
          </div>

          <nav className="landing-main-nav">
            <Link to="#">Home</Link>
            <Link to="#">Serviços</Link>
            <Link to="#">Sobre</Link>
            <Link to="#">Ajuda</Link>
          </nav>

          <div className="landing-header-buttons">
            <button className="landing-download-button">
              <Download size={20} />
              <span>Baixe o app</span>
            </button>
            <Link to="/app" className="landing-access-button">Acessar</Link>
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
            <h1>Todos os serviços do Governo do Amapá em um só lugar</h1>
            <p>
              Educação, saúde e assistência social de forma integrada e
              acessível
            </p>
            <button className="landing-cta-button">Conheça nossos serviços</button>
          </div>
          <div className="landing-hero-image">
            <img
              src="https://www.portal.ap.gov.br/img/logo_gea.png"
              alt="App Preview"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="landing-services">
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
      <section className="landing-features bg-gray-100 py-12">
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
            <h2>Baixe nosso aplicativo</h2>
            <p>Tenha todos os serviços na palma da sua mão</p>
            <div className="landing-store-buttons">
              <button className="landing-store-button">
                <Download size={24} />
                <span>Google Play</span>
              </button>
              <button className="landing-store-button">
                <Download size={24} />
                <span>App Store</span>
              </button>
            </div>
          </div>
          <div className="landing-download-image">
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=500&fit=crop"
              alt="App Preview"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container">
          <div className="landing-footer-grid">
            <div className="landing-footer-column">
              <h3>Serviços</h3>
              <ul>
                <li>
                  <Link to="#">Educa Mais</Link>
                </li>
                <li>
                  <Link to="#">Fome 0</Link>
                </li>
                <li>
                  <Link to="#">Conect SUS</Link>
                </li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <h3>Suporte</h3>
              <ul>
                <li>
                  <Link to="#">FAQ</Link>
                </li>
                <li>
                  <Link to="#">Contato</Link>
                </li>
                <li>
                  <Link to="#">Ajuda</Link>
                </li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <h3>Legal</h3>
              <ul>
                <li>
                  <Link to="#">Privacidade</Link>
                </li>
                <li>
                  <Link to="#">Termos</Link>
                </li>
                <li>
                  <Link to="#">Segurança</Link>
                </li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <h3>Contato</h3>
              <div className="landing-contact-phone">
                <Phone size={20} />
                <span>0800 123 4567</span>
              </div>
              <div className="landing-social-icons">
                <Link to="#">
                  <MessageSquare size={24} />
                </Link>
                <Link to="#">
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


// import { Link } from 'react-router-dom';
// import { Book, ShoppingBasket, Heart, Download, Menu, ChevronRight, MessageSquare, Wifi, Bell, Phone } from 'lucide-react';
// import './LandingPage.css'; // Arquivo de estilos específico

// function LandingPage() {
//   return (
//     <div className="landing-page">
//       {/* Header */}
//       <header className="landing-header">
//         <div className="landing-container landing-header-content">
//           <div className="logo">
//             <img src="/logo-ap.png" alt="Logo AP" />
//             <span>Governo AP</span>
//           </div>
          
//           <nav className="landing-main-nav">
//             <Link to="/">Home</Link>
//             <Link to="#servicos">Serviços</Link>
//             <Link to="#sobre">Sobre</Link>
//             <Link to="#ajuda">Ajuda</Link>
//           </nav>

//           <div className="landing-header-buttons">
//             <button className="landing-download-button">
//               <Download size={20} />
//               <span>Baixe o app</span>
//             </button>
//             <Link to="/app" className="landing-access-button">
//               Acessar
//             </Link>
//             <button className="landing-menu-button">
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="landing-hero">
//         <div className="landing-container landing-hero-content">
//           <div className="landing-hero-text">
//             <h1>Todos os serviços do Governo AP em um só lugar</h1>
//             <p>Educação, saúde e assistência social de forma integrada e acessível</p>
//             <Link to="/app" className="landing-cta-button">
//               Conheça nossos serviços
//             </Link>
//           </div>
//           <div className="landing-hero-image">
//             <img 
//               src="/hero-image.jpg" 
//               alt="App Preview" 
//             />
//           </div>
//         </div>
//       </section>

//       {/* Services Section */}
//       <section className="landing-services" id="servicos">
//         <div className="landing-container">
//           <h2>Nossos Serviços</h2>
//           <div className="landing-services-grid">
//             <div className="landing-service-card">
//               <div className="landing-service-icon blue">
//                 <Book size={32} />
//               </div>
//               <h3>Educa Mais</h3>
//               <p>Matrícula escolar e acompanhamento educacional</p>
//               <Link to="/app/educa" className="landing-link-button">
//                 <span>Saiba mais</span>
//                 <ChevronRight size={20} />
//               </Link>
//             </div>

//             <div className="landing-service-card">
//               <div className="landing-service-icon green">
//                 <ShoppingBasket size={32} />
//               </div>
//               <h3>Fome 0</h3>
//               <p>Programa de assistência alimentar</p>
//               <Link to="/app/fome" className="landing-link-button">
//                 <span>Saiba mais</span>
//                 <ChevronRight size={20} />
//               </Link>
//             </div>

//             <div className="landing-service-card">
//               <div className="landing-service-icon red">
//                 <Heart size={32} />
//               </div>
//               <h3>Conect SUS</h3>
//               <p>Agendamento de consultas e serviços de saúde</p>
//               <Link to="/app/sus" className="landing-link-button">
//                 <span>Saiba mais</span>
//                 <ChevronRight size={20} />
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer (mantido igual) */}
//       <footer className="landing-footer">
    
//         <div className="landing-container">
//           <div className="landing-footer-grid">
//             <div className="landing-footer-column">
//               <h3>Serviços</h3>
//               <ul>
//                 <li><a href="#">Educa Mais</a></li>
//                 <li><a href="#">Fome 0</a></li>
//                 <li><a href="#">Conect SUS</a></li>
//               </ul>
//             </div>
//             <div className="landing-footer-column">
//               <h3>Suporte</h3>
//               <ul>
//                 <li><a href="#">FAQ</a></li>
//                 <li><a href="#">Contato</a></li>
//                 <li><a href="#">Ajuda</a></li>
//               </ul>
//             </div>
//             <div className="landing-footer-column">
//               <h3>Legal</h3>
//               <ul>
//                 <li><a href="#">Privacidade</a></li>
//                 <li><a href="#">Termos</a></li>
//                 <li><a href="#">Segurança</a></li>
//               </ul>
//             </div>
//             <div className="landing-footer-column">
//               <h3>Contato</h3>
//               <div className="landing-contact-phone">
//                 <Phone size={20} />
//                 <span>0800 123 4567</span>
//               </div>
//               <div className="landing-social-icons">
//                 <a href="#">
//                   <MessageSquare size={24} />
//                 </a>
//                 <a href="#">
//                   <Bell size={24} />
//                 </a>
//               </div>
//             </div>
//           </div>
//           <div className="landing-footer-bottom">
//             <p>&copy; 2025 Governo AP. Todos os direitos reservados.</p>
//           </div>
//         </div>
//         {/* ... conteúdo do footer ... */}
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;