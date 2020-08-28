import React from 'react';
import './styles.css';

import MenuItem from './MenuItem';

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