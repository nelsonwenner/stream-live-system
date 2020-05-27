import React, { useState } from 'react';
import './new-live-modal.css';

import CreateButton from '../../common/create-button/CreateButton';
import CustomInput from '../../common/custom-input/CustomInput';
import redirect from '../../../routes/redirect';
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
          <h1 style={{ fontWeight: 800, fontSize: 26 }}>New live</h1>

          <CustomInput
            classs={'mt-40'}
            type={'text'}
            placeholder={'Title'}
            value={title}
            name={'title'}
            onChange={ (event) => setTitle(event.target.value) }
          />

          <CustomInput
            classs={'mt-40'}
            type={'text'}
            placeholder={'Description'}
            value={description}
            name={'description'}
            onChange={ (event) => setDescription(event.target.value) }
          />

          <CustomInput
            classs={'mt-40'}
            type={'date'}
            placeholder={''}
            value={date}
            name={'date'}
            onChange={ (event) => setDate(event.target.value) }
          />

          <CustomInput
            classs={'mt-40'}
            type={'password'}
            placeholder={'Password'}
            value={password}
            name={'password'}
            onChange={ (event) => setPassword(event.target.value) }
          />

          {
            error && (
              
              <div className="error">
                <p style={{color: 'red'}}>{ error }</p>
              </div>

            )
          }

          <CreateButton
            typeBtn="submit"
            className={'btn btn-outlined purple-btn'}
            children={'Create'}
          />
        </div>
      </form>
    </Modal>
  )
}

export default NewLiveModal;