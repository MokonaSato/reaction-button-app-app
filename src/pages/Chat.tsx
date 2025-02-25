import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import SoundBoard from '../components/SoundBoard';
import Timeline from '../components/Timeline';
import FloatingButton from '../components/FloatingButton';
import { debugHelloEndpoint } from '../lib/websocket';
import { useWebSocket } from '../hooks/useWebSocket';
import { useTimeline } from '../hooks/useTimeline';
import { useButtonHandlers } from '../hooks/useButtonHandlers';
import { MessageSquare } from 'lucide-react';
import './Chat.css';


const Chat: React.FC = () => {
  const [roomId, setRoomId] = useState<string>('default-room');
  const [timeline, setTimeline] = useState<{ id: string; text: string; isSelf: boolean }[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [flyText, setFlyText] = useState<string | null>(null);
  const [flyTextColor, setFlyTextColor] = useState<string>('');
  const [isJoined, setIsJoined] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false); // isMuted ステートを追加

  const { handleButtonClick, handleOptionClick } = useButtonHandlers(roomId, setTimeline, setFlyText, setFlyTextColor, setShowOptions);

  useEffect(() => {
    const roomIdFromUrl = new URLSearchParams(window.location.search).get('id') || 'default-room';
    setRoomId(roomIdFromUrl);
    debugHelloEndpoint();
  }, []);

  // const AccessToken = import.meta.env.VITE_STREAMING_ACCESS_TOKEN;
  const apiURL = import.meta.env.VITE_WEBSOCKET_SERVER_URL;

  useTimeline(roomId, setTimeline, useRef<string>(Math.random().toString(36).substring(2, 15)));
  useWebSocket(apiURL, roomId, isJoined, setIsJoined, setTimeline, setFlyText, setFlyTextColor, isMuted);

  const flyAnimation = useSpring({
    from: { opacity: 1, transform: 'translateY(0px)' },
    to: { opacity: 0, transform: 'translateY(-100px)' },
    config: { duration: 1000 },
    reset: true,
    reverse: flyText === null,
    onRest: () => setFlyText(null),
  });

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <div className="app-header">
          <div className="header-inner">
            <MessageSquare className="header-icon" />
            <h1 className="header-title">
              nanairo
            </h1>
          </div>
        </div>

        <SoundBoard onButtonClick={handleButtonClick} isMuted={isMuted} setIsMuted={setIsMuted} />
        <Timeline timeline={timeline} />
      </div>
      {showOptions && (
        <div className="options">
          <button onClick={() => handleOptionClick('♡')}>♡</button>
          <button onClick={() => handleOptionClick('！')}>！</button>
          <button onClick={() => handleOptionClick('？')}>？</button>
        </div>
      )}
      {flyText && (
        // @ts-ignore
        <animated.div style={{ ...flyAnimation, color: flyTextColor }} className="fly-text">
          {flyText}
        </animated.div>
      )}
      <FloatingButton onClick={() => setShowOptions(!showOptions)} label="＋"/>
    </div>
  );
};

export default Chat;
