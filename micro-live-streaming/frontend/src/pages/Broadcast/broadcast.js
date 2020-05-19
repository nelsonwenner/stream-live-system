import React, { useState, useEffect } from 'react';
import './broadcast.css';

import ContainerVideo from '../../components/container-video/ContainerVideo';
import BroadcastModal from '../../components/BroadcastModal/BroadcastModal';
import NavBroadcast from '../../components/nav/NavBroadcast';
import useBroadcast from '../../hooks/useBroadcast';
import Modal from 'react-modal';

Modal.setAppElement('body');

const Broadcast = (props) => {
  const { slug } = props.match.params;
  const [openBroadcasterDialog, setOpenBroadcasterDialog] = useState(true);

  const [userInfo, setUserInfo] = useState({name: '', email: '', password: '', is_broadcaster: true});
  
  const { usersConnected } = useBroadcast({start: userInfo.name !== '', liveSlug: slug })

  console.log('Users Connected: ', usersConnected);
  return (
    <>
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