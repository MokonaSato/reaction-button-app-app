import { useEffect } from 'react';
import { WebSocketMessage } from '../lib/websocket';

export const useTimeline = (roomId: string, setTimeline: (callback: (prevTimeline: any[]) => any[]) => void, clientId: React.MutableRefObject<string>) => {
  useEffect(() => {
    if (roomId === 'default-room') return;

    const fetchMessages = async () => {
      try {
        console.log(`Fetching messages for roomId: ${roomId}`);
        const response = await fetch(`/chat?room=${roomId}`);
        const data: WebSocketMessage[] = await response.json();
        const newMessages = data
          .filter((message) => message.type !== 'option') // 'option'タイプのメッセージを除外
          .map((message) => ({
            id: message.id,
            text: message.payload,
            isSelf: message.clientId === clientId.current,
          }));
        setTimeline((prevTimeline) => {
          const existingIds = new Set(prevTimeline.map(msg => msg.id));
          const filteredMessages = newMessages.filter(msg => !existingIds.has(msg.id));
          return [...prevTimeline, ...filteredMessages];
        });
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    const intervalId = setInterval(fetchMessages, 5000);

    return () => clearInterval(intervalId);
  }, [roomId]);

  useEffect(() => {
    if (roomId === 'default-room') return;

    const fetchLatestMessage = async () => {
      try {
        const response = await fetch(`/chat?room=${roomId}`);
        const data: WebSocketMessage[] = await response.json();
        if (data.length > 0) {
          const latestMessage = data[0];
          if (latestMessage.type !== 'option') {
            setTimeline((prevTimeline) => {
              // 最新のメッセージが既にタイムラインに存在しない場合のみ追加
              if (!prevTimeline.some(msg => msg.id === latestMessage.id)) {
                return [...prevTimeline, {
                  id: latestMessage.id,
                  text: latestMessage.payload,
                  isSelf: latestMessage.clientId === clientId.current,
                }];
              }
              return prevTimeline;
            });
          }
        }
      } catch (error) {
        console.error('Error fetching latest message:', error);
      }
    };

    fetchLatestMessage();
    const intervalId = setInterval(fetchLatestMessage, 5000);

    return () => clearInterval(intervalId);
  }, [roomId]);
};