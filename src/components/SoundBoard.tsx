import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import SoundButton from '@/components/SoundButton';
import { soundMap } from '../lib/soundPlayer';

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
    <Card className="card" style={{ height: '25vh' }}>
      <CardHeader className="card-header">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <CardTitle className="card-title">リアクション</CardTitle>
        <Button className="button" size="icon" onClick={handleMuteToggle} style={{ width: '50px', height: '35px' }}>
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </Button>
      </div>
      </CardHeader>
      <CardContent className="card-content">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
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