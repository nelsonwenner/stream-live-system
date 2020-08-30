import React, { useState, useEffect, useRef, useCallback } from 'react';

import BroadcasterModal from '../../components/BroadcasterModal';
import ContainerVideo from '../../components/ContainerVideo';
import NavBroadcast from '../../components/common/NavBar';
import DeviceModal from '../../components/DeviceModal';
import useBroadcast from '../../hooks/useBroadcast';
import Chat from '../../components/Chat';

const Broadcaster = (props) => {
  const [openBroadcasterDialog, setOpenBroadcasterDialog] = useState(false);
  const [openDevicesDialog, setOpenDevicesDialog] = useState(false);
  const [finishRoom, setFinishRoom] = useState(false);
  const [stopLive, setStopLive] = useState(false);
  const { slug } = props.match.params;
  const videoRef = useRef(null);
  
  const [userInfo, setUserInfo] = useState({
    name: '', 
    email: '', 
    password: '', 
    is_broadcaster: true
  });
  
  const { isAuth, live, error, usersConnected, loadStream } = useBroadcast({
    start: userInfo.name, 
    stop: stopLive, 
    password: userInfo.password, 
    liveSlug: slug, 
    videoRef: videoRef 
  });
  
  useEffect(() => {

    if (live) {
      setOpenBroadcasterDialog(true);
    }
    
  }, [live]);

  useEffect(() => {
    
    if (isAuth) {
      setOpenBroadcasterDialog(false);
    }
    
  }, [isAuth]);

  const onDevicesChange = useCallback((devices) => {
  
    loadStream(devices);

  }, [loadStream]);

  const closeLive = (stop) => {
    if (stop) {
      setStopLive(true);
      setFinishRoom(true);
    }
  }

  const closeBroadcast = (formData) => {
    if (live.status !== 'done') {
      setUserInfo((prevState) => ({...prevState, ...formData}));
    }
  }
  
  return (
    <div className="full-container">
      <NavBroadcast
        stopLive={ error }
        setOpenDevicesDialog={ setOpenDevicesDialog }
        titleLogo={ 'Streaming Broadcaster' }
        isBroadcaster={ true }
        closeLive={ (stop) => closeLive(stop) }
      />
      <div className="row">
        <div className="column xlarge-7 large-6 medium-12 small-12">
          <ContainerVideo
            live={ live }
            titleVideo={ live.title } 
            videoRef={ videoRef.current }
            countViews={ usersConnected }
          />
        </div>
        <div className="column xlarge-5 large-6 medium-12 small-12">
          <Chat 
            user={ userInfo }
            room={ slug }
            finishRoom={ finishRoom }
          />
        </div>
      </div>
      <DeviceModal 
        open={ openDevicesDialog }
        onChange={ onDevicesChange }
        onClose={ () => (setOpenDevicesDialog(false)) }
      />
      
      <BroadcasterModal
        errorRequests={ error }
        open={ openBroadcasterDialog }
        onClose={ (formData) => closeBroadcast(formData) }
      />
    </div>
  )
}

export default Broadcaster;