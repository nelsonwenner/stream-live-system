import React, {useEffect, useState } from 'react';
import './dashboard.css';

import LiveActiveCount from '../../components/common/live-active-count/LiveActiveCount';
import NewLiveModal from '../../components/common/new-live-modal/NewLiveModal';
import CustomButton from '../../components/common/custom-button/CustomButton';
import TableHeader from '../../components/common/table-header/table-header';
import Backdrop from '../../components/toolbar/backdrop/backdrop';
import Listlive from '../../components/common/list-live/Listlive';
import Sidebar from '../../components/sidebar/sidebar';
import Toolbar from '../../components/toolbar/toolbar';
import NavBar from '../../components/navbar/navbar';
import Api from '../../service/Api';

const Dashboard = () => {
  const [modal, setModal] = useState(false);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
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

  const drawerToolbarHandler = () => {
    setSideDrawerOpen((prevState) => !prevState);
  }

  const backdropClicked = () => {
    setSideDrawerOpen((prevState) => false);
  }

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
        <Toolbar 
          show={ sideDrawerOpen } 
        />
        {
          sideDrawerOpen  && (
            <Backdrop clicked={ backdropClicked } />
          )
        }
        <div className="column xlarge-2 large-3">
          <Sidebar />
        </div>
        <div className="column xlarge-10 large-9 medium-12 small-12">
          <span className="hamburger" 
            onClick={ drawerToolbarHandler } 
          />
          <div className="main">
            <div className="main-header">
              <LiveActiveCount 
                count={ lives.length } 
              />
              <CustomButton
                onClick={ openModal }
              />
            </div>
            <TableHeader />

            <Listlive
              lives={ lives }
            />

            <NewLiveModal 
              openModal={ modal }
              closeModal={ closeModal }
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;