import React, { useState, useRef, useEffect } from "react";
import { Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./NavBarra.css";

const NavBarra = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const toggleNotifications = () => {
    if (!showNotifications) {
      setShowNotifications(true);
      setTimeout(() => {
        setShowNotifications(false);
      }, 1200); // Fecha após 3 segundos
    } else {
      setShowNotifications(false);
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
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

            <div className="profile-wrapper" ref={profileRef}>
              <button
                className="nav-button"
                onClick={toggleProfileMenu}
                style={{ cursor: "pointer", background: "transparent", border: "none" }}
              >
                <User className="icon icon-small" />
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <button onClick={() => { navigate("/app/perfil"); setShowProfileMenu(false); }}>
                    Perfil
                  </button>
                  <button onClick={handleLogout}>Sair</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBarra;
