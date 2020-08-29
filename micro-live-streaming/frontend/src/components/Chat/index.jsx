import React, { useState, useRef, useMemo, useEffect } from 'react';
import './styles.css';

import io from "socket.io-client";
import Message from './Message';
import Input from './Input';

const Chat = (props) => {
  const [chatMessages, setChatMessages] = useState([]);
  const { user, room, finishRoom } = props;
  const messageRef = useRef();
  
  const socket = useMemo(() => {
    if (!user || user.name === "" || user.email === "") {
      return null;
    }
    return io(`${process.env.REACT_APP_MICRO_CHAT_URL}/room`);
  }, [user]);

  useEffect(() => {
    if (user.email === "" || 
        user.name === ""  || 
        socket.connected  || 
        !socket           || 
        !user) {
      return;
    }

    socket.on('connect', () => {
      console.log("Chat connected!");
      
      socket.on('get-messages', (data) => setChatMessages(data));
      socket.on('new-message', (data) => {
        setChatMessages((prevState => [...prevState, data]));
      });

      socket.on('finish-room', () => {
        socket.disconnect();
        window.location.reload(false);
      });

      socket.emit('join', {
        user_name: user.name,
        email: user.email,
        room: room,
        password: user.password
      });
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [socket, room, user]);

  useEffect(() => {
    if (!finishRoom || !socket) {
      return;
    }

    socket.emit('finish-room', {});

    setTimeout(() => {
      socket.disconnect();
    }, 500);

    window.location.reload(false);
  }, [socket, finishRoom]);

  const sendMessage = () => {
    const message = messageRef.current.value;

    if (!user || message === "" || !socket) {
      return;
    }

    socket.emit('send-message', {content: message});

    messageRef.current.value = "";

    setChatMessages(prevState => [
        ...prevState,
        {
          user_name: user.name,
          email: user.email,
          content: message,
          is_broadcaster: user.is_broadcaster
        }
      ]
    );
  }
  
  return (
    <div className="container-chat">
      <div className="card">
        <p className="card-header">
          Chat
        </p>

        <div className="wrapper-message">
          { 
            chatMessages.map((message, index) => (
              <Message
                key={ index } 
                user_name={ message.user_name }
                email={ message.email }
                content={ message.content }
                is_broadcaster={ message.is_broadcaster }
              />
            ))
          }
        </div>
      
        {
          <Input
            name={ user.name }
            email={ user.email }
            messageRef={ messageRef }
            sendMessage={ sendMessage }
          />
        }
      </div>
    </div>
  )
}

export default Chat;