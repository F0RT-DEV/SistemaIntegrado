import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="footer-logo">
              <img
                src="https://agenciaamapa.com.br/images/logo_amapa_700.png"
                alt="Bandeira do Amapá"
                onClick={() => navigate("/")} 
                style={{ cursor: "pointer" }}
              />
            </div>

        <div className="footer-section links">
          <h3 className="footer-heading">Links Úteis</h3>
          <ul className="footer-links">
            <li>
              <a href="/educa">Educa Mais</a>
            </li>
            <li>
              <a href="/fome">Fome Zero</a>
            </li>
            <li>
              <a href="/sus">Conect SUS</a>
            </li>
            <li>
              <a href="#">Matrícula Escolar</a>
            </li>
          </ul>
        </div>

        <div className="footer-section contato">
          <h3 className="footer-heading">Contato</h3>
          <p>Rodovia JK, 123 - Macapá/AP</p>
          <p>Email: contato@ap.gov.br</p>
          <p>Telefone: (96) 4009-1234</p>
        </div>
        </div>
      
      <div className="footer-bottom">
        <p>© 2024 Governo do Amapá. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
