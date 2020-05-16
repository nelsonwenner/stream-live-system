import React from 'react';
import './list-live.css';

import {format, parseISO} from 'date-fns';

const Listlive = ({ lives }) => {
  return (
    <div className="list">
      {
        lives.map(live => (
          <div className="card" key={live.id}>
            <div className="uuid-live">{live.id}</div>
            <div className="title-live">{live.title}</div>
            <div className="date-live">{ format(parseISO(live.date), 'dd/MM/yyyy HH:mm')}</div>
            <div className="status-live">{live.status}</div>
            <div className="create-link-live"> create live </div>
            <div className="invite-live"> invite </div>
            <div className="circle-status-live" style={{ backgroundColor: live.status === 'pending' ? 'rgb(255, 208, 86)' : 'rgb(117, 194, 130)' }}></div>
          </div>
          )
        )
      }
    </div>
  )
}

export default Listlive;