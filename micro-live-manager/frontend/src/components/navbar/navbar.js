import React, { useState } from 'react';
import './navbar.css';

const NavBar = () => {
  return (
    <nav className="nav">
      <a href="/" className="logo">
        Dashboard
      </a>
      <div className="light-plug">
      </div>
    </nav>
  )
}

export default NavBar;