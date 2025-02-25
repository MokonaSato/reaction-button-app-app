import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { playSound } from '../lib/soundPlayer'; // 共通の関数をインポート
import './style.css';

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
      variant="outline"
      className="bg-white-70 backdrop-blur-sm border-purple-100 hover:bg-purple-50 hover:border-purple-200 h-12 rounded-xl shadow-sm button-small"
      onClick={handleClick}
    >
      {label}
    </Button>
  );
};

export default SoundButton;