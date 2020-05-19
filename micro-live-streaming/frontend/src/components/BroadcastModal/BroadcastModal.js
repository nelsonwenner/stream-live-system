import React, { useState, useEffect } from 'react';
import './broadcast-modal.css';

import CustomButton from '../CustomButton/CustomButton';
import CustomInput from '../CustomInput/CustomInput';

import Modal from 'react-modal';
Modal.setAppElement('body');

const BroadcastModal = ({open, onClose}) => {
 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlerClose = () => {
    onClose({name, email, password});
  }

  return (
    <Modal
      isOpen={ open }
      onRequestClose={ handlerClose }
      contentLabel="Modal">
      
      <form >
        <div className="container-form">
          <h1 style={{ fontWeight: 800, fontSize: 26, textAlign: 'center' }}>Broadcast live</h1>

          <CustomInput
            classs={'mt-40'}
            type={'text'}
            placeholder={'Name'}
            name={'name'}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <CustomInput
            classs={'mt-40'}
            type={'text'}
            placeholder={'E-mail'}
            name={'email'}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <CustomInput
            classs={'mt-40'}
            type={'password'}
            placeholder={'Password'}
            name={'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <CustomButton
            typeBtn="button"
            className={'btn btn-outlined purple-btn'}
            children={'Done'}
            onClick={handlerClose}
          />
        </div>
      </form>
    </Modal>
  )
}

export default BroadcastModal;