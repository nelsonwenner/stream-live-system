import React, { useState, useEffect } from 'react';
import './device-modal.css';

import CustomButton from '../common/CustomButton/CustomButton';
import DeviceSelect from './DeviceSelect/DeviceSelect';

import Modal from 'react-modal';

Modal.setAppElement('body');

const DeviceModal = ({ open, onChange, onClose }) => {
 
  const [audioInputId, setAudioInputid] = useState('');
  const [videoId, setVideoId] = useState('');
  const [devices, setDevices] = useState({audioInputs: [], videos: []});
  const [captureStream, setCaptureStream] = useState({captureStream: []});
  const [isCaptureStream, setIsCaptureStream] = useState(false);

  useEffect(() => {
    navigator
    .mediaDevices
    .getUserMedia({audio: true, video: true})
    .then(() => loadDevices())
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const loadDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(device => device.kind === 'audioinput');
      const videos = devices.filter(device => device.kind === 'videoinput');
      
      setDevices({audioInputs: audioInputs, videos: videos});
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      if (isCaptureStream) {
        const load =  async () => {
          const captureStreaming = await navigator.mediaDevices.getDisplayMedia({video: {cursor: "always"}, audio: false});
          setCaptureStream({captureStream: captureStreaming});
        }
        load();
      } 
    } catch (error) {
      console.log(error);
    }
  }, [isCaptureStream]);
  
  useEffect(() => {

    if (isCaptureStream) {
      onChange({captureStream: captureStream});
    }

  }, [captureStream])
  
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
      className={"ReactModal__Content_Device"}
      overlayClassName={"ReactModal__Overlay_Device"}
      onRequestClose={ handlerClose }
      style={ style }
      contentLabel="Modal">
      
      <form>
        <div className="container-form">
          <h1 className="title-device-modal">Devices Audio and Video</h1>

          <DeviceSelect
            label={'Microphone'}
            value={ audioInputId }
            devices={ devices.audioInputs }
            onChange={ (selected) => setAudioInputid(selected) }
          />

          <DeviceSelect
            label={'Camera'}
            value={ videoId }
            devices={ devices.videos }
            onChange={ (selected) => setVideoId(selected) }
          />
          
          <DeviceSelect
            label={'Capture Screen Streaming'}
            onChange={ (selected) => setIsCaptureStream(selected === 'Capture Screen Streaming') }
          />

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

export default DeviceModal;