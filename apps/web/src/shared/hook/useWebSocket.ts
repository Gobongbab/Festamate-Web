import { useEffect, useRef, useCallback } from 'react';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

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
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log('WebSocket 연결 성공!');
        client.current = stompClient;

        stompClient.subscribe(`/topic/chatRooms/${chatRoomId}`, message => {
          const receivedMessage = JSON.parse(message.body);
          onMessage(receivedMessage.message);
        });
      },
      (error: Error) => {
        console.error('WebSocket 연결 실패:', error);
      },
    );
  }, [chatRoomId, onMessage]);

  const disconnect = useCallback(() => {
    if (client.current) {
      console.log('WebSocket 연결을 종료합니다.');
      client.current.deactivate();
      client.current = null;
    }
  }, []);

  const sendMessage = useCallback(
    (message: string) => {
      if (client.current?.connected) {
        try {
          client.current.publish({
            destination: `/topic/chatRooms/${chatRoomId}`,
            body: JSON.stringify({ message }),
          });
        } catch (error) {
          console.error('메시지 전송 중 에러 발생:', error);
        }
      } else {
        console.warn(
          'WebSocket이 연결되지 않았습니다. 메시지를 전송할 수 없습니다.',
        );
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
