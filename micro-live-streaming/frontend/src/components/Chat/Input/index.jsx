import React from 'react';
import './styles.css';

import Avatar from '../Avatar';

const Input = ({ sendMessage, messageRef, name, email }) => (
  <form className="form">
    <Avatar
      classes={ 'circle' } 
      email={ email }
    />
    <p className="name-input">{ name }</p>
    <input
      className="input-line"
      type="text"
      ref={ messageRef }
      placeholder="Type a message, press enter..."
      onKeyPress={event => event.key === 'Enter' ? send(event, sendMessage) : null}
    />
    <span className="send-icon" onClick={ sendMessage }></span>
  </form>
)

const send = (event, sendMessage) => {
  event.preventDefault();
  sendMessage();
}

export default Input;
