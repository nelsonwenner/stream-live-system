import React, { useState, useEffect, useRef, useCallback } from 'react';
import './viewer.css';

import NavView from '../../components/common/nav/Nav';
import ContainerVideo from '../../components/container-video/ContainerVideo';
import useViewer from '../../hooks/useViewer';

const Viewer = (props) => {
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
  const { slug } = props.match.params;
  const videoRef = useRef();
  
  const [userInfo, setUserInfo] = useState({
  name: '', email: '', is_broadcaster: false});
  
  const { live, error, usersConnected } = useViewer({
  start: true, liveSlug: slug, videoRef: videoRef});
  
  useEffect(() => {

    if (videoRef.current) {
      videoRef.current.play();
    }

  }, [userInfo, videoRef]);

  return (
    <>
      <NavView 
        titleLogo={ 'Streaming Viewer' }
        isBroadcaster={ false }
      />

      <ContainerVideo
        titleVideo={ live.title } 
        videoRef={ videoRef.current }
        countViews={ usersConnected }
      />
      
    </>
  )
}

export default Viewer;