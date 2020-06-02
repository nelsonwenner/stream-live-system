import React, { useState, useRef, useMemo, useEffect } from 'react';
import './chat.css';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import Input from './Input/Input';
import io from "socket.io-client";

const Chat = (props) => {
  const { user, room, finishRoom } = props;
  const [chatMessages, setChatMessages] = useState([]);
  const messageRef = useRef();
  
  const socket = useMemo(() => {
    if (!user || user.name === "" || user.email === "") {
      return null;
    }
    return io(`${process.env.REACT_APP_MICRO_CHAT_URL}/room`);
  }, [user]);

  useEffect(() => {
    if (!socket || socket.connected || !user || user.name === "" || user.email === "") {
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
    <div className="card">
      <div className="card-header">
        Chat
      </div>
      <ScrollToBottom className="scroll-message">
        { 
          chatMessages.map((message, key ) => (
            <Message
              key={ key } 
              user_name={ message.user_name }
              email={ message.email }
              content={ message.content }
              is_broadcaster={ message.is_broadcaster }
            />
          ))
        }
      </ScrollToBottom>
      {
        <Input
          name={ user.name }
          email={ user.email }
          messageRef={ messageRef }
          sendMessage={ sendMessage }
        />
      }
    </div>
  )
}

export default Chat;