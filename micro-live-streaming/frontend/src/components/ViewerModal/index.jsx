import React from 'react';
import './styles.css';

import CustomInput from '../common/CustomInput';
import { useForm } from "react-hook-form";
import Modal from 'react-modal';
import * as yup from 'yup';

Modal.setAppElement('body');

const validationSchema = yup.object().shape({
  name: yup.string().label('Name').required(),
  email: yup.string().label('Email').required(),
});

const ViewerModal = ({open, onClose, errorRequests }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: validationSchema,
  });

  const onSubmit = (data) => { 
    onClose(data);
  }
  
  return (
    <Modal
      isOpen={ open }
      onRequestClose={ onClose }
      contentLabel="Modal"
    > 

      <form onSubmit={ handleSubmit(onSubmit) } className="form-viewer">
        <h1 className="title-view">Access live</h1>
        <div className="container-input">
          <CustomInput
            classs={'width-80 mt-17'}
            type={'text'}
            name={'name'}
            placeholder={'Name'}
            errors={ errors.name }
            register={ register }
          />

          <CustomInput
            classs={'width-80'}
            type={'email'}
            name={'email'}
            placeholder={'Email'}
            errors={ errors.email }
            register={ register }
          />

          <button 
            className="btn btn-rounded btn-outlined black-btn"
          >
            Done
          </button>

          {
            errorRequests && (
              <div className="error-viewer">
                <p style={{color: 'red'}}>
                  { errorRequests.message } { errorRequests.name }
                </p>
              </div>
            )
          }
        </div>
      </form>
    </Modal>
  )
}

export default ViewerModal;