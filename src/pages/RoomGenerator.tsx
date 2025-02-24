import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { debugHelloEndpoint } from '../lib/websocket';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import './RoomGenerator.css'; // 追加

const RoomGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [roomIdInput, setRoomIdInput] = useState('');

  useEffect(() => {
    // デバッグ関数を呼び出す
    debugHelloEndpoint();
  }, []);

  const createRoom = () => {
    const roomId = uuidv4(); // 一意のIDを生成
    navigate(`/room?id=${roomId}`);
  };

  const joinRoom = () => {
    if (roomIdInput) {
      navigate(`/room?id=${roomIdInput}`);
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title">
          ROOMIE
        </div>

        <div className="space-y-4">
          <Card className="card">
            <CardHeader className="card-header">
              <CardTitle className="card-title">新しく部屋をつくる</CardTitle>
            </CardHeader>
            <CardContent className="card-content">
              <Button 
                className="button" 
                onClick={createRoom}
              >
                作成
              </Button>
            </CardContent>
          </Card>

          <Card className="card">
            <CardHeader className="card-header">
              <CardTitle className="card-title">誰かの部屋に入る</CardTitle>
            </CardHeader>
            <CardContent className="card-content">
              <div className="input-container">
                <Input 
                  id="roomId"
                  placeholder="部屋ID入力" 
                  className="input"
                />
                <Button 
                  className="icon-button"
                  onClick={joinRoom}
                >
                  <ArrowRight size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default RoomGenerator;