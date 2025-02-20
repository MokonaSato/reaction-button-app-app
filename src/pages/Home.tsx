import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import SoundBoard from '../components/SoundBoard';
import Timeline from '../components/Timeline';
import FloatingButton from '../components/FloatingButton';
import '../App.css';

const Home: React.FC = () => {
  const [timeline, setTimeline] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [flyText, setFlyText] = useState<string | null>(null);
  const [flyTextColor, setFlyTextColor] = useState<string>('');


  const handleButtonClick = (label: string) => {
    setTimeline(prevTimeline => [...prevTimeline, label]);
  };

  const handleFloatingButtonClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option: string) => {
    setFlyText(option);
    setFlyTextColor(getRandomColor());
    setShowOptions(false);
  };

  const getRandomColor = () => {
    const getRandomValue = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const r = getRandomValue(100, 255); // 赤の範囲を100から255に制限
    const g = getRandomValue(100, 255); // 緑の範囲を100から255に制限
    const b = getRandomValue(100, 255); // 青の範囲を100から255に制限

    return `rgb(${r}, ${g}, ${b})`;
  };

  const flyAnimation = useSpring({
    from: { opacity: 1, transform: 'translateY(0px)' },
    to: { opacity: 0, transform: 'translateY(-100px)' },
    config: { duration: 1000 }, // 飛ぶ速さをゆっくりにする
    reset: true,
    reverse: flyText === null,
    onRest: () => setFlyText(null),
  });

  return (
    <div className="container">
      <div className="boardContainer">
        <SoundBoard onButtonClick={handleButtonClick} />
      </div>
      <div className="boardContainer">
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
      <FloatingButton onClick={handleFloatingButtonClick} label="＋" />
    </div>
  );
};

export default Home;