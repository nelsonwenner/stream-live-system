import React from 'react';
import './container-video.css';

import {format, parseISO} from 'date-fns';

const ContainerVideo = ({ videoRef, countViews, titleVideo, live }) => {

  if (videoRef) {
    const video = document.getElementById('video');
    video.srcObject = videoRef; 
  }
  
  return (
    <div className="video">
      <div className="responsive-video">
        <video width="1000" height="600" id='video' autoPlay muted controls />
      </div>
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
