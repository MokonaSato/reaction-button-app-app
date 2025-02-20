import React from 'react';
import { Button } from '@/components/ui/button';

interface FloatingButtonProps {
  onClick: () => void;
  label: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, label }) => {
  return (
    <Button
      onClick={onClick}
      className="floating-button"
    >
      {label}
    </Button>
  );
};

export default FloatingButton;