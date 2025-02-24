import { useEffect, useRef } from 'react';
import { createWebSocket, WebSocketMessage } from '../lib/websocket';
import { playSound } from '../lib/soundPlayer'; // 共通の関数をインポート

export const useWebSocket = (
  apiURL: string, 
  roomId: string, 
  isJoined: boolean, 
  setIsJoined: (joined: boolean) => void, 
  setTimeline: (callback: (prevTimeline: any[]) => any[]) => void, 
  setFlyText: (text: string | null) => void, 
  setFlyTextColor: (color: string) => void, 
  isMuted: boolean
) => {
  const clientId = useRef<string>(Math.random().toString(36).substring(2, 15)); // クライアントIDを生成
  const wsRef = useRef<ReturnType<typeof createWebSocket> | null>(null);
  const isMutedRef = useRef(isMuted);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    console.log('useEffect triggered with:', { apiURL, roomId, isJoined });
    if (roomId === 'default-room') return;

    if (wsRef.current) {
      console.log('WebSocket already exists, closing existing connection');
      wsRef.current.close();
    }

    const ws = createWebSocket(
      apiURL,
      roomId,
      (message: WebSocketMessage) => {
        if (isJoined) {
          if (isValidWebSocketMessage(message)) {
            if (message.type === 'option') {
              setFlyText(message.payload);
              setFlyTextColor(getRandomColor());
            } else if (message.type === 'sound') {
              console.log('isMuted in WebSocket message handler: ', isMutedRef.current);
              playSound(message.payload, isMutedRef.current);
              setTimeline((prevTimeline) => {
                if (!prevTimeline.some(msg => msg.id === message.id)) {
                  const newMessage = { id: message.id, text: message.payload, isSelf: message.clientId === clientId.current };
                  return [...prevTimeline, newMessage];
                }
                return prevTimeline;
              });
            } else {
              setTimeline((prevTimeline) => {
                if (!prevTimeline.some(msg => msg.id === message.id)) {
                  const newMessage = { id: message.id, text: message.payload, isSelf: message.clientId === clientId.current };
                  return [...prevTimeline, newMessage];
                }
                return prevTimeline;
              });
            }
          } else {
            console.error('Invalid WebSocket message:', message);
          }
        }
      },
      (error) => console.error('WebSocket error:', error),
      () => console.log('WebSocket closed'),
      setIsJoined
    );

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    wsRef.current = ws;

    return () => {
      console.log('Cleaning up WebSocket connection');
      ws.close();
    };
  }, [apiURL, roomId, isJoined]);

  const isValidWebSocketMessage = (message: any): message is WebSocketMessage => {
    return (
      typeof message.type === 'string' &&
      typeof message.payload === 'string' &&
      typeof message.roomId === 'string' &&
      typeof message.clientId === 'string' &&
      typeof message.id === 'string' &&
      typeof message.timestamp === 'number'
    );
  };

  const getRandomColor = () => {
    const getRandomValue = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const r = getRandomValue(100, 255);
    const g = getRandomValue(100, 255);
    const b = getRandomValue(100, 255);

    return `rgb(${r}, ${g}, ${b})`;
  };
};