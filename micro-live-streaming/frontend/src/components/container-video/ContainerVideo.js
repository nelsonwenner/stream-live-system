import React from 'react';
import './container-video.css';

import {format, parseISO} from 'date-fns';

const ContainerVideo = ({ videoRef, countViews, titleVideo, live }) => {
  console.log("oiii -> ", live)
  if (videoRef) {
    const video = document.getElementById('video');
    video.srcObject = videoRef; 
  }
  
  return (
    <div className="video">
      <video id='video' width='1000px'height='600px' autoPlay muted controls style={{display: 'inline-block', verticalAlign: 'top', marginLeft: 0}} />

      {
        live && live.status === 'done'
        ? (
          <>
            <div className="title-video">
              { `${titleVideo} - made in ${format(parseISO(live.created_at), "dd/MM/yyyy HH:mm")}` } 
            </div>
            <div className="countViews">
            </div>
          </>

        ) : (
          <>
            <div className="title-video">
              { titleVideo  }
            </div>
            <div className="countViews">
              Views <a>{ countViews }</a>
            </div>
          </>
        )
      }
    </div>
  )
}

export default ContainerVideo;