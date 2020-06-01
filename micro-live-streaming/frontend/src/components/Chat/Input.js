import React from 'react';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input-line"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={ setMessage }
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />
    <span className="sendButton" onClick={ sendMessage } />
  </form>
)

export default Input;
