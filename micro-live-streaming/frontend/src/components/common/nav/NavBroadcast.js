import React from 'react';
import './nav-broadcast.css';

const NavBroadcast = ({setOpenDevicesDialog}) => {
  return (
    <header>
      <div className="header">
        <a className="logo">Streaming Broadcast</a>
        
        <ul className="nav">
          <li>stop</li>
          <li>
            <div className="options" onClick={() => (setOpenDevicesDialog(true)) }>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default NavBroadcast;