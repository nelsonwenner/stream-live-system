import React from 'react'
import './custom-button.css';

const CustomButton = ({ typeBtn, children, onClick, className = '' }) => (
  <button type={typeBtn} className={`${className}`} onClick={onClick}>
    {children}
  </button>
)

export default CustomButton;