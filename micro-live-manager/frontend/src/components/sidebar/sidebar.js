import React from 'react';
import './sidebar.css';

import Menu from './menu/menu';

const SideBar = () => {
  return (
    <div className="container">
      <div className="icon-broadcast mt"></div>
      <h1>Lives</h1>
      <Menu/>
    </div>
  )
}

export default SideBar;