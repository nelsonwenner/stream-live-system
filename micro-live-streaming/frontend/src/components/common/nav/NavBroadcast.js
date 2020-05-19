import React from 'react';
import './nav-broadcast.css';

const NavBroadcast = ({}) => {
  return (
    <header>
      <div className="header">
        <a className="logo">Streaming Broadcast</a>
        
        <ul className="nav">
          <li>stop</li>
          <li>options</li>
        </ul>
      </div>
    </header>
  )
}

export default NavBroadcast;