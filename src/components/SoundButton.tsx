import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { playSound } from '../lib/soundPlayer'; // 共通の関数をインポート

interface SoundButtonProps {
  label: string;
  onClick: (label: string) => void;
  isMuted: boolean;
}

const SoundButton: React.FC<SoundButtonProps> = ({ label, onClick, isMuted }) => {
  const handleClick = () => {
    console.log('isMuted in handleClick: ', isMuted); // ここでisMutedの値を確認
    playSound(label, isMuted); // 共通の関数を使用
    onClick(label);
  };

  return (
    <Button
      onClick={handleClick}
      className="sound-button button"
    >
      {label}
    </Button>
  );
};

export default SoundButton;