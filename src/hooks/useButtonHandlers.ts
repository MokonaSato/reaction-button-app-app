import { useRef } from 'react';
import { sendMessage, WebSocketMessage } from '../lib/websocket';

export const useButtonHandlers = (roomId: string, setTimeline: (callback: (prevTimeline: any[]) => any[]) => void, setFlyText: (text: string | null) => void, setFlyTextColor: (color: string) => void, setShowOptions: (show: boolean) => void) => {
  const clientId = useRef<string>(Math.random().toString(36).substring(2, 15)); // クライアントIDを生成

  const handleButtonClick = async (label: string) => {
    if (roomId === 'default-room') return;

    const message: WebSocketMessage = {
      type: 'sound',
      payload: label,
      roomId,
      clientId: clientId.current,
      id: Math.random().toString(36).substring(2, 15), // ランダムなIDを生成
      timestamp: Date.now(), // 現在のタイムスタンプを追加
    };
    setTimeline((prevTimeline) => [...prevTimeline, { id: message.id, text: label, isSelf: true }]);
    await sendMessage(message);
  };

  const handleOptionClick = async (option: string) => {
    if (roomId === 'default-room') return;

    const message: WebSocketMessage = {
      type: 'option',
      payload: option,
      roomId,
      clientId: clientId.current,
      id: Math.random().toString(36).substring(2, 15), // ランダムなIDを生成
      timestamp: Date.now(), // 現在のタイムスタンプを追加
    };
    setFlyText(option);
    setFlyTextColor(getRandomColor());
    setShowOptions(false);
    await sendMessage(message);
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

  return { handleButtonClick, handleOptionClick };
};