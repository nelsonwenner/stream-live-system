import React from 'react';
import './styles.css';

import Menu from './menu';

const SideBar = ({ isToolbar }) => {
  return (
    <div className={`sidebar ${ isToolbar ? 'toolbar-open' : ''}` }>
      <span className="icon-broadcast"></span>
      <Menu/>
    </div>
  )
}

export default SideBar;
