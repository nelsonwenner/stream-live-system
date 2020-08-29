import React from 'react';
import './styles.css';

import {format, parseISO} from 'date-fns';

const ContainerVideo = ({ videoRef, countViews, titleVideo, live }) => {
  const isDone = live && live.status === 'done';

  if (videoRef) {
    document.getElementById('video')
    .srcObject = videoRef; 
  }
  
  return (
    <div className="video">
      <div className="responsive-video">
        <video 
          width="1000" 
          height="600" 
          id='video' 
          autoPlay 
          muted 
          controls 
        />
      </div>
      <div className="title-video">
        { 
          `${ 
            isDone 
            ? `${titleVideo} made in - ${
              format(parseISO(live.created_at), 
              "dd/MM/yyyy HH:mm")}` 
            : 
            `${titleVideo}` 
          }` 
        } 
      </div>
      <div className="countViews">
        { 
          `${ 
            !isDone 
            ? `Views ${ countViews }` 
            : '' 
            }` 
        }
      </div>
    </div>
  )
}

export default ContainerVideo;
