import React,{ useState, useEffect } from 'react';
import './navbar.css';

const NavBar = ({setOpenDevicesDialog, titleLogo, isBroadcaster, closeLive, stopLive}) => {
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
    <nav className="nav">
      <a href="/" className="logo">{ titleLogo }</a>
      {
        isBroadcaster && (
          <div className="options">
            <div className={ `${handlerIcon}` } onClick={ () => handleClose(true) } >
            </div>
            <div className="ellipsis" onClick={ () => setOpenDevicesDialog(true) } >
            </div>
          </div>
        )
      }
    </nav>
  )
}

export default NavBar;