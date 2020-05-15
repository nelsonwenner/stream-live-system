import React, { Component } from 'react';
import './dashboard.css';

import LiveActiveCount from '../../components/common/live-active-count/LiveActiveCount';
import CreateButton from '../../components/common/create-button/CreateButton';
import CustomButton from '../../components/common/custom-button/CustomButton';
import CustomInput from '../../components/common/custom-input/CustomInput';
import SortingBar from '../../components/common/sorting-bar/SortingBar';
import Sidebar from '../../components/sidebar/sidebar';

import Modal from 'react-modal';

Modal.setAppElement('body');

class Dashboard extends Component {

  constructor(){
    super();

    this.state = {
      modal: false
    }
  }

  openModal = () => {
    this.setState({modal: true});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  render() {
    return (
      <>
        <Sidebar/>
        <div className="container-dashboard"> 
          <div className="container-live">
            <CustomButton
              onClick={ this.openModal }
            />
            <LiveActiveCount count={2} />
          </div>
          <SortingBar/>

          <Modal
            isOpen={this.state.modal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal">

            <form>
              <div className="container-form">
                <h1 style={{ fontWeight: 800, fontSize: 26 }}>New live</h1>

                <CustomInput
                  classs={'mt-40'}
                  type={'text'}
                  placeholder={'Title'}
                />

                <CustomInput
                  classs={'mt-40'}
                  type={'text'}
                  placeholder={'Description'}
                />

                <CustomInput
                  classs={'mt-40'}
                  type={'text'}
                  placeholder={'Date DD/MM/AAAA'}
                />

                <CustomInput
                  classs={'mt-40'}
                  type={'password'}
                  placeholder={'Password'}
                />

                <CreateButton
                  className={'btn btn-outlined purple-btn'}
                  children={'Create'}

                />

              </div>
            </form>
          </Modal>
        </div>
      </>
    )
  }
}

export default Dashboard;