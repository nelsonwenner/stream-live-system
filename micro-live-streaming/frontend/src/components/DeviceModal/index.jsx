import React, { useState, useEffect } from 'react';
import './styles.css';

import DeviceSelect from './DeviceSelect';

import Modal from 'react-modal';

Modal.setAppElement('body');

const DeviceModal = ({ open, onChange, onClose }) => {
  const [captureStream, setCaptureStream] = useState({captureStream: []});
  const [devices, setDevices] = useState({audioInputs: [], videos: []});
  const [isCaptureStream, setIsCaptureStream] = useState(false);
  const [audioInputId, setAudioInputid] = useState('');
  const [videoId, setVideoId] = useState('');
 
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
   
    if (isCaptureStream) {
      navigator.mediaDevices
      .getDisplayMedia({video: {cursor: "always"}, audio: false})
      .then(result => {
        setCaptureStream({captureStream: result});
      });
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
      onRequestClose={ handlerClose }
      contentLabel="Modal">
      
      <form className="form-device">
        <h1 className="title-device-modal">Devices Audio and Video</h1>
        <div className="container-devices">
          <DeviceSelect
            classs={ 'mt-17' }
            label={ 'Microphone' }
            name={ 'microphone' }
            value={ audioInputId }
            devices={ devices.audioInputs }
            handlerSelect={ (event) => setAudioInputid(event.target.value) }
          />
          
          <DeviceSelect
            classs={ 'mt-17' }
            label={'Camera'}
            name={ 'camera' }
            value={ videoId }
            devices={ devices.videos }
            handlerSelect={ (event) => setVideoId(event.target.value) }
          />

          <DeviceSelect
            label={'Capture Screen Streaming'}
            handlerSelect={ (event) => setIsCaptureStream(
              event.target.value === 'Capture Screen Streaming') }
          />

          <button className="btn btn-rounded btn-outlined purple-btn" onClick={ handlerClose }>Done</button>
        </div>
      </form>
    </Modal>
  )
}

export default DeviceModal;