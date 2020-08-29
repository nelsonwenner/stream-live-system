import React, { useState } from 'react';
import './viewer-modal.css';

import CustomInput from '../common/CustomInput';

import Modal from 'react-modal';
Modal.setAppElement('body');

const ViewerModal = ({open, onClose, errorRequests }) => {
  
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
      className={"ReactModal__Content_Viewer"}
      overlayClassName={"ReactModal__Overlay_Viewer"}
      onRequestClose={ handlerClose }
      style={ style }
      contentLabel="Modal">
      
      <form >
        <div className="container-form">
          <h1 className="title-view-modal">Access live</h1>

      
          {
            error && (errorRequests === null) && (
              <div className="error-view">
                <p style={{color: 'red'}}>{ error }</p>
              </div>
            )
          }

          {
            errorRequests && (
              <div className="error-view">
                <p style={{color: 'red'}}>{ errorRequests.message } { errorRequests.name }</p>
              </div>
            )
          }
        </div>
      </form>
    </Modal>
  )
}

const style = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px'
  }
}

export default ViewerModal;