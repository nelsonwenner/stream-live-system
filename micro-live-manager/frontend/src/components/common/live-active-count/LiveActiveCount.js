import React from 'react';
import './live-active-count.css';

const LiveActiveCount = ({ count }) => {
  return (
    <div className="container-lives">
      <h1 className="title">My Lives  <div className="constainer-active">{ count }</div> </h1>
    </div>
  )
}

export default LiveActiveCount;