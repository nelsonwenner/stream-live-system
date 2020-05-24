import React, { useState, useEffect, useRef, useCallback } from 'react';
import { handleLiveError } from '../utils/handler.error';
import { getLive } from '../service/Api';
import io from "socket.io-client";
import Peer from "peerjs";

const useViewer = (data) => {

  const { start, liveSlug, videoRef } = data;
  const [usersConnected, setUserConnected] = useState(0);
  const [error, setError] = useState(null);
  const [live, setLive] = useState({});
  const peerRef = useRef();


  const socket = useMemo(() => {
    if (!start) { return null; }
    return io(`${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/live`);
  }, [start]);

  const connectBroadcaster = useCallback((data) => {
    console.log(data);
    if (data.peer_id) { return; }

    console.log('New broadcaster', data.peer_id);

    peerRef.current = new Peer({
      host: process.env.REACT_APP_MICRO_GENERATOR_PEER_DOMAIN,
      port: parseInt(process.env.REACT_APP_MICRO_GENERATOR_PEER_PORT)
    });

    const _peer = peerRef.current;

    _peer.on('open', (peer_id) => {

      console.log('Viewer_id', peer_id);
      const coonect = _peer.connect(data.peer_id);

      if (coonect) {
        coonect.on('error', (error) => {
          console.log('Error peer: ', error);
        });

        coonect.on('open', () => {
          console.log('Connetion opened with broadcaster: ', _peer.id);
        })
      }
    });

    _peer.on('call', (call) => {
      call.answer();

      call.on('stream', (stream) => {
        console.log('New stream received: ', stream);

        if (!videoRef.current || videoRef.current.id !== stream.id) {
          videoRef.current = stream;
        }
      });
    });
  }, [peerRef, videoRef]);

  useEffect(() => {

    if (error) { return }

    const load = async () => {
      try {
        setLive(await getLive(liveSlug));
      } catch (error) {
        console.log(error);
        stopStream();
        setError(handleLiveError(error));
      }
    }

    load();

  }, [liveSlug, error]);

}