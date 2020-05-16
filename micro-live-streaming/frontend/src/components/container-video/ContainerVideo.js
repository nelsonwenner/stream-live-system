import React from 'react';
import './container-video.css';

const ContainerVideo = ({}) => {
  return (
    <div className="video">
      <video width='920px'height='500px' autoPlay muted controls style={{display: 'inline-block', verticalAlign: 'top', marginLeft: 0}}>
   
      </video>
    </div>
  )
}

export default ContainerVideo;