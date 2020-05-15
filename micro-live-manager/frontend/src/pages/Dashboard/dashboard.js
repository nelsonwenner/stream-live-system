import React, { Component } from 'react';
import './dashboard.css';

import LiveActiveCount from '../../components/common/live-active-count/LiveActiveCount';
import CustomButton from '../../components/common/custom-button/CustomButton';
import SortingBar from '../../components/common/sorting-bar/SortingBar';
import Sidebar from '../../components/sidebar/sidebar';

class Dashboard extends Component {

  render() {
    
    return (
      
      <div className="container-dashboard"> 
        <Sidebar/>
        <div className="container-live">
          <CustomButton/>

          <LiveActiveCount 
            count={2}
          />

         
        </div>
        
        
        <SortingBar/>
      </div>
    )
  }
}

export default Dashboard;