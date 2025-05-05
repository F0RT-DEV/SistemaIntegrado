import React from "react";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NavBarra.css"; // Importando o CSS para estilização

const NavBarra = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-left">
            <div className="nav-logo">
              <img
                src="https://agenciaamapa.com.br/images/logo_amapa_700.png"
                alt="Bandeira do Amapá"
                onClick={() => navigate("/")} 
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="nav-right">
            <Bell className="icon icon-small" />

            <button
  className="nav-button"
  onClick={() => navigate("/app/perfil")}
  style={{ cursor: "pointer", background: "transparent", border: "none" }}
>
  <User className="icon icon-small" />
</button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarra;
