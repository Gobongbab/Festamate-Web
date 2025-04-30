import { useEffect, useRef, useCallback } from 'react';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

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

  const connect = useCallback(() => {
    if (client.current?.connected) {
      console.log('이미 연결된 상태입니다.');
      return;
    }

    const socket = new SockJS('https://www.festamate.shop/ws');
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log('WebSocket 연결 성공!');
        client.current = stompClient;

        const path = `/topic/chatRooms/${chatRoomId}`;
        const subscription = stompClient.subscribe(path, message => {
          console.log('메시지 수신:', message);
          const receivedMessage = JSON.parse(message.body);
          onMessage(receivedMessage.message);
        });

        subscriptions.current[path] = subscription;
      },
      (error: Error) => {
        console.error('WebSocket 연결 실패:', error);
      },
    );
  }, [chatRoomId, onMessage]);

  const disconnect = useCallback(() => {
    if (client.current) {
      console.log('WebSocket 연결을 종료합니다.');

      // 모든 구독 해제
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
        const destination = `/app/chat/room/${chatRoomId}`;
        client.current.publish({
          destination,
          body: JSON.stringify({ message }),
        });
        console.log('메시지 전송 성공:', message);
      } catch (error) {
        console.error('메시지 전송 중 에러 발생:', error);
      }
    },
    [chatRoomId],
  );

  useEffect(() => {
    console.log('useWebSocket useEffect 실행됨');
    console.log('chatRoomId:', chatRoomId);
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect, chatRoomId]);

  return { sendMessage };
}
