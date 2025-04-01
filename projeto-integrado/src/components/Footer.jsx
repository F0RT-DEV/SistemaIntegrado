import React from "react";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img className="footer-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Bandeira_do_Amap%C3%A1.svg/640px-Bandeira_do_Amap%C3%A1.svg.png"
            alt="Bandeira do Amapá"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          />
          <p className="footer-title">Governo do Amapá</p>
        </div>

        <div className="footer-section">
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

        <div className="footer-section">
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
