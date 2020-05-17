import React, { Component } from 'react';
import './broadcast.css';

import ContainerVideo from '../../components/container-video/ContainerVideo';
import CustomInput from '../../components/CustomInput/CustomInput';
import CreateButton from '../../components/CustomButton/CustomButton';
import NavBroadcast from '../../components/nav/NavBroadcast';
import Modal from 'react-modal';

Modal.setAppElement('body');

class Broadcast extends Component {

  constructor() {
    super();

    this.state = {
      modal: true,
      name: '',
      email: '',
      password: ''
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
      <div>
        <NavBroadcast />
        <ContainerVideo />

        <Modal
          isOpen={this.state.modal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal">
        
          <form>
            <div className="container-form">
              <h1 style={{ fontWeight: 800, fontSize: 26, textAlign: 'center' }}>Broadcast live</h1>

              <CustomInput
                classs={'mt-40'}
                type={'text'}
                placeholder={'Name'}
              />

              <CustomInput
                classs={'mt-40'}
                type={'text'}
                placeholder={'E-mail'}
              />

              <CustomInput
                classs={'mt-40'}
                type={'password'}
                placeholder={'Password'}
              />

              <CreateButton
                typeBtn="submit"
                className={'btn btn-outlined purple-btn'}
                children={'Done'}
              />
              
            </div>
          </form>
        </Modal>
      </div>
    )
  }
}

export default Broadcast;