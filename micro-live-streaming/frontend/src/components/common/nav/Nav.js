import React,{ useState } from 'react';
import './nav.css';

const Nav = ({setOpenDevicesDialog, titleLogo, isBroadcaster}) => {
  const [handlerIcon, setHandlerIcon] = useState('stop-icon');

  return (
    <header>
      <div className="header">
      <a className="logo">{ titleLogo }</a>
        {
          isBroadcaster && (
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
          )
        }
      </div>
    </header>
  )
}

export default Nav;