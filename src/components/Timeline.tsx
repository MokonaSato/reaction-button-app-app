import React from 'react';
import { Card } from '@/components/ui/card';
import './Timeline.css';

interface TimelineProps {
  timeline: string[];
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  return (
    <Card style={{ width: '90%', padding: '20px', height: 'calc(60vh - 20px)' }}>
      <h2 className="timeline-title">タイムライン</h2>
      <div className="timeline-container">
        {timeline.map((item, index) => (
          <div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
          >
            {item}
            <div className={`timeline-arrow ${index % 2 === 0 ? 'left-arrow' : 'right-arrow'}`} />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Timeline;