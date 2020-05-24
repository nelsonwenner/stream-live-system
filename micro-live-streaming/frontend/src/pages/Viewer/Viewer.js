import React, { useState, useEffect, useRef, useCallback } from 'react';
import './viewer.css';

import NavView from '../../components/common/nav/Nav';
import ContainerVideo from '../../components/container-video/ContainerVideo';

const Viewer = (props) => {
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
  const { slug } = props.match.params;
  const videoRef = useRef();
  
  const [userInfo, setUserInfo] = useState({
    name: '', email: '', is_broadcaster: false}); 
  
  return (
    <>
      <NavView 
        titleLogo={ 'Streaming Viewer' }
        isBroadcaster={ false }
      />

      <ContainerVideo
        titleVideo={ 'Test' } 
        videoRef={ videoRef.current }
        countViews={ 0 }
      />
      
    </>
  )
}

export default Viewer;