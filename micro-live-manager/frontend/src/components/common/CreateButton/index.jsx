import React from 'react'
import './styles.css';

const CreateButton = ({ typeBtn, onClick, children, className = '' }) => (
  <div>
    <button type={typeBtn} onClick={onClick} className={`${className}`}>
      {children}
    </button>
  </div>
)

export default CreateButton;