import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { debugHelloEndpoint } from '../lib/websocket';

const RoomGenerator: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // デバッグ関数を呼び出す
    debugHelloEndpoint();
  }, []);

  const createRoom = () => {
    const roomId = uuidv4(); // 一意のIDを生成
    navigate(`/room?id=${roomId}`);
  };

  return <button onClick={createRoom}>Create New Room</button>;
}

export default RoomGenerator;