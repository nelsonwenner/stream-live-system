import React from 'react';
import './toolbar.css';

import Menu from '../sidebar/menu/menu';

const Toolbar = () => {
  return (
    <div className="container-toolbar">
      <span className="icon-broadcast"></span>
      <Menu/>
    </div>
  )
}

export default Toolbar;