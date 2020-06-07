import React from 'react'
import './custom-button.css';

const CustomButton = ({ typeBtn, children, onClick, className = '' }) => (
  <div>
    <button type={typeBtn} className={`${className}`} onClick={onClick}>
      {children}
    </button>
  </div>
  
)

export default CustomButton;