import React, { Component } from 'react';
import './broadcast.css';

import ContainerVideo from '../../components/container-video/ContainerVideo';
import NavBroadcast from '../../components/nav/NavBroadcast';

class Broadcast extends Component {

  render() {
    return (
      <div>
        <NavBroadcast />
        <ContainerVideo />
      </div>
    )
  }
}

export default Broadcast;