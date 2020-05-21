import React, { useState, useEffect } from 'react';
import './device-modal.css';

import CustomButton from '../common/CustomButton/CustomButton';

const DeviceModal = (props) => {
  const { open, onChange, onClose } = props;

  const [audioInputId, setAudioInputid] = useState('');
  const [videoId, setVideoId] = useState('');
  const [devices, setDevices] = useState({audioInputs: [], videos: []});

  useEffect(() => {
    navigator
    .mediaDevices
    .getUserMedia({audio: true, video: true})
    .finally(() => loadDevices());
  }, [])

  const loadDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(device => device.kind === 'audioinput');
      const videos = devices.filter(device => device.kind === 'videoinput');
      setDevices({audioInputs: audioInputs, videos: videos});
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (devices.audioInputs.length && audioInputId === '') {
      setAudioInputid(devices.audioInputs[0].deviceId);
    }
    if (devices.videos.length && videoId === '') {
      setVideoId(devices.videos[0].deviceId);
    }
  }, [devices, audioInputId, videoId]);

  useEffect(() => {
    if (audioInputId === '' || videoId === '') {
      return;
    }

    onChange({audioInputId, videoId});
  }, [onChange, audioInputId, videoId]);

  const handlerClose = () => {
    onClose();
  }

  return (
    <Modal
      isOpen={ open }
      onRequestClose={ handlerClose }
      contentLabel="Modal">
      
      <form >
        <div className="container-form">
          <h1 style={{ fontWeight: 800, fontSize: 26, textAlign: 'center' }}>Broadcast live</h1>

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

export default DeviceModal;
