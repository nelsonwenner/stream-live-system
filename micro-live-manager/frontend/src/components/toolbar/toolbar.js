import React from 'react';
import './toolbar.css';

import Menu from '../sidebar/menu/menu';

const Toolbar = (props) => {
  let drawerClasses = 'container-toolbar';

  if (props.show) {
    drawerClasses = 'container-toolbar open';
  }

  return (
    <div className={ drawerClasses }>
      <span className="icon-broadcast"></span>
      <Menu/>
    </div>
  )
}

export default Toolbar;