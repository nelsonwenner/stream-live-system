import React, {  } from 'react';
import './message.css';

const Message = ({msg}) => {
  return (
    <div className="message">
      { msg }
    </div>
  )
}

export default Message;