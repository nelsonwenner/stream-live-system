import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { handleLiveError } from '../utils/handler.error';
import getIceServers from '../utils/get.ice.server';
import { getLive } from '../service/Api';
import io from "socket.io-client";
import Peer from "peerjs";

const useViewer = (data) => {

  const [usersConnected, setUserConnected] = useState(0);
  const { start, liveSlug, videoRefViewer } = data;
  const [error, setError] = useState(null);
  const [live, setLive] = useState({});
  const peerRef = useRef();
  
  const socket = useMemo(() => {
    if (!start) { return null }
    return io(`${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/live`);
  }, [start]);

  const connectBroadcaster = useCallback((data) => {
 
    if (!data.peer_id) { return }

    console.log('New broadcaster', data.peer_id);

    const iceServers = getIceServers();
   
    peerRef.current = new Peer({
      ...(iceServers.length && {
        config: {
          iceServers: [...iceServers]
        }
      }),
      host: process.env.REACT_APP_MICRO_GENERATOR_PEER_DOMAIN,
      port: parseInt(process.env.REACT_APP_MICRO_GENERATOR_PEER_PORT)
    });

    const _peer = peerRef.current;

    _peer.on('open', (peer_id) => {

      console.log('Viewer_id', peer_id);
      const connect = _peer.connect(data.peer_id);

      if (connect) {
        connect.on('error', (error) => {
          console.log('Error peer: ', error);
        });

        connect.on('open', () => {
          console.log('Connetion opened with broadcaster: ', _peer.id);
        })
      }
    });

    _peer.on('call', (call) => {
      call.answer();

      call.on('stream', (stream) => {
        console.log('New stream received: ', stream);

        if (!videoRefViewer.current || 
          videoRefViewer.current.id !== stream.id) {
          
          videoRefViewer.current = stream;
        }
      });
    });
  }, [peerRef, videoRefViewer]);

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
      setError(handleLiveError(error));
    })

  }, [liveSlug, error]);
  
  useEffect(() => {

    if (!start || !socket) { return }
    
    socket.on('connect', () => {
      socket.on('get-broadcaster', (data) => {
        connectBroadcaster(data);
      });

      socket.on('count-users', (count) => {
        setUserConnected(count);
      });

      socket.on('finish-live', (live) => {
        setLive(live);
        peerRef.current.disconnect();;
        socket.disconnect();
      });

      socket.emit('join', {slug: liveSlug, isBroadcaster: false});
    });
    return () => {
      
      if (socket.connected) {
        socket.disconnect();
      }
    }
  }, [start, socket, peerRef, liveSlug, connectBroadcaster]);

 
  useEffect(() => {

    if (error || !socket) { return }

    socket.on('error', (error) => {
      console.log(error);

      if (error) {
        setError(error);
      }

      if (peerRef.current) {
        console.log("peer Disconnect")
        peerRef.current.disconnect();
      }

      if (videoRefViewer.current) {
        videoRefViewer.current = null;
        document.getElementById('video')
        .srcObject = null; 
      }
    });
  }, [socket, peerRef, videoRefViewer, error]);

  const unload = useCallback(() => {
    if (socket && socket.connected) {
      socket.emit('leave');
    }
  }, [socket]);

  useEffect(() => {
    window.addEventListener('beforeunload', unload);
    return () => {
      unload();
      window.removeEventListener('beforeunload', unload);
    }
  }, [unload, socket]);

  return { live, error, usersConnected }
}

export default useViewer;