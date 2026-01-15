import React from 'react';
import { ScheduleItem } from '../types';

interface ScheduleTimelineProps {
  items: ScheduleItem[];
}

const ScheduleTimeline: React.FC<ScheduleTimelineProps> = ({ items }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'activity': return '📸';
      case 'meal': return '🍽️';
      case 'transport': return '🚐';
      case 'free': return '✨';
      default: return '📍';
    }
  };

  return (
    <div className="relative pl-6 border-l-2 border-purple-100 ml-3 space-y-8 my-4">
      {items.map((item, index) => (
        <div key={index} className="relative">
          <span className="absolute -left-[33px] flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-purple-200 text-sm shadow-sm">
            {getIcon(item.type)}
          </span>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-50">
            <time className="mb-1 text-xs font-semibold uppercase text-purple-600">
              {item.time}
            </time>
            <h3 className="text-md font-bold text-gray-800">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleTimeline;