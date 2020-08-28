import React from 'react';
import './styles.css';

import {format, parseISO} from 'date-fns';

const Listlive = ({ lives }) => {
  return (
    <div>
      {
        lives.map((live, index) => (
          <div className="card" key={index}>
            <div className="uuid-live" data-label="UUID">{live.id}</div>
            <div className="title-live" data-label="TITLE">{live.title}</div>
            <div className="date-live" data-label="DATE" >{ format(parseISO(live.created_at), 'dd/MM/yyyy HH:mm')}</div>
            <div className="create-link-live" data-label="CREATE LIVE"> <a target="_blank" rel="noopener noreferrer" href={`http://localhost:4000/broadcast/${live.slug}`}>create live</a> </div>
            <div className="invite-live" data-label="INVITE"> <a target="_blank" rel="noopener noreferrer" href={`http://localhost:4000/viewer/${live.slug}`}>invite</a> </div>
            <div className="status-live" data-label="STATUS">
              <div className="circle-status-live" style={{ backgroundColor: live.status === 'pending' ? 'rgb(255, 208, 86)' : 'red' }}></div>
            </div>
          </div>
          )
        )
      }
    </div>
  )
}

export default Listlive;