import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { icons, Volume2, VolumeX } from 'lucide-react';
import SoundButton from '@/components/SoundButton';
import { soundMap } from '../lib/soundPlayer';
import { ThumbsUp } from 'lucide-react';
import { Coffee, Laugh, HelpCircle } from 'lucide-react';
import './style.css';

interface SoundBoardProps {
  onButtonClick: (soundUrl: string) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const SoundBoard: React.FC<SoundBoardProps> = ({ onButtonClick, isMuted, setIsMuted }) => {
  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="shadow-lg border-0 bg-white-80 backdrop-blur-sm overflow-hidden card-padding" style={{ height: '25vh', marginBottom: '10px' }}>
      <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl rounded-bl-full opacity-70"></div>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg flex items-center gap-2 card-title-small-bold">
          <ThumbsUp className="h-5 w-5 text-purple-500" />
          ワンタッチリアクション
        </CardTitle>

        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleMuteToggle} style={{ width: '50px', height: '35px' }}>
          {isMuted ? <VolumeX size={24} className="h-4 w-4 text-gray-500"/> : <Volume2 size={24} className="h-4 w-4 text-gray-500"/>}
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
          {Object.keys(soundMap).map((label, index) => (
            <SoundButton
              key={index}
              label={label}
              onClick={() => onButtonClick(label)}
              isMuted={isMuted}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SoundBoard;