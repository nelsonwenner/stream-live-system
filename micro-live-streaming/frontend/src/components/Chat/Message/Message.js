import React, {  } from 'react';
import './message.css';

import Avatar from '../Avatar/Avatar';

const Message = ({ name, msg }) => {
  return (
    <div className="container-message">
      <div className="message">
        <Avatar
          classes={ 'circle-avatar' } 
          email={ 'nelsondiasdemedeiros@gmail.com' }
        />
        <a className="name-chat">{ msg }</a>
        <a className="text-chat">{ 'oiiii' }</a>
      </div>
    </div>
  )
}

export default Message;