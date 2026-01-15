import React from 'react';
import { Spot, Category } from '../types';

interface SpotCardProps {
  spot: Spot;
  onClick: () => void;
}

const SpotCard: React.FC<SpotCardProps> = ({ spot, onClick }) => {
  const getCategoryColor = (cat: Category) => {
    switch (cat) {
      case Category.BTS: return 'bg-purple-100 text-purple-700 border-purple-200';
      case Category.DRAMA: return 'bg-pink-100 text-pink-700 border-pink-200';
      case Category.FOOD: return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 mb-4 cursor-pointer"
    >
      <div className="relative h-48 w-full">
        <img 
          src={spot.imageUrl} 
          alt={spot.name} 
          className="w-full h-full object-cover"
        />
        {spot.highlight && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            MUST VISIT
          </div>
        )}
        <div className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(spot.category)}`}>
          {spot.category}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{spot.name}</h3>
        <p className="text-gray-500 text-sm mb-2 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {spot.location}
        </p>
        <p className="text-gray-600 text-sm line-clamp-2">{spot.description}</p>
      </div>
    </div>
  );
};

export default SpotCard;