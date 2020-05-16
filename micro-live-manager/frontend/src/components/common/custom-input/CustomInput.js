import React from 'react';
import './custom-input.css';

const CustomInput = ({classs, type, placeholder, value, name, onChange, error}) => (
    <div>
      <input className={`input-field ${classs}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />

      {
        error && (

          <div className="error">
            <p style={{color: 'red'}}>{ error }</p>
          </div>

        )
      }

    </div>
)

export default CustomInput;