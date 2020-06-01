import React from 'react';
import './input.css';

import Avatar from '../Avatar/Avatar';

const Input = ({ sendMessage, messageRef, name, email }) => (
  <form className="form">
    <Avatar
      classes={ 'circle' } 
      email={ email }
    />
    <a className="name-input">{ name }</a>
    <input
      className="input-line"
      type="text"
      ref={ messageRef }
      placeholder="Type a message..."
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
