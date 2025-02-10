// client/src/hooks/useSocket.js
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useAuth } from './useAuth';

export const useSocket = () => {
  const { user } = useAuth();
  const socketRef = useRef();

  useEffect(() => {
    if (user) {
      socketRef.current = io(process.env.REACT_APP_API_URL, {
        auth: {
          token: user.token
        }
      });

      socketRef.current.emit('joinUserRoom', user.id);

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [user]);

  return socketRef.current;
};
