import React from 'react';
import './styles.css';

import redirect from '../../../routes/redirect';
import { useForm } from "react-hook-form";
import CustomInput from '../CustomInput';
import Api from '../../../service/Api';
import Modal from 'react-modal';
import * as yup from 'yup';

Modal.setAppElement('body');

const validationSchema = yup.object().shape({
  title: yup.string().label('Title').required(),
  description: yup.string().label('Description').required(),
  date: yup.string().label('Date').required(),
  password: yup.string().label('Password').required(),
});

const NewLiveModal = ({ openModal, closeModal }) => {
  const { register, handleSubmit, errors } = useForm({
    validationSchema: validationSchema,
  });

  const onSubmit = (data) => {
    Api.post('/api/lives', data)
    .then((res) => {
      redirect('/');
    });
  }

  return (
    <Modal
      isOpen={ openModal }
      onRequestClose={ closeModal }
      contentLabel="Example Modal">
      
      <form onSubmit={ handleSubmit(onSubmit) } className="form-new-live">
        <h1 className="title-modal">New live</h1>
        <div className="container-input">
          <CustomInput
            classs={ 'width-80 mt-25' }
            type={ 'text' }
            name={ 'title' }
            placeholder={ 'Title' }
            errors={ errors.title }
            register={ register }
          />

          <CustomInput
            classs={ 'width-80 mt-25' }
            type={'text'}
            name={'description'}
            placeholder={'Description'}
            errors={ errors.description }
            register={ register }
          />

          <CustomInput
            classs={ 'width-80 mt-25' }
            type={'date'}
            name={'date'}
            placeholder={''}
            errors={ errors.date }
            register={ register }
          />

          <CustomInput
            classs={ 'width-80' }
            type={'password'}
            name={'password'}
            placeholder={'Password'}
            errors={ errors.password }
            register={ register }
          />
          
          <button className="btn btn-rounded black-btn btn-outlined">Create</button>
        </div>
      </form>
    </Modal>
  )
}

export default NewLiveModal;