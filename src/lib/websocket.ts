export interface WebSocketMessage {
  type: string;
  payload: string;
  roomId: string;
  clientId: string;
  id: string; // 新しいフィールド
  timestamp: number; // 新しいフィールド
}

export interface JoinRoomRequest {
  roomId: string;
}

export const createWebSocket = (
  wsURL: string,
  roomId: string,
  onMessage: (data: WebSocketMessage) => void,
  onError: (error: any) => void,
  onClose: () => void,
  setIsJoined: (joined: boolean) => void // 追加
) => {
  let ws: WebSocket | null = null;

  const joinRoom = async () => {
    const requestBody: JoinRoomRequest = { roomId };
    try {
      const response = await fetch('/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        throw new Error('Failed to join room');
      }
      setIsJoined(true); // ここで isJoined を更新
      console.log(`Joined room ${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const reconnectWebSocket = async () => {
    if (ws) {
      ws.close();
    }

    await joinRoom(); // 部屋に参加

    ws = new WebSocket(wsURL);

    ws.onopen = () => {
      console.log('WebSocket connection opened in createWebSocket');
      ws?.send(JSON.stringify({ type: 'join', room: roomId }));
    };

    ws.onmessage = async (event) => {
      let data;
      if (typeof event.data === "string") {
        data = event.data;
      } else if (event.data instanceof Blob) {
        data = await event.data.text();
      } else {
        console.error("Unknown data type received:", event.data);
        return;
      }

      try {
        const parsedData: WebSocketMessage = JSON.parse(data);
        onMessage(parsedData);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      onError(error);
    };

    ws.onclose = () => {
      console.warn('WebSocket closed. Attempting to reconnect...');
      setTimeout(reconnectWebSocket, 3000);
      onClose();
    };
  };

  reconnectWebSocket();

  return {
    send: (message: WebSocketMessage) => {
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      } else {
        console.error('WebSocket is not open. ReadyState:', ws?.readyState);
        reconnectWebSocket();
      }
    },
    close: () => {
      ws?.close();
    },
    onopen: (callback: () => void) => {
      if (ws) {
        ws.onopen = callback;
      }
    }
  };
};

export const sendMessage = async (message: WebSocketMessage) => {
  const response = await fetch('/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
  console.log(message)
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
};

// デバッグ用の関数を追加
export const debugHelloEndpoint = async () => {
  try {
    const response = await fetch('/hello');
    const text = await response.text();
    console.log('Response from /hello:', text);
  } catch (error) {
    console.error('Error fetching /hello endpoint:', error);
  }
};

