import React, { useState, useEffect, useRef } from 'react';
import './viewer.css';

import NavView from '../../components/common/nav/Nav';
import ContainerVideo from '../../components/container-video/ContainerVideo';
import useViewer from '../../hooks/useViewer';

const Viewer = (props) => {
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
  const { slug } = props.match.params;
  const videoRefViewer = useRef(null);
  
  const [userInfo, setUserInfo] = useState({
  name: '', email: '', is_broadcaster: false});
  
  const { live, error, usersConnected } = useViewer({
  start: true, liveSlug: slug, videoRefViewer: videoRefViewer});
  
  useEffect(() => {

    if (videoRefViewer.current) {
      videoRefViewer.current.play();
    }

  }, [userInfo, videoRefViewer]);

  return (
    <>
      <NavView 
        titleLogo={ 'Streaming Viewer' }
        isBroadcaster={ false }
      />

      <ContainerVideo
        titleVideo={ live.title } 
        videoRef={ videoRefViewer.current }
        countViews={ usersConnected }
      />
      
    </>
  )
}

export default Viewer;