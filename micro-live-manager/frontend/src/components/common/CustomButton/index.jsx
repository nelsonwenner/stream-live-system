import React from 'react';
import './styles.css';

const CustomButton = ({ onClick }) => {
  return (
    <div className="btn-circle" onClick={ onClick }>
      <span className="iconify cruz" data-inline='false' data-icon='mdi-light:plus'></span>
    </div>
  )
}

export default CustomButton;