import React,{ useState, useEffect } from 'react';
import './nav.css';

const Nav = ({setOpenDevicesDialog, titleLogo, isBroadcaster, closeLive, stopLive}) => {
  const [handlerIcon, setHandlerIcon] = useState('stop-icon');

  const handleClose = (stop) => {
    setHandlerIcon('start-icon');
    closeLive(stop);
  };

  useEffect(() => {
    const done = "This live has already been held";
  
    if (stopLive && stopLive.message === done) {
      setHandlerIcon('start-icon');
    }

  }, [stopLive]);
  
  return (
    <header>
      <div className="header">
      <a className="logo">{ titleLogo }</a>
        {
          isBroadcaster && (
            <ul className="nav">
              <li className={`${ handlerIcon }`} onClick={ () => handleClose(true) } ></li>
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