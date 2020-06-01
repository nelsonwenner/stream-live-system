import React from 'react';
import './message.css';

import Avatar from '../Avatar/Avatar';

const Message = ({ user_name, email, content, is_broadcaster }) => {
  return (
    <div className="container-message">
      <div className="message">
        <Avatar
          classes={ 'circle-avatar' } 
          email={ email }
        />
        <a className={`name-chat ${is_broadcaster && 'broadcaster'}`}>{ user_name }</a>
        <a className="text-chat">{ content }</a>
      </div>
    </div>
  )
}

export default Message;