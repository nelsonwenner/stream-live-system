import React, { useState } from 'react';
import './styles.css';

import redirect from '../../../routes/redirect';
import CreateButton from '../CreateButton';
import CustomInput from '../CustomInput';
import Api from '../../../service/Api';
import Modal from 'react-modal';

Modal.setAppElement('body');

const NewLiveModal = ({ openModal, closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    if(!title || !password || !description || !date) {
      setError('Fill in all the fields');
    } else {
      Api.post('/api/lives', {title, description, date, password})
      .then((res) => {
      
        redirect('/');

      })
      .catch(() => onSubmitFailure());
    }
  }

  const onSubmitFailure = () => {
    setError("Request Failed" );
  }

  return (
    <Modal
      isOpen={ openModal }
      onRequestClose={ closeModal }
      contentLabel="Example Modal">
      
      <form method="post" onSubmit={ onSubmit }>
        <div className="container-form">
          <h1 className="title-modal">New live</h1>

          <CustomInput
            classs={'mt-17'}
            type={'text'}
            placeholder={'Title'}
            value={title}
            name={'title'}
            onChange={ (event) => setTitle(event.target.value) }
          />

          <CustomInput
            classs={'mt-17'}
            type={'text'}
            placeholder={'Description'}
            value={description}
            name={'description'}
            onChange={ (event) => setDescription(event.target.value) }
          />

          <CustomInput
            classs={'mt-17'}
            type={'date'}
            placeholder={''}
            value={date}
            name={'date'}
            onChange={ (event) => setDate(event.target.value) }
          />

          <CustomInput
            type={'password'}
            placeholder={'Password'}
            value={password}
            name={'password'}
            onChange={ (event) => setPassword(event.target.value) }
          />

          <CreateButton
            typeBtn="submit"
            className={'btn btn-outlined purple-btn mt-30'}
            children={'Create'}
          />

          {
            error && (
              
              <div className="error">
                <p style={{color: 'red'}}>{ error }</p>
              </div>

            )
          }
        </div>
      </form>
    </Modal>
  )
}

export default NewLiveModal;