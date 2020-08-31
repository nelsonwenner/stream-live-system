import React from 'react';
import './styles.css';

import CustomInput from '../common/CustomInput';
import { useForm } from "react-hook-form";
import Flag from '../common/Flag';
import Modal from 'react-modal';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  name: yup.string().label('Name').required(),
  email: yup.string().label('Email').required(),
  password: yup.string().label('Password').required(),
});

const BroadcasterModal = ({open, onClose, errorRequests}) => {
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
      
      <form onSubmit={ handleSubmit(onSubmit) } className="form-broadcaster">
        <h1 className="title-broadcast">Broadcaster live</h1>
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
            classs={'width-80 mt-17'}
            type={'email'}
            name={'email'}
            placeholder={'Email'}
            errors={ errors.email }
            register={ register }
          />

          <CustomInput
            classs={'width-80'}
            type={'password'}
            name={'password'}
            placeholder={'password'}
            errors={ errors.password }
            register={ register }
          />

          <button 
            className="btn btn-rounded btn-outlined black-btn"
          >
            Done
          </button>
          
          {
            errorRequests 
            ? <Flag message={errorRequests.message} /> 
            : null
          }
        </div>
      </form>
    </Modal>
  )
}

export default BroadcasterModal;
