import React from 'react';
import './styles.css';

const LiveActiveCount = ({ count }) => {
  return (
    <h1 className="title">My Lives  <div className="constainer-active">{ count }</div> </h1>
  )
}

export default LiveActiveCount;