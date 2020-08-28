import React from 'react';
import './styles.css';

import MenuItem from './menu-item';

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