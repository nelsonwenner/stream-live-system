import React from 'react'
import './create-button.css';

const CreateButton = ({ typeBtn, onClick, children, className = '' }) => (
  <div>
    <button type={typeBtn} onClick={onClick} className={`${className}`}>
      {children}
    </button>
  </div>
)

export default CreateButton;