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
          onMessage(receivedMessage as Message);
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
