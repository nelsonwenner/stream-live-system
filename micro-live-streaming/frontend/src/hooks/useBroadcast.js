import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { getLive } from '../service/Api';
import io from "socket.io-client";
import Peer from "peerjs";

const useBroadcast = (data) => {

  const { start, stop, liveSlug, password, videoRef } = data;

  const [error, setError] = useState('');
  const [usersConnected, setUserConnected] = useState(0);
  const [stream, setStream] = useState();
  const [live, setLive] = useState({});
  const peerRef = useRef();
  const streamRef = useRef();

  const socket = useMemo(() => {
    if (!start) { return null; }
    return io(`${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/live`);
  }, [start]);

  useEffect(() => {

    if (error) { return }

    const load = async () => {
      try {
        setLive(await getLive(liveSlug));
      } catch (error) {
        console.log(error);
        setError(error)
      }
    }
    load();
  }, [liveSlug, error]);
  
  useEffect(() => {

    if (!socket) { return; }

    socket.on('connect', () => {

      socket.emit('join', {slug: liveSlug, password: password});

      socket.on('count-users', (count) => {
        setUserConnected(count);
      });
    });

  }, [liveSlug, socket]);

  useEffect(() => {

    if (!streamRef || !start || !socket || !peerRef.current) { return }

    console.log('Initialized peer connection...');

    peerRef.current = new Peer({
      host: process.env.REACT_APP_MICRO_GENERATOR_PEER_DOMAIN,
      port: parseInt(process.env.REACT_APP_MICRO_GENERATOR_PEER_PORT)
    });

    peerRef.current.on('open', (peer_id) => {
      console.log('BoradcastPeer id: ', peer_id);
      socket.emit('set-broadcaster', {client_id: peer_id, password: password});
    });

    peerRef.current.on('connection', (connect) => {
      const call = peerRef.current.call(connect.peer, streamRef.current);
      if (call) {
        console.log('new call: ', call);
      }
    });
  }, [start, password, stream, socket, peerRef]);

  const loadStream = useCallback((props) => {
    const {audioInputId, videoId, captureStream} = props;

    if ((audioInputId === undefined || videoId === undefined) && !!captureStream.captureStream.id) {
      videoRef.current =  captureStream;
      setStream(captureStream)
      return
    }
    
    navigator
    .mediaDevices
    .getUserMedia({
      audio: {
        deviceId: {exact: audioInputId}
      },
      video: {
        deviceId: {exact: videoId}, width: {ideal: 1280}, height: {ideal: 720}
      }
    })
    .then((streaming => {
      if (!streaming) { return }
      streamRef.current = streaming;
      setStream(streaming)
      videoRef.current.srcObject = streaming;
    })).catch(console.error);
  }, [videoRef]);
  
  return { live, usersConnected, loadStream }
}

export default useBroadcast;
