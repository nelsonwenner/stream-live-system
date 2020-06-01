import React from 'react';
import './input.css';

import Avatar from '../Avatar/Avatar';

const Input = ({ setMessage, sendMessage, message, name, email }) => (
  <form className="form">
    <Avatar
      classes={ 'circle' } 
      email={ email }
    />
    <a className="name-input">{ name }</a>
    <input
      className="input-line"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={ setMessage }
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <span className="send-icon" onClick={ sendMessage }></span>
  </form>
)

export default Input;
