import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { debugHelloEndpoint } from '../lib/websocket';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Plus, Users, ArrowRight } from 'lucide-react';
import './RoomGenerator.css'; // 追加
import '../App.css'; // 追加

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
    <div className="container-main">
      <div className="content-wrapper">
        <div className="header-section">
          <div className="logo-container">
            <MessageSquare className="icon-message" />
            <h1 className="app-title">
              nanairo
            </h1>
          </div>
          <p className="app-subtitle">みんなとおしゃべりしよう！</p>
        </div>
        <div className="cards-container">
          <Card className="card">
            <div className="card-decoration-purple"></div>
            <CardHeader className="card-header">
              <CardTitle className="card-title">
                <Plus className="icon-plus" />新しくルームをつくる
              </CardTitle>
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
            <div className="card-decoration-blue"></div>
            <CardHeader className="card-header">
              <CardTitle className="card-title">
                <Users className="icon-users" />
                友達のチャットに参加する
              </CardTitle>
            </CardHeader>
            <CardContent className="card-content">
              <div className="input-group">
                <Input
                  id="roomId"
                  placeholder="ルームIDを入力"
                  className="input-room"
                />
                <Button
                  className="button-join"
                  onClick={joinRoom}
                >
                  <ArrowRight size={20} />
                </Button>
              </div>
            </CardContent>
          </Card>
          <div className="footer"></div>
          {/* <p>今すぐ友だちとチャットを始めよう！</p> */}
        </div>
      </div>
    </div>
  );
}

export default RoomGenerator;