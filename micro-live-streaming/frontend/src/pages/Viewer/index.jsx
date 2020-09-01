import React, { useState, useEffect, useRef } from 'react';

import ContainerVideo from '../../components/ContainerVideo';
import ViewerModal from '../../components/ViewerModal';
import NavView from '../../components/common/NavBar';
import useViewer from '../../hooks/useViewer';
import Chat from '../../components/Chat';

const Viewer = (props) => {
  const [openUserInfoDialog, setOpenUserInfoDialog] = useState(false);
  const { slug } = props.match.params;
  const videoRefViewer = useRef(null);
    
  const [userInfo, setUserInfo] = useState({
    is_broadcaster: false,
    name: '', 
    email: '', 
  });
  
  const { live, error, usersConnected } = useViewer({
    videoRefViewer: videoRefViewer,
    liveSlug: slug,
    start: true, 
  });

  useEffect(() => {

    if (live !== null && !error && userInfo.name === "") {
      setOpenUserInfoDialog(true);
    }

  }, [live, error, userInfo]);

  const closeViewModal = (formData) => {
    if (live.status !== 'done') {
      setUserInfo((prevState) => ({...prevState, ...formData}));
      setOpenUserInfoDialog(false);
    }
  } 

  return (
    <div className="full-container">
      <NavView 
        titleLogo={ 'Streaming Viewer' }
        isBroadcaster={ false }
      />
      <div className="row">
        <div className="column xlarge-7 large-6 medium-12 small-12 test">
          <ContainerVideo
            live={ live }
            titleVideo={ live.title } 
            videoRef={ videoRefViewer.current }
            countViews={ usersConnected }
          />
        </div>
        <div className="column xlarge-5 large-6 medium-12 small-12 test">
          <Chat 
            user={ userInfo }
            room={ slug }
          />
        </div>
      </div>
      <ViewerModal
        errorRequests={ error }
        open={ openUserInfoDialog }
        onClose={ (formData) => closeViewModal(formData) }
      />
    </div>
  )
}

export default Viewer;