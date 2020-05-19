import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import io from "socket.io-client";
import Peer from "peerjs";

const useBroadcast = (data) => {

  const { start, stop, liveSlug, password, videoRef } = data;

  const [error, setError] = useState({message: '', name: ''});
  const [usersConnected, setUserConnected] = useState(0);
  const peerRef = useRef();
  const streamRef = useRef();

  const socket = useMemo(() => {
    if (!start) { return null; }
    return io(`${process.env.REACT_APP_MICRO_BACKEND_MANAGER_URL}/live`);
  }, [start]);

  useEffect(() => {

    if (!socket) { return; }

    socket.on('connect', () => {

      socket.emit('join', {slug: liveSlug, password: password});

      socket.on('count-users', (count) => {
        setUserConnected(count);
      });
    });

  }, [liveSlug, socket]);

  return { usersConnected }
}

export default useBroadcast;
