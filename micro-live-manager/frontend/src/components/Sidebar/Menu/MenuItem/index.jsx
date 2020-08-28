import React from 'react';
import './styles.css';

const MenuItem = ({ title, icon}) => {
  return (
    <div className="container-menuitem">
      <span className={`${icon} mt-icon`}/>
      <h1> { title } </h1>
    </div>
  )
}

export default MenuItem;