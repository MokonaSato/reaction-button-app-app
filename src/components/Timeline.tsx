import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import './Timeline.css';

interface TimelineProps {
  timeline: { text: string; isSelf: boolean }[];
}

const Timeline: React.FC<TimelineProps> = ({ timeline }) => {
  const timelineEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timelineEndRef.current) {
      timelineEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [timeline]);

  return (
    <Card style={{ width: '100%', padding: '20px', height: 'calc(60vh - 70px)' }}>
      <h2 className="timeline-title">タイムライン</h2>
      <div className="timeline-container">
        {timeline.map((item, index) => (
          <div
            key={index}
            className={`timeline-item ${item.isSelf ? 'right' : 'left'}`}
          >
            {item.text}
            <div className={`timeline-arrow ${item.isSelf ? 'left-arrow' : 'right-arrow'}`} />
          </div>
        ))}
        <div ref={timelineEndRef} />
      </div>
    </Card>
  );
};

export default Timeline;
