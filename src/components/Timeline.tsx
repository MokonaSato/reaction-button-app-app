import React, { useEffect, useRef } from 'react';
import { Card, CardTitle, CardHeader, CardContent } from '@/components/ui/card';
import './style.css';
import { BellOff, ThumbsUp, Coffee, Laugh, HelpCircle, MessageSquare, Plus } from 'lucide-react';

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
    <Card className="shadow-lg border-0 bg-white-80 backdrop-blur-sm overflow-hidden card-padding" style={{ height: 'calc(50vh)' }}>
      <div className="absolute right-0 top-0 w-16 h-16 bg-gradient-to-bl rounded-bl-full opacity-70"></div>
      <CardHeader>
      <CardTitle className="text-lg flex items-center gap-2 card-title-small-bold">
        <MessageSquare className="h-5 w-5 text-blue-500 " />タイムライン</CardTitle>
      </CardHeader>
      <CardContent className="pt-2 timeline-container">
        {timeline.map((item, index) => (
          <div
            key={index}
            className={`${item.isSelf ? 'flex justify-start bg-gradient-to-r text-white rounded-2xl rounded-tr-sm p-3 max-w-[80%] shadow-sm bubble-margin bubble self-align-end' : 'flex justify-start bg-white rounded-2xl rounded-tl-sm p-3 max-w-[80%] shadow-sm bubble-margin bubble self-align-start'}`}
          >
            {item.text}
          </div>
        ))}
        <div ref={timelineEndRef} />
      </CardContent>
    </Card>
  );
};

export default Timeline;
