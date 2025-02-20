import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const ReactionBoard: React.FC = () => {
  return (
    <Card style={{ width: '90%', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>リアクションボード</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '20px' }}>
        <Button>♡</Button>
        <Button>！</Button>
        <Button>？</Button>
      </div>
    </Card>
  );
};

export default ReactionBoard;