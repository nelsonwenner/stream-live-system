import React, { useState } from 'react';
import './viewer-modal.css';

import CustomButton from '../common/CustomButton/CustomButton';
import CustomInput from '../common/CustomInput/CustomInput';

import Modal from 'react-modal';
Modal.setAppElement('body');

const ViewerModal = ({open, onClose }) => {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handlerClose = () => {
    if (!name || !email) {
      return setError('Fill in all the fields');
    }

    onClose({name, email});
  }
  
  return (
    <Modal
      isOpen={ open }
      className={"ReactModal__Content_viewer"}
      overlayClassName={"ReactModal__Overlay_viewer"}
      onRequestClose={ handlerClose }
      contentLabel="Modal">
      
      <form >
        <div className="container-form">
          <h1 style={{ fontWeight: 800, fontSize: 26, textAlign: 'center', marginBottom: 19, marginTop: 12 }}>Access live</h1>

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

          {
            error && (
              <div className="error">
                <p style={{color: 'red'}}>{ error }</p>
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

export default ViewerModal;