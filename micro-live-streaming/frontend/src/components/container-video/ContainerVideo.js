import React from 'react';
import './container-video.css';

const ContainerVideo = ({ videoRef }) => {

  if (videoRef) {
    const video = document.getElementById('video');
    video.srcObject = videoRef; 
  }
  
  return (
    <div className="video">
      <video id='video' width='1100px'height='600px' autoPlay muted controls style={{display: 'inline-block', verticalAlign: 'top', marginLeft: 0}} />
    </div>
  )
}

export default ContainerVideo;