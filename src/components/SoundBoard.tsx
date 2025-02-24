import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
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
    <Card style={{ width: '100%', padding: '20px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>サウンドボード</h2>
        <Button variant="secondary" size="icon" onClick={handleMuteToggle} className="ml-2">
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </Button>
      </div>
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
    </Card>
  );
};

export default SoundBoard;