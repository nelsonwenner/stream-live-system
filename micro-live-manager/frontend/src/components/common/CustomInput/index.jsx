import React from 'react';
import './styles.css';

const CustomInput = ({classs, type, placeholder, errors, name, register}) => (
  <div className={`${classs}`}>
    <input 
      className={'input-field form-controll' + (errors ? ' is-invalid' : '') }
      type={type}
      placeholder={placeholder}
      ref={register}
      name={name}
    />
    <div className="invalid-feedback">
      { errors && errors.message }
    </div>
  </div>
)

export default CustomInput;