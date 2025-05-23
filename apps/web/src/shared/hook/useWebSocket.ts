import {
  useEffect,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { Client } from '@stomp/stompjs';
import { Message } from '@/widgets/chat/types';
import { useAtomValue } from 'jotai';
import { userAtom } from '../atom';

interface UseWebSocketProps {
  chatRoomId: number;
  onMessage: (message: Message) => void;
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
  const userData = useAtomValue(userAtom);
  const { nickname } = userData!;

  const path = `/topic/chatRooms/${chatRoomId}`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const connect = useCallback(async () => {
    const stompClient = new Client({
      brokerURL: 'wss://www.festamate.shop/ws',
      connectHeaders: headers,
      debug: message => console.log('[STOMP]', message),
      reconnectDelay: 5000,
      heartbeatIncoming: 30000,
      heartbeatOutgoing: 30000,
    });

    stompClient.onConnect = () => {
      console.log('WebSocket 연결 성공');
      const subscription = stompClient.subscribe(path, message => {
        const receivedMessage = JSON.parse(message.body);
        onMessage(receivedMessage as Message);
      });
      subscriptions.current[path] = subscription;
    };

    stompClient.onWebSocketClose = () => {
      console.warn('WebSocket 연결 종료됨');
    };

    stompClient.onStompError = frame => {
      console.error('STOMP 에러:', frame.headers['message']);
      console.error('상세:', frame.body);
    };

    client.current = stompClient;
    stompClient.activate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId, onMessage]);

  const disconnect = useCallback(() => {
    return new Promise<void>(resolve => {
      if (client.current) {
        console.log('WebSocket 연결을 종료합니다.');

        Object.keys(subscriptions.current).forEach(path => {
          subscriptions.current[path].unsubscribe();
          delete subscriptions.current[path];
        });

        client.current.onDisconnect = () => {
          console.log('WebSocket 완전 종료됨');
          resolve(); // 종료 완료 시 resolve
        };

        client.current.deactivate();
      } else {
        resolve(); // 이미 없으면 바로 resolve
      }

      client.current = null;
    });
  }, []);

  const sendMessage = useCallback(
    (message: string, setData: Dispatch<SetStateAction<Message[]>>) => {
      if (!client.current?.connected) {
        alert('연결이 불안정해요. 채팅방을 다시 로드해 주세요.');
        /**웹소켓 미연결시 사용자에게 해당 알림을 발생시킵니다 */
        return;
      }

      try {
        const destination = `/api/messages/chatRooms/${chatRoomId}`;

        client.current.publish({
          headers: headers,
          destination,
          body: JSON.stringify({ message: message }),
        });

        const sentChat: Message = {
          id: 0,
          nickname: nickname,
          message: message,
          sendDate: new Date().toISOString(),
        };

        setData(prev => [...prev, sentChat]);
      } catch (error) {
        alert('메시지 전송 중 에러가 발생했어요!');
        console.error(error);
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
