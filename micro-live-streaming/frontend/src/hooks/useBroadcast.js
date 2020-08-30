import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { handleLiveError } from '../utils/handler.error';
import getIceServers from '../utils/get.ice.server';
import { getLive } from '../service/Api';
import io from "socket.io-client";
import Peer from "peerjs";

const useBroadcast = (data) => {
  
  const { start, stop, liveSlug, password, videoRef } = data;

  const [usersConnected, setUserConnected] = useState(0);
  const [isAuth, setIsAuth] = useState(false);
  const [viewers, setViewers] = useState([]);
  const [error, setError] = useState(null);
  const [stream, setStream] = useState();
  const [live, setLive] = useState({});
  const streamRef = useRef();
  const peerRef = useRef();

  const socket = useMemo(() => {
    if (!start) { return null }
    return io(`${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/live`);
  }, [start, password]);
  
  useEffect(() => {
    if (error) { return }
    
    getLive(liveSlug)
    .then(data => {
      setLive(data);

      if (data.status === 'done') {
        throw new Error(
          'This live has already been held'
        );
      }
    }).catch(error => {
      console.log(error);
      stopStream();
      setError(handleLiveError(error));
    })

  }, [liveSlug, error]);
  
  useEffect(() => {

    if (!socket) { return }

    socket.on('connect', () => {

      socket.emit('join', {
        slug: liveSlug, 
        password: password, 
        isBroadcaster: true
      });
    
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

    const iceServers = getIceServers();
    
    peerRef.current = new Peer({
      ...(iceServers && {
        config: {
          iceServers: [...iceServers]
        }
      }),
      host: process.env.REACT_APP_MICRO_GENERATOR_PEER_DOMAIN,
      port: parseInt(process.env.REACT_APP_MICRO_GENERATOR_PEER_PORT)
    });

    peerRef.current.on('open', (peer_id) => {
      console.log('BoradcastPeer id: ', peer_id);
      socket.emit('set-broadcaster', {
        client_id: peer_id, 
        password: password
      });
    });
    
    peerRef.current.on('connection', (connect) => {
      const call = peerRef.current.call(connect.peer, streamRef.current);
      if (call) {
        console.log('new call: ', call);
        setViewers((prevState) => [...prevState, call]);
      }
     
    });

    peerRef.current.on('disconnected', (event) => {
      console.log("Peer disconnected")
    });
    
    peerRef.current.on('close', (event) => {
      console.log("Peer closed")
    });

  }, [start, password, stream, socket, peerRef]);

  useEffect(() => {
    
    if (!peerRef.current || !stream || !viewers.length) {
      return;
    }

    const viewersConnected = [];
    let hasNewCall = false;

    for(const viewer of viewers) {
      const { localStream } = viewer;
      
      if (localStream && localStream.id === stream.id) {
        viewersConnected.push(viewer);
        break;
      }

      const call = peerRef.current.call(viewer.peer, stream);
      if (call) {
        hasNewCall = true;
        viewersConnected.push(call);
      }
    }

    if (hasNewCall) {
      setViewers(viewersConnected);
    }
  }, [peerRef, viewers, stream]);

  const loadStream = useCallback((props) => {
    const {audioInputId, videoId, captureStream} = props;
    
    if ((audioInputId === undefined ||
        videoId === undefined)      && 
        !!captureStream.captureStream.id) {

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
        deviceId: {
          exact: videoId
        }, width: {
          ideal: 1280
        }, height: {
          ideal: 720
        }
      }
    })
    .then((streaming => {

      if (error || !streaming) { return }

      stopStream();
      streamRef.current = streaming;
      videoRef.current = streaming;
      setStream(streaming);
    }))
    .catch((error) => {
      console.log(error);
    });

  }, [error, videoRef]);

  const stopStream = () => {
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach((track) => track.stop());
    }
  }

  useEffect(() => {

    if (!peerRef.current           || 
      !stop                        || 
      peerRef.current.disconnected || 
      !socket) {
      return;
    }

    socket.emit('finish-live', { password });

    viewers.forEach(viewer => viewer.close());

    peerRef.current.destroy();

  }, [peerRef, stop, socket, password, viewers]);

  useEffect(() => {

    if (error || !socket) { return }

    socket.on('error', (error) => {
      console.log(error);

      if (error) {
        setError(error);
      }

      stopStream();
      
      if (peerRef.current) {
        peerRef.current.destroy();
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
