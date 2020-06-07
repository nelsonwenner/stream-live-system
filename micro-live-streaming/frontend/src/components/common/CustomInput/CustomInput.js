import React from 'react';
import './custom-input.css';

const CustomInput = ({classs, type, placeholder, value, name, onChange}) => (
  <div>
    <input className={`input-field ${classs}`}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
    />
  </div>
)

export default CustomInput;