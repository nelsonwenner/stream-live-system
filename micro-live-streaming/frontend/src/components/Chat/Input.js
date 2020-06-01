import React from 'react';

import Avatar from './Avatar/Avatar';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <Avatar 
      email={ 'nelsondiasdemedeiros@gmail.com' }
    />
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
