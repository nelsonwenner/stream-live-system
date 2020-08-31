import React, { useState } from 'react';
import './styles.css';

const Flag = ({ message }) => {
  const [isActive, setActive] = useState(true);

  return isActive ? (
    <div className="flag" role="alert" >
      <button 
        className="flag-close"
        onClick={() => setActive(false)}
      > 
      <span aria-hidden>×</span>
      </button>
      {message}
      {'😟'}
    </div>
  ) : null;
}

export default Flag;