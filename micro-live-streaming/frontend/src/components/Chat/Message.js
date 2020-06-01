import React, {  } from 'react';
import './chat.css';

const Message = ({msg}) => {
  return (
    <div className="message">
      { msg }
    </div>
  )
}

export default Message;