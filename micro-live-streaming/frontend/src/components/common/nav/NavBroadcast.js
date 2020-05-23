import React,{ useState } from 'react';
import './nav-broadcast.css';

const NavBroadcast = ({setOpenDevicesDialog}) => {
  const [handlerIcon, setHandlerIcon] = useState('stop-icon');

  return (
    <header>
      <div className="header">
        <a className="logo">Streaming Broadcast</a>

        <ul className="nav">
          <li className={`${handlerIcon}`} onClick={ () => setHandlerIcon(handlerIcon == 'start-icon' ? 'stop-icon' : 'start-icon') }></li>
          <li>
            <div className="options" onClick={ () => setOpenDevicesDialog(true) }>
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