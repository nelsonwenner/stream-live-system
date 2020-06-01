import React, {  } from 'react';
import './chat.css';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import Input from './Input/Input';

const Chat = ({messages}) => {
  return (
    <div className="card">
      <div className="card-header">
        Chat
      </div>
      <ScrollToBottom className="scroll-message">
          {
            messages.map(message => (
              <Message 
                msg={ message }
              />
            ))
          }
      </ScrollToBottom>
      <Input />
    </div>
  )
}

export default Chat;