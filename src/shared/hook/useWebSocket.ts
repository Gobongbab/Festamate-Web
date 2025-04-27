import { useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { PATH } from '@/shared/constants';
import { getPath } from '@/shared/utils';

interface UseWebSocketProps {
  chatRoomId: number;
  onMessage: (message: string) => void;
}

export default function useWebSocket({
  chatRoomId,
  onMessage,
}: UseWebSocketProps) {
  const client = useRef<Client | null>(null);

  const connect = useCallback(() => {
    const socket = new SockJS('https://www.festamate.shop/ws');
    client.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log('connected');
        client.current?.subscribe(`/topic/chat/${chatRoomId}`, message => {
          onMessage(JSON.parse(message.body));
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
    });

    client.current.activate();
  }, [chatRoomId, onMessage]);

  const disconnect = useCallback(() => {
    if (client.current) {
      client.current.deactivate();
    }
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (client.current?.connected) {
        client.current.publish({
          destination: getPath(PATH.CHAT, `${chatRoomId}`),
          body: JSON.stringify({ message }),
        });
      }
    },
    [chatRoomId],
  );

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return { sendMessage };
}
