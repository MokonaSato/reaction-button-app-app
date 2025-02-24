import React, { useEffect, useRef } from 'react';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
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
    <Card className="card" style={{ height: 'calc(60vh - 70px)' }}>
      <CardHeader className="card-header">
      <CardTitle className="card-title">タイムライン</CardTitle>
      </CardHeader>
      <CardContent className="card-content timeline-container">
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
      </CardContent>
    </Card>
  );
};

export default Timeline;
