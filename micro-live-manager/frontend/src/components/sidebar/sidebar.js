import React from 'react';
import './sidebar.css';

import Menu from './menu/menu';

const SideBar = () => {
  return (
    <div className="container-board">
      <span className="icon-broadcast"></span>
      <Menu/>
    </div>
  )
}

export default SideBar;

/**
 *  <Menu/>
 */