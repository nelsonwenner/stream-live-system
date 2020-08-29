import React from 'react';
import './styles.css';

import Avatar from '../Avatar';

const Message = ({ user_name, email, content, is_broadcaster }) => {
  return (
    <div className="container-message">
      <Avatar
        classes={ 'circle-avatar' } 
        email={ email }
      />
      <p className={`name-chat ${is_broadcaster && 'broadcaster'}`}>{ user_name }</p>
      <p className="text-chat">{ content }</p>
    </div>
  )
}

export default Message;