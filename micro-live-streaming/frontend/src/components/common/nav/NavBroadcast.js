import React from 'react';
import './nav-broadcast.css';

const NavBroadcast = ({setOpenDevicesDialog}) => {
  return (
    <header>
      <div className="header">
        <a className="logo">Streaming Broadcast</a>

        <ul className="nav">
          <li className="stop-icon" onClick={ () => console.log('Stop...') }></li>
          <li onClick={ () => setOpenDevicesDialog(true) }>
            <div className="options">
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