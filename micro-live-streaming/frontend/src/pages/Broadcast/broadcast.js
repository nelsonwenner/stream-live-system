import React, { useState, useEffect, useRef, useCallback } from 'react';
import './broadcast.css';

import ContainerVideo from '../../components/container-video/ContainerVideo';
import BroadcastModal from '../../components/BroadcastModal/BroadcastModal';
import DeviceModal from '../../components/DeviceModal/DeviceModal';
import NavBroadcast from '../../components/common/nav/Nav';
import useBroadcast from '../../hooks/useBroadcast';
import Chat from '../../components/Chat/Chat';
import Modal from 'react-modal';

Modal.setAppElement('body');

const Broadcast = (props) => {
  const { slug } = props.match.params;
  const videoRef = useRef(null);
  const [openBroadcasterDialog, setOpenBroadcasterDialog] = useState(false);
  const [openDevicesDialog, setOpenDevicesDialog] = useState(false);
  const [finishRoom, setFinishRoom] = useState(false);

  const [stopLive, setStopLive] = useState(false);

  const [userInfo, setUserInfo] = useState({
  name: '', email: '', password: '', is_broadcaster: true});
  
  const { isAuth, live, error, usersConnected, loadStream } = useBroadcast({
  start: userInfo.name !== '', stop: stopLive, password: userInfo.password, 
  liveSlug: slug, videoRef: videoRef });
  
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

  return (
    <>
      <NavBroadcast
        stopLive={ error }
        setOpenDevicesDialog={ setOpenDevicesDialog }
        titleLogo={ 'Streaming Broadcaster' }
        isBroadcaster={ true }
        closeLive={ (stop) => {

          if (stop) {
            setStopLive(true);
          }

        }}
      />

      <ContainerVideo
        titleVideo={ live.title } 
        videoRef={ videoRef.current }
        countViews={ usersConnected }
      />

      <Chat 
        user={ userInfo }
        room={ slug }
        finishRoom={ finishRoom }
      />

      <DeviceModal 
        open={ openDevicesDialog }
        onChange={ onDevicesChange }
        onClose={ () => (setOpenDevicesDialog(false)) }
      />

      <BroadcastModal
        errorRequests={ error }
        open={ openBroadcasterDialog }
        onClose={ (formData) => {
          setUserInfo((prevState) => ({...prevState, ...formData}));
        }}
      />
    </>
  )
}

export default Broadcast;