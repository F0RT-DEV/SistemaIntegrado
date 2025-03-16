import React from 'react'
import { Bell, User } from 'lucide-react';

const NavBarra = () => {
  return (
    <nav className="nav">
    <div className="nav-container">
      <div className="nav-content">
        <div className="nav-left">
          <div className="nav-logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Bandeira_do_Amap%C3%A1.svg/640px-Bandeira_do_Amap%C3%A1.svg.png" alt="" />
            <h1>Governo AP</h1>
          </div>
        </div>
        <div className="nav-right">
          <Bell className="icon icon-small" />
          <User className="icon icon-small" />
        </div>
      </div>
    </div>
  </nav>
  )
}

export default NavBarra