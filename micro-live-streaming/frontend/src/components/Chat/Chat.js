import React, { useState, useRef, useMemo, useEffect } from 'react';
import './chat.css';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';
import Input from './Input/Input';
import io from "socket.io-client";

const Chat = (props) => {
  const { user, room, finishRoom } = props;
  const [chatMessages, setChatMessages] = useState([]);
  const messagesContainerRef = useRef();
  const messageRef = useRef();

  const socket = useMemo(() => {
    if (!user || user.name === "" || user.email === "") {
      return null;
    }
    return io(`${process.env.REACT_APP_MICRO_CHAT_URL}/room`)
  });

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
    }, 500)
  }, [socket, finishRoom]);

  return (
    <div className="card">
      <div className="card-header">
        Chat
      </div>
      <ScrollToBottom className="scroll-message">
        {
          chatMessages.map(message => (
            <Message 
              msg={ message }
            />
          ))
        }
      </ScrollToBottom>
      <Input
        name={ user.name }
        email={ user.email }
      />
    </div>
  )
}

export default Chat;