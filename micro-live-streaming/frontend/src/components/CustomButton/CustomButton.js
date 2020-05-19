import React from 'react'
import './custom-button.css';

const CreateButton = ({ typeBtn, children, className = '' }) => (
  <button type={typeBtn} className={`${className}`}>
    {children}
  </button>
)

export default CreateButton;