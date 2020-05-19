import React, { useState, useEffect } from 'react';
import './broadcast.css';

import ContainerVideo from '../../components/container-video/ContainerVideo';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomInput from '../../components/CustomInput/CustomInput';
import NavBroadcast from '../../components/nav/NavBroadcast';
import Modal from 'react-modal';

Modal.setAppElement('body');

const Broadcast = () => {

  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <NavBroadcast />
      <ContainerVideo />

      <Modal
        isOpen={ openModal }
        onRequestClose={ setOpenModal(true) }
        contentLabel="Example Modal">
        
        <form >
          <div className="container-form">
            <h1 style={{ fontWeight: 800, fontSize: 26, textAlign: 'center' }}>Broadcast live</h1>

            <CustomInput
              classs={'mt-40'}
              type={'text'}
              placeholder={'Name'}
              name={'name'}
            />

            <CustomInput
              classs={'mt-40'}
              type={'text'}
              placeholder={'E-mail'}
              name={'email'}
            />

            <CustomInput
              classs={'mt-40'}
              type={'password'}
              placeholder={'Password'}
              name={'password'}
            />

            <CustomButton
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

export default Broadcast;