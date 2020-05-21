import React, { useState, useEffect, useRef, useCallback } from 'react';
import './broadcast.css';

import ContainerVideo from '../../components/container-video/ContainerVideo';
import BroadcastModal from '../../components/BroadcastModal/BroadcastModal';
import DeviceModal from '../../components/DeviceModal/DeviceModal';
import NavBroadcast from '../../components/common/nav/NavBroadcast';
import useBroadcast from '../../hooks/useBroadcast';
import Modal from 'react-modal';

Modal.setAppElement('body');

const Broadcast = (props) => {
  const { slug } = props.match.params;
  const videoRef = useRef(null);
  const [openBroadcasterDialog, setOpenBroadcasterDialog] = useState(false);
  const [openDevicesDialog, setOpenDevicesDialog] = useState(false);

  const [userInfo, setUserInfo] = useState({name: '', email: '', password: '', is_broadcaster: true});
  
  const { live, usersConnected, loadStream } = useBroadcast({start: userInfo.name !== '', liveSlug: slug, videoRef: videoRef });

  useEffect(() => {
    setOpenBroadcasterDialog(live !== null);
  }, [live]);

  const onDevicesChange = useCallback((devices) => {    
    loadStream(devices);
  }, [loadStream]);

  console.log('Users Connected: ', usersConnected);
  return (
    <>
      <NavBroadcast
        setOpenDevicesDialog={ setOpenDevicesDialog }
      />

      <ContainerVideo />

      <DeviceModal 
        open={ openDevicesDialog }
        onChange={ onDevicesChange }
        onClose={ () => (setOpenDevicesDialog(false)) }
      />

      <BroadcastModal
        open={openBroadcasterDialog}
        onClose={(formData) => {
          setUserInfo((prevState) => ({...prevState, ...formData}));
          setOpenBroadcasterDialog(false)
        }}
      />
    </>
  )
}

export default Broadcast;