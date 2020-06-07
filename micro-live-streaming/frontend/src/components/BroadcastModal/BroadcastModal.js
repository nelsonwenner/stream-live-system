import React, { useState } from 'react';
import './broadcast-modal.css';

import CustomButton from '../common/CustomButton/CustomButton';
import CustomInput from '../common/CustomInput/CustomInput';

import Modal from 'react-modal';
Modal.setAppElement('body');

const BroadcastModal = ({open, onClose, errorRequests}) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlerClose = () => {
    if (!name || !email || !password) {
      return setError('Fill in all the fields');
    }

    onClose({name, email, password});
  }
  
  return (
    <Modal
      isOpen={ open }
      className={"ReactModal__Content_Broadcast"}
      overlayClassName={"ReactModal__Overlay_Broadcast"}
      onRequestClose={ handlerClose }
      contentLabel="Modal">
      
      <form >
        <div className="container-form">
          <h1 style={{ fontWeight: 800, fontSize: 26, textAlign: 'center', marginBottom: 19 }}>Broadcast live</h1>

          <CustomInput
            classs={'mt-40'}
            type={'text'}
            placeholder={'Name'}
            name={'name'}
            value={name}
            onChange={ (event) => setName(event.target.value) }
          />

          <CustomInput
            classs={'mt-40'}
            type={'text'}
            placeholder={'E-mail'}
            name={'email'}
            value={email}
            onChange={ (event) => setEmail(event.target.value) }
          />

          <CustomInput
            classs={'mt-40'}
            type={'password'}
            placeholder={'Password'}
            name={'password'}
            value={password}
            onChange={ (event) => setPassword(event.target.value) }
          />

          {
            error && (errorRequests === null) && (
              <div className="error">
                <p style={{color: 'red'}}>{ error }</p>
              </div>
            )
          }

          {
            errorRequests && (
              <div className="error">
                <p style={{color: 'red'}}>{ errorRequests.message } { errorRequests.name }</p>
              </div>
            )
          }

          <CustomButton
            typeBtn="button"
            className={'btn btn-outlined purple-btn'}
            children={'Done'}
            onClick={ handlerClose }
          />
        </div>
      </form>
    </Modal>
  )
}

export default BroadcastModal;