import React, { useState } from "react";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NavBarra.css";

const NavBarra = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false); // Estado para controlar se há notificações

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

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
            <div className="notification-wrapper">
              <Bell 
                className={`icon icon-small ${hasNotifications ? 'has-notifications' : ''}`} 
                onClick={toggleNotifications}
                style={{ cursor: "pointer" }}
              />
              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-message">
                    {hasNotifications ? (
                      <div>Você tem novas notificações</div>
                    ) : (
                      <div>Sem notificações</div>
                    )}
                  </div>
                </div>
              )}
            </div>

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