import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { handleLiveError } from '../utils/handler.error';
import { getLive } from '../service/Api';
import io from "socket.io-client";
import Peer from "peerjs";

const useBroadcast = (data) => {
  
  const { start, stop, liveSlug, password, videoRef } = data;

  const [error, setError] = useState(null);
  const [usersConnected, setUserConnected] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [stream, setStream] = useState();
  const [live, setLive] = useState({});
  const peerRef = useRef();
  const streamRef = useRef();

  const socket = useMemo(() => {
    if (!start) { return null; }
    return io(`${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/live`);
  }, [start, password]);

  useEffect(() => {

    if (error) { return }

    const load = async () => {
      try {
        setLive(await getLive(liveSlug));
      } catch (error) {
        console.log(error);
        setError(handleLiveError(error));
      }
    }

    load();

  }, [liveSlug, error]);
  
  useEffect(() => {

    if (!socket) { return; }

    socket.on('connect', () => {

      socket.emit('join', {slug: liveSlug, password: password});
    
      socket.on('authorization', (data) => {
      
        if (data.socket === socket.id) {
          setIsAuth(data.auth);
        }

      });

      socket.on('count-users', (count) => {
        setUserConnected(count);
      });
    });

  }, [liveSlug, password, socket]);

  useEffect(() => {
   
    if (!stream || !start || !socket || peerRef.current) { return }

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
      videoRef.current = captureStream.captureStream;
      streamRef.current = captureStream.captureStream;
      setStream(captureStream.captureStream);
      return;
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
      videoRef.current = streaming;
      setStream(streaming);
    }))
    .catch((error) => {
      console.log(error);
    });

  }, [videoRef]);

  const stopStream = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.strop());
    }
  }

  useEffect(() => {

    if (error || !socket) { return; }

    socket.on('error', (error) => {
      console.log(error);

      if (error) {
        setError(error);
      }

      stopStream();

      if (peerRef.current) {
        peerRef.current.disconnect();
      }

      if (videoRef.current) {
        videoRef.current = null;
      }
    });

    return () => {
      
      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [socket, peerRef, videoRef, error]);
  
  return { isAuth, live, error, usersConnected, loadStream }
}

export default useBroadcast;
