import React from 'react';
import './navbar.css';

import usePersistedState from '../../hooks/usePersistedState';

const NavBar = () => {
  const [theme, setTheme] = usePersistedState('theme', 'light');
  
  const toggleTheme = () => {
    setTheme((prevState) => {
      const body = document.body;

      const getTheme = {light: 'dark', dark: 'light'};

      body.classList.replace(prevState, getTheme[prevState]);

      return prevState === 'light' ? 'dark' : 'light';
    });
  }

  return (
    <nav className="nav">
      <a href="/" className="logo">
        Dashboard
      </a>
      <div className={`${theme}-plug`} onClick={ toggleTheme }>
      </div>
    </nav>
  )
}

export default NavBar;