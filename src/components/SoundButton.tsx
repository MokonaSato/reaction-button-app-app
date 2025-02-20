import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SoundButtonProps {
  label: string;
  soundUrl: string;
  onClick: () => void;
}

const SoundButton: React.FC<SoundButtonProps> = ({ label, soundUrl, onClick }) => {
  const [audio] = useState(new Audio(soundUrl));

  const playSound = () => {
    audio.currentTime = 0; // 再生位置をリセット
    audio.play();
    onClick();
  };

  return (
    <Button
      onClick={playSound}
      className="sound-button"
      variant="secondary"
    >
      {label}
    </Button>
  );
};

export default SoundButton;