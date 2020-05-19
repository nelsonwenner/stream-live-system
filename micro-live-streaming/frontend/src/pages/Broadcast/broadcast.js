import React, { useState, useEffect } from 'react';
import './broadcast.css';

import ContainerVideo from '../../components/container-video/ContainerVideo';
import BroadcastModal from '../../components/BroadcastModal/BroadcastModal';
import NavBroadcast from '../../components/nav/NavBroadcast';
import Modal from 'react-modal';

Modal.setAppElement('body');

const Broadcast = () => {
  const [openBroadcasterDialog, setOpenBroadcasterDialog] = useState(true);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
    is_broadcaster: true
  });

  return (
    <>
      {console.log(userInfo)}
      <NavBroadcast />
      <ContainerVideo />

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