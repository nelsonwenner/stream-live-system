import React, { Component } from 'react';
import './broadcast.css';

import ContainerVideo from '../../components/container-video/ContainerVideo';
import CreateButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import NavBroadcast from '../../components/nav/NavBroadcast';
import { base, getLive } from '../../service/Api';
import Modal from 'react-modal';

import socket from "socket.io-client";
import Peer from "peerjs";


Modal.setAppElement('body');

class Broadcast extends Component {

  constructor() {
    super();

    this.state = {
      modal: true,
      name: '',
      email: '',
      password: '',
      error: '',
      socket: null
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value});
  }
  
  /*
  onSubmit = (event) => {
    event.preventDefault();

    const { name, email, password } = this.state;

    if(!name || !password || !email) {
      this.setState(() => ({ error: 'Fill in all the fields' }));
    } else {
      base.post('/api/lives',)
      .then((res) => {
        
        this.onSubmitClean();

        this.closeModal();

      })
      .catch(() => this.onSubmitFailure());
    }
  }
  */

  onSubmitClean() {
    this.setState({name: '', email: '', password: ''});
  }

  onSubmitFailure() {
    this.setState({ error: "Request Failed" });
  }

  openModal = () => {
    this.setState({modal: true});
  }

  closeModal = () => {
    this.setState({modal: false});
  }

  async componentWillMount() {
    console.log(process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL)
    const currentSocket = socket(`${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/api/live`);
    console.log(currentSocket)
    //this.setState(() => ({socket: currentSocket}));
  }

  broadcast = async () => {

  }

  render() {

    const { name, email, password } =  this.state;
    //console.log('Socket -> ', this.state.socket);
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
                value={name}
                name={'name'}
                onChange={this.handleChange}
              />

              <CustomInput
                classs={'mt-40'}
                type={'text'}
                placeholder={'E-mail'}
                value={email}
                name={'email'}
                onChange={this.handleChange}
              />

              <CustomInput
                classs={'mt-40'}
                type={'password'}
                placeholder={'Password'}
                value={password}
                name={'password'}
                onChange={this.handleChange}
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