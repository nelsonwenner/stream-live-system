import React from 'react';
import './styles.css';

import Avatar from '../Avatar';

const Message = ({ user_name, email, content, is_broadcaster }) => {
  return (
    <div className="container-message">
      <Avatar
        email={ email }
      />
      <div className="wrapper-content">
        <span className="text-chat">
          <span className={`name-chat ${is_broadcaster && 'broadcaster'}`}>{ user_name }</span>
          { content }
        </span>
      </div>
    </div>
  )
}

export default Message;