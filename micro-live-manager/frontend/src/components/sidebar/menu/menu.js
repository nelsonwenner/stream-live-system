import React from 'react';
import './menu.css';

import MenuItem from './menuitem';

const Menu = () => {
  return (
    <div className="container-menu">
      <MenuItem 
        title={ 'Home' }
        icon={ 'icon-home' }
      />
    </div>
  )
}

export default Menu;