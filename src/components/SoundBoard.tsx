import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX } from 'lucide-react';
import SoundButton from '@/components/SoundButton';

interface SoundBoardProps {
  onButtonClick: (label: string, soundUrl: string) => void;
}

const SoundBoard: React.FC<SoundBoardProps> = ({ onButtonClick }) => {
  const [isMuted, setIsMuted] = useState(false);

  const sounds = [
    { label: "へぇ", url: new URL('../sounds/hee.wav', import.meta.url).toString() },
    { label: "なるほど", url: new URL('../sounds/naruhodo.wav', import.meta.url).toString() },
    { label: "面白い！", url: new URL('../sounds/omoshiroi.wav', import.meta.url).toString() },
    { label: "うーん？", url: new URL('../sounds/umm.wav', import.meta.url).toString() }
  ];

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // すべての音声要素をミュート/アンミュート
    document.querySelectorAll('audio').forEach(audio => {
      audio.muted = !isMuted;
    });
  };

  return (
    <Card style={{ width: '100%', padding: '20px'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>サウンドボード</h2>
        <Button variant="secondary" size="icon" onClick={toggleMute} className="ml-2">
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
        {sounds.map((sound, index) => (
          <SoundButton
            key={index}
            label={sound.label}
            soundUrl={sound.url}
            onClick={() => onButtonClick(sound.label, sound.url)}
          />
        ))}
      </div>
    </Card>
  );
};

export default SoundBoard;