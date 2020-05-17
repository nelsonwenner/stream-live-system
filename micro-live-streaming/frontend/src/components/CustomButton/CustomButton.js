import React from 'react'
import './custom-button.css';

const CreateButton = ({ typeBtn, onClick, children, className = '' }) => (
  <button type={typeBtn} onClick={onClick} className={`${className}`}>
    {children}
  </button>
)

export default CreateButton;