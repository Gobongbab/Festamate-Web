import { useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
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
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 3;

  const connect = useCallback(() => {
    try {
      console.log('WebSocket 연결 시도 중...');
      client.current = new Client({
        webSocketFactory: () => {
          console.log('webSocketFactory 실행됨');
          const socket = new SockJS('https://www.festamate.shop/ws');
          console.log('SockJS 객체 생성 완료');
          console.log('SockJS 상태:', socket.readyState);
          console.log('SockJS URL:', socket.url);
          return socket;
        },
        connectHeaders: {
          'heart-beat': '10000,10000',
        },
        heartbeatIncoming: 10000,
        heartbeatOutgoing: 10000,
        reconnectDelay: 5000,
        onConnect: () => {
          console.log('WebSocket 연결 성공!');
          reconnectAttempts.current = 0;
          client.current?.subscribe(
            `/topic/chatRooms/${chatRoomId}`,
            message => {
              onMessage(JSON.parse(message.body));
            },
          );
        },
        onStompError: frame => {
          console.error('STOMP 에러 발생:', frame);
        },
        onWebSocketError: event => {
          console.error('WebSocket 에러 발생:', event);
        },
        onDisconnect: () => {
          console.log('WebSocket 연결이 끊어졌습니다.');
          if (reconnectAttempts.current < maxReconnectAttempts) {
            reconnectAttempts.current += 1;
            console.log(
              `재연결 시도 중... (${reconnectAttempts.current}/${maxReconnectAttempts})`,
            );
            setTimeout(connect, 5000);
          } else {
            console.error('최대 재연결 시도 횟수를 초과했습니다.');
          }
        },
      });

      client.current.activate();
    } catch (error) {
      console.error('WebSocket 연결 중 에러 발생:', error);
    }
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
  }, [connect, disconnect]);

  return { sendMessage };
}
