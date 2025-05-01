import { useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';

interface UseWebSocketProps {
  chatRoomId: number;
  onMessage: (message: string) => void;
}

interface Subscription {
  unsubscribe: () => void;
}

export default function useWebSocket({
  chatRoomId,
  onMessage,
}: UseWebSocketProps) {
  const client = useRef<Client | null>(null);
  const subscriptions = useRef<{ [key: string]: Subscription }>({});
  const stored = sessionStorage.getItem('userToken');
  const parsed = JSON.parse(stored!);
  const accessToken = parsed.accessToken;

  const path = `/topic/chatRooms/${chatRoomId}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const connect = useCallback(() => {
    if (client.current?.connected) {
      console.log('이미 연결된 상태입니다.');
      return;
    }

    try {
      const stompClient = new Client({
        brokerURL: 'wss://www.festamate.shop/ws',
        connectHeaders: headers,
        debug: message => console.log(message),
        reconnectDelay: 5000,
      });

      client.current = stompClient;

      stompClient.onConnect = () =>
        stompClient.subscribe(path, message => {
          console.log(`메시지 수신: ${message}`);
          const receivedMessage = JSON.parse(message.body);
          onMessage(receivedMessage.message);
        });

      stompClient.activate();
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId, onMessage]);

  const disconnect = useCallback(() => {
    if (client.current) {
      console.log('WebSocket 연결을 종료합니다.');

      Object.keys(subscriptions.current).forEach(path => {
        subscriptions.current[path].unsubscribe();
        delete subscriptions.current[path];
      });

      client.current.deactivate();
      client.current = null;
    }
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (!client.current?.connected) {
        console.warn('WebSocket이 연결되지 않았습니다.');
        return;
      }

      try {
        const destination = `/app/messages/chatRooms/${chatRoomId}`;
        console.log('메시지 전송 시도:', { destination, message });

        client.current.publish({
          headers: headers,
          destination,
          body: JSON.stringify({ message: message }),
        });
        console.log('메시지 전송 성공:', message);
      } catch (error) {
        console.error('메시지 전송 중 에러 발생:', error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chatRoomId],
  );

  useEffect(() => {
    console.log('chatRoomId:', chatRoomId);
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect, chatRoomId]);

  return { sendMessage };
}
