import React, {useEffect, useState } from 'react';
import './dashboard.css';

import LiveActiveCount from '../../components/common/live-active-count/LiveActiveCount';
import CustomButton from '../../components/common/custom-button/CustomButton';
import SortingBar from '../../components/common/sorting-bar/SortingBar';
import Listlive from '../../components/common/list-live/Listlive';
import Sidebar from '../../components/sidebar/sidebar';
import NavBar from '../../components/navbar/navbar';
import Api from '../../service/Api';
import Modal from 'react-modal';

import NewLiveModal from '../../components/common/new-live-modal/NewLiveModal';

Modal.setAppElement('body');

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [lives, setLives] = useState([]);

  useEffect(() => {
   
    const data = async () => {
      try {
        const { data } = await Api.get('/api/lives');
        setLives(data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    data();
  }, []);

  const openModal = () => {
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
  }

  return (
    <div className="full-container">
      <NavBar />
      <div className="row">
        <div className="column xlarge-2 large-3">
          <Sidebar/>
        </div>
        <div className="column xlarge-10 large-9 medium-12 small-12">
          <span className="hamburger" />
          <div className="main">
            <div className="main-header">
              <LiveActiveCount 
                count={ lives.length } 
              />
              <CustomButton
                onClick={ openModal }
              />
            </div>
            <SortingBar />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;

/*
<Sidebar/>
 <div className="container-dashboard"> 
        <div className="container-live">
          <CustomButton
            onClick={ openModal }
          />
          <LiveActiveCount 
            count={ lives.length } 
          />
        </div>
        <SortingBar/>
        
        <Listlive
          lives={ lives }
        />

        <NewLiveModal 
          openModal={ modal }
          closeModal={ closeModal }
        />
      </div>
 */